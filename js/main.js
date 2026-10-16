(function () {
  var WA_NUMBER = "919597021428";
  var META = {
    en: { title: "SK Gold Jewels Makers – Goldsmith in T Nagar, Chennai", desc: "Custom gold jewellery by master goldsmith Suresh Kumar, 25+ years. 18K, 22K, 24K gold, purity certificate, delivery across Chennai. T. Nagar." },
    ta: { title: "SK Gold Jewels Makers – தி.நகர் சென்னை தங்க ஆசாரி", desc: "25+ ஆண்டு அனுபவமுள்ள ஆசாரி சுரேஷ் குமாரின் விருப்பத் தங்க நகைகள். 18K, 22K, 24K, தூய்மைச் சான்றிதழ், சென்னை முழுவதும் டெலிவரி." }
  };

  function getSaved() { try { return localStorage.getItem("lang"); } catch (e) { return null; } }
  function save(l) { try { localStorage.setItem("lang", l); } catch (e) {} }

  function setLang(lang) {
    var dict = window.I18N[lang] || window.I18N.en;
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var k = el.getAttribute("data-i18n");
      if (dict[k] !== undefined) el.textContent = dict[k];
    });
    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      var k = el.getAttribute("data-i18n-aria");
      if (dict[k] !== undefined) el.setAttribute("aria-label", dict[k]);
    });
    var wa = "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(dict.wa_msg);
    document.querySelectorAll("[data-wa]").forEach(function (a) { a.href = wa; });
    document.querySelectorAll(".lang button").forEach(function (b) {
      b.classList.toggle("is-active", b.dataset.lang === lang);
    });
    document.title = META[lang].title;
    var d = document.querySelector('meta[name="description"]');
    if (d) d.setAttribute("content", META[lang].desc);
    save(lang);
    if (typeof renderGallery === "function") renderGallery();
    if (window.SKAnim) window.SKAnim.onLang();
  }

  var params = new URLSearchParams(location.search);
  var initial = params.get("lang") || getSaved() || "en";
  if (!window.I18N[initial]) initial = "en";
  setLang(initial);

  document.querySelectorAll(".lang button").forEach(function (b) {
    b.addEventListener("click", function () { setLang(b.dataset.lang); });
  });

  // Mobile nav
  var nav = document.getElementById("nav");
  var menuBtn = document.getElementById("menuBtn");
  menuBtn.addEventListener("click", function () {
    var open = nav.classList.toggle("is-open");
    menuBtn.setAttribute("aria-expanded", String(open));
  });
  nav.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
      nav.classList.remove("is-open");
      menuBtn.setAttribute("aria-expanded", "false");
    }
  });

  // Gallery filter + view more
  var LIMIT = 9;
  var thumbs = Array.prototype.slice.call(document.querySelectorAll(".thumb"));
  var chips = document.querySelectorAll(".chip");
  var moreBtn = document.getElementById("moreBtn");
  var filter = "all";
  var expanded = false;
  function renderGallery(animate) {
    if (!thumbs) return;
    var n = 0;
    var shown = [];
    thumbs.forEach(function (t) {
      var match = filter === "all" || t.dataset.cat === filter;
      var show = match && (filter !== "all" || expanded || n < LIMIT);
      if (match) n++;
      if (show && t.hidden) shown.push(t);
      t.hidden = !show;
    });
    if (animate && window.SKAnim) window.SKAnim.pop(shown);
    var total = filter === "all" ? thumbs.length : 0;
    moreBtn.hidden = !(filter === "all" && total > LIMIT);
    var dict = window.I18N[document.documentElement.lang] || window.I18N.en;
    moreBtn.textContent = expanded ? dict.btn_less : dict.btn_more;
  }
  chips.forEach(function (c) {
    c.addEventListener("click", function () {
      filter = c.dataset.filter;
      expanded = false;
      chips.forEach(function (x) { x.classList.toggle("is-active", x === c); });
      renderGallery(true);
    });
  });
  moreBtn.addEventListener("click", function () { expanded = !expanded; renderGallery(true); });
  renderGallery();

  // Lightbox: prev/next, swipe, keyboard
  var lb = document.getElementById("lightbox");
  var lbImg = lb.querySelector("img");
  var lbCap = document.getElementById("lbCap");
  var lbList = [];
  var lbIndex = 0;
  function showLb(i) {
    lbIndex = (i + lbList.length) % lbList.length;
    var t = lbList[lbIndex];
    var img = t.querySelector("img");
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lbCap.textContent = t.querySelector("span").textContent;
    lbImg.classList.remove("lb-in");
    void lbImg.offsetWidth;
    lbImg.classList.add("lb-in");
  }
  function openLb(t) {
    lbList = thumbs.filter(function (x) { return !x.hidden; });
    showLb(lbList.indexOf(t));
    lb.hidden = false;
    document.body.style.overflow = "hidden";
  }
  function closeLb() { lb.hidden = true; document.body.style.overflow = ""; }
  thumbs.forEach(function (t) { t.addEventListener("click", function () { openLb(t); }); });
  lb.addEventListener("click", function (e) { if (e.target === lb || e.target === lbImg) closeLb(); });
  lb.querySelector(".lightbox__close").addEventListener("click", closeLb);
  lb.querySelector(".lightbox__nav--prev").addEventListener("click", function () { showLb(lbIndex - 1); });
  lb.querySelector(".lightbox__nav--next").addEventListener("click", function () { showLb(lbIndex + 1); });
  document.addEventListener("keydown", function (e) {
    if (lb.hidden) return;
    if (e.key === "Escape") closeLb();
    if (e.key === "ArrowRight") showLb(lbIndex + 1);
    if (e.key === "ArrowLeft") showLb(lbIndex - 1);
  });
  var swipeX = null;
  lb.addEventListener("pointerdown", function (e) { swipeX = e.clientX; });
  lb.addEventListener("pointerup", function (e) {
    if (swipeX === null) return;
    var dx = e.clientX - swipeX;
    swipeX = null;
    if (Math.abs(dx) > 60) showLb(lbIndex + (dx < 0 ? 1 : -1));
  });

  document.getElementById("year").textContent = new Date().getFullYear();
})();
