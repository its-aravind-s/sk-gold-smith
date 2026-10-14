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
  function renderGallery() {
    if (!thumbs) return;
    var n = 0;
    thumbs.forEach(function (t) {
      var match = filter === "all" || t.dataset.cat === filter;
      var show = match && (filter !== "all" || expanded || n < LIMIT);
      if (match) n++;
      t.hidden = !show;
    });
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
      renderGallery();
    });
  });
  moreBtn.addEventListener("click", function () { expanded = !expanded; renderGallery(); });
  renderGallery();

  // Lightbox
  var lb = document.getElementById("lightbox");
  var lbImg = lb.querySelector("img");
  document.querySelectorAll(".thumb").forEach(function (t) {
    t.addEventListener("click", function () {
      var img = t.querySelector("img");
      lbImg.src = img.src;
      lbImg.alt = img.alt;
      lb.hidden = false;
    });
  });
  function closeLb() { lb.hidden = true; }
  lb.addEventListener("click", closeLb);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeLb(); });

  document.getElementById("year").textContent = new Date().getFullYear();
})();
