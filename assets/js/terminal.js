/* Easter egg: a tiny fake bash inside a <dialog>. showModal() gives us the
   focus trap and Esc-to-close for free. */
(function () {
  "use strict";
  var dlg = document.getElementById("tty");
  var openBtn = document.getElementById("tty-open");
  if (!dlg || !openBtn || typeof dlg.showModal !== "function") { if (openBtn) openBtn.hidden = true; return; }

  var out = document.getElementById("tty-out");
  var input = document.getElementById("tty-in");
  var form = document.getElementById("tty-form");
  var body = document.getElementById("tty-body");
  var hist = [], hi = 0, booted = false;

  function T() { return window.YLKHN ? window.YLKHN.dict() : null; }

  function print(text, cls) {
    var lines = Array.isArray(text) ? text : String(text).split("\n");
    for (var i = 0; i < lines.length; i++) {
      var div = document.createElement("div");
      if (cls) div.className = cls;
      var parts = lines[i].split(/(https?:\/\/\S+)/);
      for (var p = 0; p < parts.length; p++) {
        if (/^https?:\/\//.test(parts[p])) {
          var a = document.createElement("a");
          a.href = parts[p]; a.textContent = parts[p]; a.target = "_blank"; a.rel = "noopener";
          div.appendChild(a);
        } else div.appendChild(document.createTextNode(parts[p] || " "));
      }
      out.appendChild(div);
    }
    body.scrollTop = body.scrollHeight;
  }

  function neofetch(t) {
    var lines = ["yelkhan@ylkhn.com", "-----------------"];
    for (var i = 0; i < t.neofetch.length; i++) lines.push(pad(t.neofetch[i][0]) + t.neofetch[i][1]);
    lines.push(pad("Telegram") + "https://t.me/ylkhn", pad("GitHub") + "https://github.com/ylkhn1");
    return lines;
  }
  function pad(s) { return (s + ":           ").slice(0, 12); }

  var CMDS = {
    help: function (t) { print(t.tty.help); },
    whoami: function (t) { print(t.whoami); },
    neofetch: function (t) { print(neofetch(t)); },
    skills: function (t) { print(t.tty.skills); },
    contact: function (t) { print(t.tty.contact); },
    clear: function () { out.textContent = ""; },
    exit: function (t) { print(t.tty.bye); window.setTimeout(function () { dlg.close(); }, 250); },
    sudo: function (t, args) { print(/^hire[- ]?me$/i.test(args.join(" ")) ? t.tty.sudoHire : t.tty.sudoDenied); }
  };

  function run(raw) {
    var t = T(); if (!t) return;
    print("visitor@ylkhn.com:~$ " + raw, "tty-echo");
    var parts = raw.trim().split(/\s+/), cmd = parts.shift();
    if (!cmd) return;
    if (CMDS.hasOwnProperty(cmd)) CMDS[cmd](t, parts);
    else print("bash: " + cmd + ": command not found", "tty-err");
  }

  function open() {
    if (dlg.open) return;
    dlg.showModal();
    if (!booted) { booted = true; print(T().tty.welcome, "tty-note"); }
    input.focus();
  }

  openBtn.addEventListener("click", open);
  document.getElementById("tty-close").addEventListener("click", function () { dlg.close(); });
  body.addEventListener("click", function () { input.focus(); });
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var v = input.value; input.value = "";
    if (v.trim()) { hist.push(v); hi = hist.length; }
    run(v);
  });
  input.addEventListener("keydown", function (e) {
    if (e.key === "ArrowUp" && hi > 0) { input.value = hist[--hi]; e.preventDefault(); }
    else if (e.key === "ArrowDown") { hi = Math.min(hi + 1, hist.length); input.value = hist[hi] || ""; e.preventDefault(); }
    else if (e.key === "l" && e.ctrlKey) { CMDS.clear(); e.preventDefault(); }
  });
  document.addEventListener("keydown", function (e) {
    var tag = (e.target.tagName || "").toLowerCase();
    if (e.key === "`" && !dlg.open && tag !== "input" && tag !== "textarea") { e.preventDefault(); open(); }
  });
})();
