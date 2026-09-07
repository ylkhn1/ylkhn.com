#!/usr/bin/env python3
"""Render a GitHub contribution calendar as a small, theme-neutral SVG.

Input: JSON from the GitHub GraphQL API (see .github/workflows/contributions.yml
for the exact query), either the raw response or just the `contributionCalendar`
object. Output: an SVG where every mark is drawn with `currentColor` at a
per-level opacity, so the page recolours it by setting `color`. The background
is transparent. Totals and the date range are stored on the root element as
`data-total`, `data-from` and `data-to` for the page script to read.

Usage:
    gh api graphql ... | python3 tools/contributions.py -o assets/contributions.svg
    python3 tools/contributions.py calendar.json -o assets/contributions.svg

Standard library only.
"""

import argparse
import datetime as dt
import json
import sys
from xml.sax.saxutils import escape, quoteattr

CELL = 10       # square size
GAP = 3         # spacing between squares
STEP = CELL + GAP
LEFT = 28       # room for weekday labels
TOP = 16        # room for month labels
FONT_SIZE = 10

# Opacity of currentColor for contribution levels NONE .. FOURTH_QUARTILE
LEVELS = {
    "NONE": 0.09,
    "FIRST_QUARTILE": 0.3,
    "SECOND_QUARTILE": 0.52,
    "THIRD_QUARTILE": 0.76,
    "FOURTH_QUARTILE": 1.0,
}
LEVEL_INDEX = {k: i for i, k in enumerate(LEVELS)}

MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
LABELLED_WEEKDAYS = (1, 3, 5)  # Mon, Wed, Fri, like github.com

# Standalone defaults (used when the file is viewed directly or via <img>).
# When inlined, page CSS overrides both.
DEFAULT_COLOR = "#7ee787"
DEFAULT_FONT = "ui-monospace, SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace"


def load_calendar(fp):
    data = json.load(fp)
    # Accept the full GraphQL response or the calendar object itself.
    node = data
    for key in ("data", "user", "contributionsCollection", "contributionCalendar"):
        if isinstance(node, dict) and key in node:
            node = node[key]
    if not isinstance(node, dict) or "weeks" not in node:
        raise SystemExit("input does not look like a contributionCalendar object")
    return node


def month_labels(weeks):
    """Column index -> month index, following github.com's placement rules."""
    labels = {}
    for col, week in enumerate(weeks):
        for day in week["contributionDays"]:
            d = dt.date.fromisoformat(day["date"])
            if d.day == 1:
                labels[col] = d.month - 1
                break
    # The first column is usually a partial month; label it if there is room.
    if weeks and 0 not in labels:
        first = dt.date.fromisoformat(weeks[0]["contributionDays"][0]["date"])
        nxt = min(labels) if labels else None
        if nxt is None or nxt >= 3:
            labels[0] = first.month - 1
    return labels


def plural(n, word="contribution"):
    return "%d %s" % (n, word if n == 1 else word + "s")


def render(cal):
    weeks = cal["weeks"]
    total = int(cal.get("totalContributions", 0))
    days = [d for w in weeks for d in w["contributionDays"]]
    if not days:
        raise SystemExit("calendar has no days")
    date_from = days[0]["date"]
    date_to = days[-1]["date"]

    width = LEFT + len(weeks) * STEP - GAP
    height = TOP + 7 * STEP - GAP

    out = []
    out.append(
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 %d %d" width="%d" height="%d" '
        'role="img" aria-labelledby="cg-title" class="cg" color="%s" font-family=%s font-size="%d" '
        'data-total="%d" data-from="%s" data-to="%s">'
        % (width, height, width, height, DEFAULT_COLOR, quoteattr(DEFAULT_FONT), FONT_SIZE,
           total, date_from, date_to)
    )
    out.append(
        '<title id="cg-title">GitHub contribution calendar: %s from %s to %s</title>'
        % (plural(total), date_from, date_to)
    )

    # Labels: muted currentColor, no background.
    out.append('<g class="cg-labels" fill="currentColor" fill-opacity="0.55">')
    for col, m in sorted(month_labels(weeks).items()):
        x = LEFT + col * STEP
        out.append('<text class="cg-month" data-month="%d" x="%d" y="%d">%s</text>' % (m, x, FONT_SIZE, MONTHS[m]))
    for wd in LABELLED_WEEKDAYS:
        y = TOP + wd * STEP + CELL - 2
        out.append('<text class="cg-day" data-day="%d" x="0" y="%d">%s</text>' % (wd, y, WEEKDAYS[wd]))
    out.append("</g>")

    # Days: one <g> per level so the opacity is declared once.
    by_level = {k: [] for k in LEVELS}
    for col, week in enumerate(weeks):
        for day in week["contributionDays"]:
            level = day.get("contributionLevel", "NONE")
            if level not in LEVELS:
                level = "NONE"
            row = day.get("weekday")
            if row is None:
                row = (dt.date.fromisoformat(day["date"]).weekday() + 1) % 7
            x = LEFT + col * STEP
            y = TOP + row * STEP
            count = int(day.get("contributionCount", 0))
            tip = "%s on %s" % (plural(count) if count else "No contributions", day["date"])
            by_level[level].append(
                '<rect x="%d" y="%d" width="%d" height="%d" rx="2" data-date="%s" data-count="%d" data-level="%d">'
                '<title>%s</title></rect>'
                % (x, y, CELL, CELL, day["date"], count, LEVEL_INDEX[level], escape(tip))
            )
    out.append('<g class="cg-days" fill="currentColor">')
    for level, rects in by_level.items():
        if not rects:
            continue
        out.append('<g fill-opacity="%s">' % LEVELS[level])
        out.extend(rects)
        out.append("</g>")
    out.append("</g>")
    out.append("</svg>")
    return "\n".join(out) + "\n", total


def main():
    ap = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
    ap.add_argument("input", nargs="?", help="JSON file (default: stdin)")
    ap.add_argument("-o", "--output", required=True, help="SVG path to write")
    args = ap.parse_args()

    with (open(args.input, encoding="utf-8") if args.input else sys.stdin) as fp:
        cal = load_calendar(fp)
    svg, total = render(cal)
    with open(args.output, "w", encoding="utf-8") as fp:
        fp.write(svg)
    print("wrote %s (%d contributions, %d bytes)" % (args.output, total, len(svg.encode("utf-8"))))


if __name__ == "__main__":
    main()
