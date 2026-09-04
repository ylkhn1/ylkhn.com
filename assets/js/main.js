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
})();
