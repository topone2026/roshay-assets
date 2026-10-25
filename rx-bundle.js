(function(){
"use strict";
/* ===== روشاي — الحزمة النهائية v2: هيدر/فوتر + سلايدر نظيف ===== */
(function () {
  /* ---------- 1) بيانات ---------- */
  var HOME = { t: 'الرئيسية', u: 'https://roshay.sa/' };
  var SHOP = [
    { t: 'علبة شاي روشاي — 1 علبة', u: 'https://roshay.sa/-/p1703552837' },
    { t: 'باقة شاي روشاي — 3 علب', u: 'https://roshay.sa/-/p928466502' },
    { t: 'باقة شاي روشاي — 6 علب', u: 'https://roshay.sa/-/p20735303' }
  ];
  var NAV = [
    { t: 'دليل الشاي', u: 'https://roshay.sa/دليل-الشاي/page-1383828075' },
    { t: 'من نحن', u: 'https://roshay.sa/من-نحن/page-185470575' },
    { t: 'اتصل بنا', u: 'https://roshay.sa/اتصل-بنا/page-10316650' }
  ];
  var SLIDES = [
    { t: "شاي روشاي", s: "شاي سيلاني أسود فاخر درجة OP1", c: "تسوق الآن", h: "https://roshay.sa/-/p1703552837" },
    { t: "باقة 3 علب", s: "وفّر أكثر مع باقة الشاي السيلاني", c: "اطلب باقتك", h: "https://roshay.sa/-/p928466502" },
    { t: "باقة 6 علب", s: "الخيار الأمثل لمحبي الشاي الفاخر", c: "اطلب الآن", h: "https://roshay.sa/-/p20735303" }
  ];

  /* ---------- 2) CSS ---------- */
  var CSS =
    /* == سلايدر: ملتصق بالهيدر + كامل العرض + شريحة واحدة نظيفة == */
    ".s-block--photos-slider{margin-top:0!important;margin-bottom:0!important;" +
    "width:100vw!important;max-width:100vw!important;" +
    "margin-left:calc(50% - 50vw)!important;margin-right:calc(50% - 50vw)!important}" +
    ".s-block--photos-slider .container,.s-block--photos-slider .s-block__container{max-width:100%!important;width:100%!important;padding-left:0!important;padding-right:0!important;margin:0!important}" +
    "main#main-content{padding-top:0!important}" +
    ".s-block--photos-slider .swiper-slide,.s-block--photos-slider .swiper-slide a,.s-block--photos-slider .swiper-slide img{width:100%!important;max-width:100%!important;min-width:100%!important}" +
    /* صورة الشريحة */
    ".s-block--photos-slider .swiper-slide img{height:560px!important;object-fit:cover!important;object-position:center;border-radius:0!important}" +
    /* الشريحة غير النشطة مخفية تمامًا */
    ".s-block--photos-slider .swiper-slide:not(.swiper-slide-active){opacity:0!important;visibility:hidden!important;pointer-events:none!important}" +
    ".s-block--photos-slider .swiper-slide.swiper-slide-active{opacity:1!important;visibility:visible!important;pointer-events:auto!important;transition:opacity .6s ease!important}" +
    /* == هيدر: توحيد ارتفاع عناصر القائمة (شاي روشاي كان مرفوع بسبب padding مختلف) == */
    ".main-nav-container ul.main-menu>li{display:inline-block!important;vertical-align:middle!important}" +
    ".main-nav-container ul.main-menu>li>a{padding:14px!important;display:block!important}" +
    ".main-nav-container ul.main-menu>li.has-children{position:relative!important}" +
    ".main-nav-container ul.main-menu{flex-wrap:nowrap!important;overflow:visible!important}" +
    ".main-nav-container{height:auto!important;max-height:none!important;overflow:visible!important}" +
    /* عناصر الموبايل مخفية على الشاشات الكبيرة (الثيم ما بيبنيش tailwind للكلاس ده) */
    "@media(min-width:1024px){.main-nav-container ul.main-menu>li[class*='lg:hidden']{display:none!important}}" +
    "@media(max-width:1023px){.main-nav-container ul.main-menu>li.rx-nav,.main-nav-container ul.main-menu>li.rx-shop{display:none!important}}" +
    /* == منتجاتنا: قائمة منسدلة في الهيدر == */
    ".main-nav-container ul.main-menu>li.rx-shop{position:relative!important}" +
    ".main-nav-container ul.main-menu>li.rx-shop>.rx-drop{position:absolute;top:100%;right:0;min-width:230px;" +
    "background:#fff;border-radius:12px;box-shadow:0 12px 34px rgba(15,31,23,.16);padding:8px 0;" +
    "opacity:0;visibility:hidden;transform:translateY(8px);transition:all .22s ease;z-index:60}" +
    ".main-nav-container ul.main-menu>li.rx-shop:hover>.rx-drop,.main-nav-container ul.main-menu>li.rx-shop:focus-within>.rx-drop{" +
    "opacity:1;visibility:visible;transform:translateY(0)}" +
    ".main-nav-container ul.main-menu>li.rx-shop>.rx-drop a{display:block!important;padding:10px 18px!important;" +
    "color:#152A1F!important;font-size:14px;font-weight:600;text-decoration:none}" +
    ".main-nav-container ul.main-menu>li.rx-shop>.rx-drop a:hover{background:#F8F6F1;color:#C9A24B!important}" +
    ".main-nav-container ul.main-menu>li.rx-shop>a .rx-caret{display:inline-block;margin-right:6px;font-size:10px;" +
    "transition:transform .2s;vertical-align:middle}" +
    ".main-nav-container ul.main-menu>li.rx-shop:hover>a .rx-caret{transform:rotate(180deg)}" +
    /* == موبايل: منتجاتنا في القائمة الجانبية == */
    ".rx-mobile-shop{padding:6px 0}" +
    ".rx-mobile-shop a{display:block;padding:8px 14px;color:#152A1F;font-weight:600;font-size:14px;text-decoration:none}" +
    /* == فوتر == */
    "#rx-shop-col ul{list-style:none!important;margin:0!important;padding:0!important}" +
    "#rx-shop-col li{margin:0 0 12px!important}" +
    "#rx-shop-col li a{display:block!important;color:rgba(248,246,241,.75)!important;font-size:14px!important;text-decoration:none!important}" +
    "#rx-shop-col li a:hover{color:#C9A24B!important}" +
    ".store-footer .rx-home-link{display:block!important;padding:4px 0 12px!important;color:rgba(248,246,241,.75)!important;font-size:14px!important;text-decoration:none!important}" +
    ".store-footer .rx-home-link:hover{color:#C9A24B!important}" +
    ".main-nav-container ul.main-menu>li.rx-nav>a{display:inline-block;padding:14px;color:#1A1A1A!important;font-weight:700;font-size:15px;text-decoration:none}" +
    ".main-nav-container ul.main-menu>li.rx-nav>a:hover{color:#C9A24B!important}";

  function styles() {
    if (!document.getElementById("rx-final-css")) {
      var s = document.createElement("style");
      s.id = "rx-final-css";
      s.textContent = CSS;
      document.head.appendChild(s);
    }
  }

  /* ---------- 3) هيدر ---------- */
  function has(list, url) {
    for (var i = 0; i < list.length; i++) { if (list[i].href === url) return true; }
    return false;
  }
  function header() {
    var ul = document.querySelector('.main-nav-container ul.main-menu');
    if (!ul || ul.dataset.rxDone) return;
    ul.dataset.rxDone = '1';
    if (!has(ul.querySelectorAll('a'), HOME.u)) {
      var li = document.createElement('li');
      li.className = 'rx-nav !hidden lg:!block root-level lg:!inline-block';
      li.innerHTML = '<a href="' + HOME.u + '" target="_self"><span>' + HOME.t + '</span></a>';
      var m = document.createElement('li');
      m.className = 'lg:hidden';
      m.innerHTML = '<a href="' + HOME.u + '">' + HOME.t + '</a>';
      ul.insertBefore(li, ul.firstElementChild);
      ul.insertBefore(m, ul.firstElementChild);
    }
    /* «منتجاتنا» قائمة منسدلة بالمنتجات الثلاثة (ديسكتوب) + روابط في قائمة الموبايل */
    if (!ul.querySelector('li.rx-shop')) {
      var shop = document.createElement('li');
      shop.className = 'rx-shop !hidden lg:!block root-level lg:!inline-block';
      var drop = '<div class="rx-drop">';
      SHOP.forEach(function (p) {
        drop += '<a href="' + p.u + '" target="_self">' + p.t + '</a>';
      });
      drop += '</div>';
      shop.innerHTML = '<a href="https://roshay.sa/شاي-روشاي/c35031422" target="_self"><span>منتجاتنا</span><span class="rx-caret">▼</span></a>' + drop;
      /* بعد «شاي روشاي» مباشرة */
      var tea = ul.querySelector('li.has-children:not(.rx-shop)');
      if (tea && tea.parentNode === ul) { tea.parentNode.insertBefore(shop, tea.nextElementSibling); }
      else { ul.appendChild(shop); }
      var mshop = document.createElement('li');
      mshop.className = 'lg:hidden rx-mobile-shop';
      var mh = '<a href="https://roshay.sa/شاي-روشاي/c35031422"><b>منتجاتنا</b></a>';
      SHOP.forEach(function (p) { mh += '<a href="' + p.u + '">' + p.t + '</a>'; });
      mshop.innerHTML = mh;
      ul.appendChild(mshop);
    }
    NAV.forEach(function (n) {
      if (has(ul.querySelectorAll('a'), n.u)) return;
      var li = document.createElement('li');
      li.className = 'rx-nav !hidden lg:!block root-level lg:!inline-block';
      li.innerHTML = '<a href="' + n.u + '" target="_self"><span>' + n.t + '</span></a>';
      var m = document.createElement('li');
      m.className = 'lg:hidden';
      m.innerHTML = '<a href="' + n.u + '">' + n.t + '</a>';
      ul.appendChild(li); ul.appendChild(m);
    });
  }

  /* ---------- 4) فوتر ---------- */
  function footer() {
    var inner = document.querySelector('.store-footer__inner');
    if (!inner) return;
    var cols = inner.querySelectorAll(':scope > .container > div');
    var linksCol = null;
    for (var i = 0; i < cols.length; i++) {
      var h = cols[i].querySelector('h3');
      if (h && h.textContent.indexOf('روابط') !== -1) linksCol = cols[i];
    }
    if (!linksCol) return;
    var items = linksCol.querySelectorAll('.s-menu-footer-list a');
    for (var j = 0; j < items.length; j++) {
      if (items[j].textContent.trim() === 'دليل الشاي') { items[j].parentNode.removeChild(items[j]); }
    }
    var menuEl = linksCol.querySelector('salla-menu');
    if (menuEl && !linksCol.querySelector('.rx-home-link')) {
      var a = document.createElement('a');
      a.className = 'rx-home-link'; a.href = HOME.u; a.textContent = HOME.t;
      linksCol.insertBefore(a, menuEl);
    }
    if (!inner.querySelector('#rx-shop-col')) {
      var col = document.createElement('div');
      col.id = 'rx-shop-col';
      var html = '<h3>منتجاتنا</h3><ul>';
      SHOP.forEach(function (p) { html += '<li><a href="' + p.u + '" target="_self">' + p.t + '</a></li>'; });
      html += '</ul>';
      col.innerHTML = html;
      linksCol.parentNode.insertBefore(col, linksCol.nextElementSibling);
    }
  }

  /* ---------- 6) تشغيل ---------- */
  function run() { try { styles(); header(); footer(); } catch (e) { } }
  var tries = 0;
  function boot() { run(); if (++tries < 15) setTimeout(boot, 700); }
  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', boot); } else { boot(); }
  document.addEventListener('salla:pageLoaded', run);
})();
(function(){
  if (window.__rxHeroLive) return; window.__rxHeroLive = 1;
  var CSS = "", HTML = "<section class=\"rx-hero\" id=\"rxHero\" aria-roledescription=\"carousel\" aria-label=\"\u0639\u0631\u0648\u0636 \u0631\u0648\u0634\u0627\u064a \u0627\u0644\u0631\u0626\u064a\u0633\u064a\u0629\">\n\n  <!-- Slide 1 : Green -->\n  <div class=\"rx-slide rx-slide--green rx-active\" role=\"group\" aria-roledescription=\"\u0634\u0631\u064a\u062d\u0629\" aria-label=\"\u0661 \u0645\u0646 \u0663\">\n    <div class=\"rx-slide-bg\"><img src=\"https://cdn.salla.sa/form-builder/dKGXXE9d38nWzBxRRd2Ft1UCVBEhUDGBrmO25rde.png\" alt=\"\" aria-hidden=\"true\" fetchpriority=\"high\"></div>\n    <div class=\"rx-container rx-hero-content\">\n      <div class=\"rx-slide-grid\">\n        <div class=\"rx-slide-text\">\n          <span class=\"rx-kicker\">PURE CEYLON TEA \u00b7 OP1</span>\n          <h1 class=\"rx-slide-title\">\u0631\u0648\u0634\u0627\u064a \u2014 <span class=\"rx-accent\">\u0645\u0630\u0627\u0642 \u0645\u0645\u064a\u0632</span><br>\u0641\u064a \u0643\u0644 \u0641\u0646\u062c\u0627\u0646</h1>\n          <p class=\"rx-slide-sub\">\u0634\u0627\u064a \u0633\u064a\u0644\u0627\u0646\u064a \u0623\u0633\u0648\u062f \u0641\u0627\u062e\u0631 \u062f\u0631\u062c\u0629 OP1\u060c \u064a\u064f\u0642\u0637\u0641 \u0645\u0646 \u0623\u062c\u0648\u062f \u0645\u0632\u0627\u0631\u0639 \u0633\u0631\u064a\u0644\u0627\u0646\u0643\u0627 \u0648\u064a\u064f\u0639\u0628\u0623 \u0647\u0646\u0627\u0643 \u0644\u0644\u062d\u0641\u0627\u0638 \u0639\u0644\u0649 \u0646\u0636\u0627\u0631\u062a\u0647 \u0648\u0646\u0643\u0647\u062a\u0647 \u0627\u0644\u063a\u0646\u064a\u0629.</p>\n          <div class=\"rx-hero-cta\">\n            <a href=\"/\" class=\"rx-btn rx-btn-gold\">\u062a\u0633\u0648\u0651\u0642 \u0627\u0644\u0622\u0646\n              <svg width=\"17\" height=\"17\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M19 12H5m6-6-6 6 6 6\"/></svg>\n            </a>\n            <a href=\"/\" class=\"rx-btn rx-btn-ghost\">\u0642\u0635\u0629 \u0631\u0648\u0634\u0627\u064a</a>\n          </div>\n        </div>\n        <div class=\"rx-slide-media\">\n          <div class=\"rx-arch\"><img src=\"https://cdn.salla.sa/form-builder/z7pVQTNlJLaD8iVC6BJolmJ1TgbSiaHglCI0yKs6.jpg\" alt=\"\u0639\u0644\u0628\u0629 \u0634\u0627\u064a \u0631\u0648\u0634\u0627\u064a \u0627\u0644\u0641\u0627\u062e\u0631 \u0628\u063a\u0637\u0627\u0621 \u0630\u0647\u0628\u064a \u2014 \u0634\u0627\u064a \u0633\u064a\u0644\u0627\u0646\u064a \u0623\u0633\u0648\u062f\" width=\"380\" height=\"485\"></div>\n          <div class=\"rx-product-chip\"><span class=\"rx-dot\"></span>\u0634\u0627\u064a \u0633\u064a\u0644\u0627\u0646\u064a \u0623\u0635\u0644\u064a 100%</div>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <!-- Slide 2 : Maroon -->\n  <div class=\"rx-slide rx-slide--maroon\" role=\"group\" aria-roledescription=\"\u0634\u0631\u064a\u062d\u0629\" aria-label=\"\u0662 \u0645\u0646 \u0663\">\n    <div class=\"rx-slide-bg\"><img src=\"https://cdn.salla.sa/form-builder/fMIuhPHRlwGwh8ywDXDCWL0bANMQr2GOgO4TsiLY.png\" alt=\"\" aria-hidden=\"true\" loading=\"lazy\"></div>\n    <div class=\"rx-container rx-hero-content\">\n      <div class=\"rx-slide-grid\">\n        <div class=\"rx-slide-text\">\n          <span class=\"rx-kicker\">\u0641\u0646\u062c\u0627\u0646 \u0627\u0644\u062c\u0648\u062f\u0629</span>\n          <h2 class=\"rx-slide-title\">\u0645\u0646 \u0645\u0632\u0627\u0631\u0639 \u0633\u0631\u064a\u0644\u0627\u0646\u0643\u0627<br><span class=\"rx-accent\">\u0625\u0644\u0649 \u0641\u0646\u062c\u0627\u0646\u0643</span></h2>\n          <p class=\"rx-slide-sub\">\u0643\u0648\u0628 \u062f\u0627\u0641\u0626 \u064a\u062c\u0645\u0639 \u0628\u064a\u0646 \u0627\u0644\u0639\u0631\u0627\u0642\u0629 \u0648\u0627\u0644\u0641\u062e\u0627\u0645\u0629. \u0623\u0648\u0631\u0627\u0642 \u0645\u0642\u0637\u0648\u0641\u0629 \u0628\u0639\u0646\u0627\u064a\u0629\u060c \u062a\u0639\u0628\u0626\u0629 \u0641\u064a \u0628\u0644\u062f \u0627\u0644\u0645\u0646\u0634\u0623\u060c \u0648\u062c\u0648\u062f\u0629 \u0641\u0627\u0626\u0642\u0629 \u062a\u0644\u0645\u0633\u0647\u0627 \u0645\u0646 \u0623\u0648\u0644 \u0631\u0634\u0641\u0629.</p>\n          <div class=\"rx-hero-cta\">\n            <a href=\"/\" class=\"rx-btn rx-btn-gold\">\u0627\u0643\u062a\u0634\u0641 \u0627\u0644\u0645\u0646\u062a\u062c</a>\n            <a href=\"/\" class=\"rx-btn rx-btn-ghost\">\u0644\u0645\u0627\u0630\u0627 \u0631\u0648\u0634\u0627\u064a\u061f</a>\n          </div>\n        </div>\n        <div class=\"rx-slide-media\">\n          <div class=\"rx-arch\"><img src=\"https://cdn.salla.sa/form-builder/24DdYTx61VDmReLnY0EDcuw0YZ7cCwTwZQ2f42Br.jpg\" alt=\"\u0639\u0644\u0628\u0629 \u0634\u0627\u064a \u0631\u0648\u0634\u0627\u064a \u0645\u0639 \u0641\u0646\u062c\u0627\u0646 \u0634\u0627\u064a \u0623\u062d\u0645\u0631 \u0648\u062e\u0644\u0641\u064a\u0629 \u062d\u062f\u0627\u0626\u0642 \u062e\u0636\u0631\u0627\u0621\" loading=\"lazy\" width=\"380\" height=\"485\"></div>\n          <div class=\"rx-product-chip\"><span class=\"rx-dot\"></span>\u062a\u0639\u0628\u0626\u0629 \u0633\u0631\u064a\u0644\u0627\u0646\u0643\u0627</div>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <!-- Slide 3 : Cream -->\n  <div class=\"rx-slide rx-slide--cream\" role=\"group\" aria-roledescription=\"\u0634\u0631\u064a\u062d\u0629\" aria-label=\"\u0663 \u0645\u0646 \u0663\">\n    <div class=\"rx-slide-bg\"><img src=\"https://cdn.salla.sa/form-builder/MEBHl3e3zt4M1rK7sBWtwVxK6T9XOyuSUsU58mxt.png\" alt=\"\" aria-hidden=\"true\" loading=\"lazy\"></div>\n    <div class=\"rx-container rx-hero-content\">\n      <div class=\"rx-slide-grid\">\n        <div class=\"rx-slide-text\">\n          <span class=\"rx-kicker\">\u0644\u062d\u0638\u0629 \u062a\u0633\u062a\u062d\u0642\u0647\u0627</span>\n          <h2 class=\"rx-slide-title\">\u0641\u062e\u0627\u0645\u0629 \u0647\u0627\u062f\u0626\u0629\u2026<br><span class=\"rx-accent\">\u062f\u0641\u0621 \u0623\u0635\u064a\u0644</span></h2>\n          <p class=\"rx-slide-sub\">\u0623\u0636\u0641 \u0631\u0648\u0634\u0627\u064a \u0625\u0644\u0649 \u0637\u0642\u0648\u0633\u0643 \u0627\u0644\u064a\u0648\u0645\u064a\u0629 \u2014 \u0634\u0627\u064a \u0623\u0633\u0648\u062f \u0633\u064a\u0644\u0627\u0646\u064a \u0628\u062c\u0648\u062f\u0629 OP1 \u064a\u0645\u0646\u062d \u0644\u062d\u0638\u0627\u062a\u0643 \u0645\u0630\u0627\u0642\u0627\u064b \u0644\u0627 \u064a\u064f\u0646\u0633\u0649.</p>\n          <div class=\"rx-hero-cta\">\n            <a href=\"/\" class=\"rx-btn rx-btn-gold\">\u0627\u0637\u0644\u0628 \u0639\u0644\u0628\u062a\u0643</a>\n            <a href=\"/pages/10316650\" class=\"rx-btn rx-btn-ghost\">\u062a\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627</a>\n          </div>\n        </div>\n        <div class=\"rx-slide-media\">\n          <div class=\"rx-arch\"><img src=\"https://cdn.salla.sa/form-builder/z7pVQTNlJLaD8iVC6BJolmJ1TgbSiaHglCI0yKs6.jpg\" alt=\"\u0639\u0644\u0628\u0629 \u0634\u0627\u064a \u0631\u0648\u0634\u0627\u064a \u0627\u0644\u0633\u0648\u062f\u0627\u0621 \u0627\u0644\u0641\u0627\u062e\u0631\u0629 \u2014 200 \u063a\u0645\" loading=\"lazy\" width=\"380\" height=\"485\"></div>\n          <div class=\"rx-product-chip\"><span class=\"rx-dot\"></span>\u0627\u0644\u0648\u0632\u0646 200 \u063a\u0645</div>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"rx-slide-counter\" aria-hidden=\"true\"><span id=\"rxSlideNum\">01</span> / 03</div>\n  <div class=\"rx-slider-dots\" role=\"tablist\" aria-label=\"\u0627\u062e\u062a\u064a\u0627\u0631 \u0627\u0644\u0634\u0631\u064a\u062d\u0629\">\n    <button class=\"rx-dot-btn rx-active\" role=\"tab\" aria-selected=\"true\" aria-label=\"\u0627\u0644\u0634\u0631\u064a\u062d\u0629 \u0627\u0644\u0623\u0648\u0644\u0649\" data-slide=\"0\"></button>\n    <button class=\"rx-dot-btn\" role=\"tab\" aria-selected=\"false\" aria-label=\"\u0627\u0644\u0634\u0631\u064a\u062d\u0629 \u0627\u0644\u062b\u0627\u0646\u064a\u0629\" data-slide=\"1\"></button>\n    <button class=\"rx-dot-btn\" role=\"tab\" aria-selected=\"false\" aria-label=\"\u0627\u0644\u0634\u0631\u064a\u062d\u0629 \u0627\u0644\u062b\u0627\u0644\u062b\u0629\" data-slide=\"2\"></button>\n  </div>\n  <div class=\"rx-slider-arrows\">\n    <button class=\"rx-arrow-btn\" id=\"rxNext\" aria-label=\"\u0627\u0644\u0634\u0631\u064a\u062d\u0629 \u0627\u0644\u062a\u0627\u0644\u064a\u0629\">\n      <svg width=\"19\" height=\"19\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M15 18l-6-6 6-6\"/></svg>\n    </button>\n    <button class=\"rx-arrow-btn\" id=\"rxPrev\" aria-label=\"\u0627\u0644\u0634\u0631\u064a\u062d\u0629 \u0627\u0644\u0633\u0627\u0628\u0642\u0629\">\n      <svg width=\"19\" height=\"19\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M9 18l6-6-6-6\"/></svg>\n    </button>\n  </div>\n  <div class=\"rx-scroll-hint\" aria-hidden=\"true\">SCROLL</div>\n</section>";
  function mount(){
    var blk = document.querySelector('.s-block--photos-slider');
    if (!blk) return false;
    if (document.getElementById('rxHero')) return true;
    if (!document.getElementById('rx-hero-css')) {
      var st = document.createElement('style'); st.id = 'rx-hero-css';
      st.appendChild(document.createTextNode(CSS)); document.head.appendChild(st);
    }
    var wrap = document.createElement('div'); wrap.innerHTML = HTML;
    var hero = wrap.firstElementChild;
    blk.parentNode.insertBefore(hero, blk);
    blk.parentNode.removeChild(blk);
    start(hero); return true;
  }
  function start(hero){
    var slides = [].slice.call(hero.querySelectorAll('.rx-slide')),
        dots = [].slice.call(hero.querySelectorAll('.rx-dot-btn')),
        num = document.getElementById('rxSlideNum'), i = 0, timer = null;
    function go(n){
      i = (n + slides.length) % slides.length;
      slides.forEach(function(s,k){ s.classList.toggle('rx-active', k===i); });
      dots.forEach(function(d,k){ d.classList.toggle('rx-active', k===i); });
      if (num) num.textContent = ('0'+(i+1)).slice(-2);
    }
    function auto(){ clearInterval(timer); timer = setInterval(function(){ go(i+1); }, 7000); }
    dots.forEach(function(d,k){ d.addEventListener('click', function(){ go(k); auto(); }); });
    var nx = document.getElementById('rxNext'), pv = document.getElementById('rxPrev');
    if (nx) nx.addEventListener('click', function(){ go(i+1); auto(); });
    if (pv) pv.addEventListener('click', function(){ go(i-1); auto(); });
    var sx = null;
    hero.addEventListener('touchstart', function(e){ sx = e.touches[0].clientX; }, {passive:true});
    hero.addEventListener('touchend', function(e){
      if (sx === null) return;
      var dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 45) { go(dx > 0 ? i-1 : i+1); auto(); }
      sx = null;
    }, {passive:true});
    go(0); auto();
  }
  function boot(){
    if (mount()) return;
    var n = 0, t = setInterval(function(){ if (mount() || ++n > 40) clearInterval(t); }, 250);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();


})();