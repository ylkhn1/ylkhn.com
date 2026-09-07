(function () {
  "use strict";

  /* ---------- strings ---------- */
  var STRINGS = {
    en: {
      title: "yelkhan@ylkhn.com: ~",
      skip: "Skip to content",
      eyebrow: "hello, world",
      name: "Yelkhan",
      role: "Full-stack developer with strong big data experience. Builds projects from zero to production.",
      whoami:
        "I’m Yelkhan, a full-stack developer with a background in big data. I take products from an empty repository to production: backend, frontend, data pipelines and everything in between. I’m comfortable owning the whole stack down to the OS — Linux servers, infrastructure and deployment included.",
      neofetch: [
        ["OS", "Linux (5+ years)"],
        ["Role", "Full-stack developer"],
        ["Backend", "Go / Python — 4 yrs"],
        ["Frontend", "React / Vite — 3 yrs"],
        ["Focus", "big data, zero-to-prod"],
        ["Location", "Astana, KZ (UTC+5)"],
        ["Languages", "en, ru, kk"]
      ],
      backend: "Backend",
      frontend: "Frontend",
      systems: "Systems",
      linuxNote: "# server administration, infrastructure, deep OS knowledge",
      linuxUptime: "# uptime: 5+ years",
      backendLc: "backend",
      frontendLc: "frontend",
      backendYears: "4 years",
      frontendYears: "3 years",
      historyNote: "# years in production, counted honestly",
      contribCaption: "# GitHub contributions in the last year",
      contribCaptionN: "# {n} contributions in the last year",
      less: "less",
      more: "more",
      months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      contribTip: function (n, date) {
        return (n === 0 ? "No contributions" : n + (n === 1 ? " contribution" : " contributions")) + " on " + date;
      },
      contactNote: "# telegram is the fastest way to reach me",
      launch: "launch terminal",
      launchHint: "# or press `",
      footer: "Built with plain HTML, CSS and JavaScript. No frameworks, no trackers.",
      langCmd: "export LANG=ru_RU",
      langSwitch: "Switch to Russian",
      tty: {
        welcome: "Welcome to ylkhn.com bash (visitor session). Type `help` to get started.",
        help: [
          "available commands:",
          "  help        this list",
          "  whoami      who runs this place",
          "  neofetch    system summary",
          "  skills      cat skills.txt",
          "  contact     how to reach me",
          "  clear       clear the screen",
          "  exit        close the terminal",
          "  sudo        try it"
        ],
        skills: ["backend:   go, python", "frontend:  react, vite", "systems:   linux   # uptime: 5+ years"],
        contact: ["telegram   https://t.me/ylkhn", "github     https://github.com/ylkhn1"],
        sudoHire: [
          "[sudo] password for visitor: ••••••••",
          "Access granted. Provisioning yelkhan for your team…",
          "OK. Next step: write to https://t.me/ylkhn — response time beats most cron jobs."
        ],
        sudoDenied: "visitor is not in the sudoers file. This incident will be reported.",
        bye: "logout"
      }
    },
    ru: {
      title: "yelkhan@ylkhn.com: ~",
      skip: "Перейти к содержимому",
      eyebrow: "привет, мир",
      name: "Елхан",
      role: "Full-stack разработчик с большим опытом в big data. Довожу проекты с нуля до продакшена.",
      whoami:
        "Я Елхан, full-stack разработчик с бэкграундом в big data. Довожу продукты от пустого репозитория до продакшена: бэкенд, фронтенд, пайплайны данных и всё, что между ними. Спокойно беру на себя весь стек вплоть до операционной системы — Linux-серверы, инфраструктура и деплой включены.",
      neofetch: [
        ["ОС", "Linux (5+ лет)"],
        ["Роль", "Full-stack разработчик"],
        ["Бэкенд", "Go / Python — 4 года"],
        ["Фронтенд", "React / Vite — 3 года"],
        ["Фокус", "big data, от нуля до прода"],
        ["Локация", "Астана, KZ (UTC+5)"],
        ["Языки", "en, ru, kk"]
      ],
      backend: "Бэкенд",
      frontend: "Фронтенд",
      systems: "Системы",
      linuxNote: "# администрирование серверов, инфраструктура, глубокое знание ОС",
      linuxUptime: "# uptime: 5+ лет",
      backendLc: "бэкенд",
      frontendLc: "фронтенд",
      backendYears: "4 года",
      frontendYears: "3 года",
      historyNote: "# лет в продакшене, без приписок",
      contribCaption: "# контрибуции на GitHub за последний год",
      contribCaptionN: "# {n} контрибуций за последний год",
      less: "меньше",
      more: "больше",
      months: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
      weekdays: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
      contribTip: function (n, date) {
        if (n === 0) return "Нет контрибуций " + date;
        var m10 = n % 10, m100 = n % 100;
        var word = m10 === 1 && m100 !== 11 ? "контрибуция" : m10 >= 2 && m10 <= 4 && (m100 < 10 || m100 >= 20) ? "контрибуции" : "контрибуций";
        return n + " " + word + " " + date;
      },
      contactNote: "# быстрее всего — написать в telegram",
      launch: "запустить терминал",
      launchHint: "# или нажмите `",
      footer: "Собрано на чистых HTML, CSS и JavaScript. Без фреймворков и трекеров.",
      langCmd: "export LANG=en_US",
      langSwitch: "Переключить на английский",
      tty: {
        welcome: "Добро пожаловать в bash на ylkhn.com (гостевая сессия). Введите `help`, чтобы начать.",
        help: [
          "доступные команды:",
          "  help        этот список",
          "  whoami      кто здесь хозяин",
          "  neofetch    сводка о системе",
          "  skills      cat skills.txt",
          "  contact     как со мной связаться",
          "  clear       очистить экран",
          "  exit        закрыть терминал",
          "  sudo        попробуйте"
        ],
        skills: ["бэкенд:    go, python", "фронтенд:  react, vite", "системы:   linux   # uptime: 5+ лет"],
        contact: ["telegram   https://t.me/ylkhn", "github     https://github.com/ylkhn1"],
        sudoHire: [
          "[sudo] пароль для visitor: ••••••••",
          "Доступ разрешён. Подключаю yelkhan к вашей команде…",
          "Готово. Следующий шаг: написать в https://t.me/ylkhn — отвечаю быстрее большинства cron-задач."
        ],
        sudoDenied: "visitor отсутствует в файле sudoers. Об этом инциденте будет доложено.",
        bye: "logout"
      }
    }
  };

  var STORAGE_KEY = "lang";
  var reduceMotion =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var typedEl = document.getElementById("role-typed");
  var typeToken = 0;

  /* ---------- typing ---------- */
  function typeRole(text) {
    var token = ++typeToken;

    if (reduceMotion || !typedEl) {
      if (typedEl) typedEl.textContent = text;
      return;
    }

    typedEl.textContent = "";
    var i = 0;

    function step() {
      if (token !== typeToken || i >= text.length) return;
      typedEl.textContent = text.slice(0, ++i);
      var ch = text.charAt(i - 1);
      var delay = 28 + Math.random() * 40;
      if (ch === "." || ch === ",") delay += 260;
      window.setTimeout(step, delay);
    }

    window.setTimeout(step, 350);
  }

  /* ---------- contribution graph ---------- */
  // assets/contributions.svg is fetched and inlined so it inherits the accent
  // colour (every mark is drawn with currentColor). The root element carries
  // data-total / data-from / data-to, generated by tools/contributions.py.
  var contribEl = document.getElementById("contrib");
  var contribTotal = null;

  function formatTotal(n, lang) {
    if (n < 100) return String(n);
    var floored = String(Math.floor(n / 100) * 100);
    if (lang === "en") floored = floored.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return floored + "+";
  }

  function formatDate(iso, lang) {
    var d = new Date(iso + "T00:00:00Z");
    if (isNaN(d.getTime())) return iso;
    try {
      return d.toLocaleDateString(lang === "ru" ? "ru-RU" : "en-US", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
        timeZone: "UTC"
      });
    } catch (e) {
      return iso;
    }
  }

  function updateContrib(dict, lang) {
    var caption = document.getElementById("contrib-caption");
    if (caption) {
      caption.textContent =
        contribTotal === null ? dict.contribCaption : dict.contribCaptionN.replace("{n}", formatTotal(contribTotal, lang));
    }

    var svg = contribEl && contribEl.querySelector("svg");
    if (!svg) return;
    var i;
    var months = svg.querySelectorAll(".cg-month");
    for (i = 0; i < months.length; i++) {
      months[i].textContent = dict.months[+months[i].getAttribute("data-month")] || months[i].textContent;
    }
    var days = svg.querySelectorAll(".cg-day");
    for (i = 0; i < days.length; i++) {
      days[i].textContent = dict.weekdays[+days[i].getAttribute("data-day")] || days[i].textContent;
    }
    var rects = svg.querySelectorAll("rect[data-date]");
    for (i = 0; i < rects.length; i++) {
      var title = rects[i].querySelector("title");
      if (!title) continue;
      var date = rects[i].getAttribute("data-date");
      title.textContent = dict.contribTip(+rects[i].getAttribute("data-count") || 0, formatDate(date, lang));
    }
  }

  function loadContrib() {
    if (!contribEl || !window.fetch || !window.DOMParser) return;
    var src = contribEl.getAttribute("data-src");
    if (!src) return;

    function fallbackImg() {
      var img = document.createElement("img");
      img.className = "contrib-img";
      img.src = src;
      img.width = 714;
      img.height = 104;
      img.alt = "GitHub contribution calendar for the last year";
      contribEl.innerHTML = "";
      contribEl.appendChild(img);
    }

    window
      .fetch(src, { credentials: "same-origin" })
      .then(function (res) {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.text();
      })
      .then(function (text) {
        var doc = new DOMParser().parseFromString(text, "image/svg+xml");
        var svg = doc.documentElement;
        if (!svg || svg.nodeName.toLowerCase() !== "svg") throw new Error("not an svg");
        var total = parseInt(svg.getAttribute("data-total"), 10);
        if (total >= 0) contribTotal = total;
        contribEl.innerHTML = "";
        contribEl.appendChild(document.importNode(svg, true));
        updateContrib(window.YLKHN.dict(), document.documentElement.lang);
        // on narrow screens start scrolled to the most recent weeks
        contribEl.scrollLeft = contribEl.scrollWidth;
      })
      .catch(fallbackImg);
  }

  /* ---------- i18n ---------- */
  function readStored() {
    try {
      var v = window.localStorage.getItem(STORAGE_KEY);
      return v && STRINGS[v] ? v : null;
    } catch (e) {
      return null;
    }
  }

  function store(lang) {
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      /* private mode etc. — ignore */
    }
  }

  function setText(selector, value) {
    var els = document.querySelectorAll(selector);
    for (var i = 0; i < els.length; i++) els[i].textContent = value;
  }

  function applyLang(lang, animate) {
    var dict = STRINGS[lang] || STRINGS.en;

    document.documentElement.lang = lang;
    document.title = dict.title;

    var nodes = document.querySelectorAll("[data-i18n]");
    for (var n = 0; n < nodes.length; n++) {
      var key = nodes[n].getAttribute("data-i18n");
      if (typeof dict[key] === "string") nodes[n].textContent = dict[key];
    }

    for (var r = 0; r < dict.neofetch.length; r++) {
      setText('[data-nf-l="' + r + '"]', dict.neofetch[r][0]);
      setText('[data-nf-v="' + r + '"]', dict.neofetch[r][1]);
    }

    var btn = document.getElementById("lang-btn");
    if (btn) {
      btn.setAttribute("aria-label", dict.langCmd + " — " + dict.langSwitch);
      btn.setAttribute("lang", lang === "en" ? "ru" : "en");
      setText("#lang-cmd", dict.langCmd);
    }

    updateContrib(dict, lang);

    if (animate) typeRole(dict.role);
    else if (typedEl) typedEl.textContent = dict.role;
  }

  /* ---------- init ---------- */
  var initial = readStored() || "en";
  applyLang(initial, true);

  var langBtn = document.getElementById("lang-btn");
  if (langBtn) {
    langBtn.addEventListener("click", function () {
      var next = document.documentElement.lang === "en" ? "ru" : "en";
      store(next);
      applyLang(next, true);
    });
  }

  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // shared with terminal.js
  window.YLKHN = {
    strings: STRINGS,
    dict: function () {
      return STRINGS[document.documentElement.lang] || STRINGS.en;
    }
  };

  loadContrib();
})();
