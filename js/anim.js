// GSAP animation layer. Loaded after main.js; the site works fully without it (CDN blocked / reduced motion).
(function () {
  if (!window.gsap || !window.ScrollTrigger) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  gsap.registerPlugin(ScrollTrigger);
  var q = function (s) { return document.querySelector(s); };
  var all = function (s) { return gsap.utils.toArray(s); };

  // Split the hero headline into words (re-run after every language switch)
  function splitHero() {
    var h1 = q(".hero h1");
    var text = h1.textContent.trim();
    h1.setAttribute("aria-label", text);
    h1.textContent = "";
    text.split(/\s+/).forEach(function (w) {
      var s = document.createElement("span");
      s.className = "word shimmer";
      s.setAttribute("aria-hidden", "true");
      s.textContent = w;
      h1.appendChild(s);
    });
    return h1.querySelectorAll(".word");
  }

  function heroIn() {
    var words = splitHero();
    var tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(".badge", { y: 24, opacity: 0, duration: 0.6 })
      .from(".hero .eyebrow", { y: 20, opacity: 0, duration: 0.5 }, "-=0.35")
      .from(words, { y: 30, opacity: 0, duration: 0.6, stagger: 0.07 }, "-=0.3")
      .from(".hero .lead, .hero .rating", { y: 20, opacity: 0, duration: 0.5, stagger: 0.1 }, "-=0.3")
      .from(".hero .btn-row .btn", { y: 20, opacity: 0, scale: 0.95, duration: 0.5, stagger: 0.1 }, "-=0.3");
    gsap.from(".logo-wrap", { scale: 0.8, rotation: -8, opacity: 0, duration: 1, ease: "power3.out", delay: 0.2 });
  }

  var firstLang = true;
  window.SKAnim = {
    // After a language switch the hero text is replaced: split it again and replay the word animation.
    onLang: function () {
      if (firstLang) return;
      var words = splitHero();
      gsap.from(words, { y: 24, opacity: 0, duration: 0.5, stagger: 0.05, ease: "power3.out", clearProps: "transform,opacity" });
    },
    pop: function (els) {
      if (!els.length) return;
      gsap.fromTo(els, { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.4, stagger: 0.04, ease: "power2.out", clearProps: "transform,opacity" });
    },
  };

  heroIn();
  firstLang = false;

  // Scroll progress bar
  gsap.to("#progress", { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: function () { return ScrollTrigger.maxScroll(window); }, scrub: 0.3 } });

  // Logo parallax + sparkles
  gsap.to(".logo-wrap", { y: 50, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
  var wrap = q(".logo-wrap");
  [[6, 12, 10], [18, 88, 14], [72, 4, 12], [86, 82, 9], [46, 98, 8]].forEach(function (p, i) {
    var s = document.createElement("span");
    s.className = "sparkle";
    s.setAttribute("aria-hidden", "true");
    s.style.cssText = "top:" + p[0] + "%;left:" + p[1] + "%;width:" + p[2] + "px;height:" + p[2] + "px";
    wrap.appendChild(s);
    gsap.fromTo(s, { opacity: 0, scale: 0.4, rotation: 0 }, { opacity: 1, scale: 1.2, rotation: 180, duration: 1.5, repeat: -1, yoyo: true, ease: "sine.inOut", delay: i * 0.4 });
  });

  // Scroll reveals (staggered per batch). Inline styles are cleared afterwards so CSS hover effects keep working.
  var REVEAL = ".trust__label,.trust__name,.trust__note,.section h2,.section .sub,.about p,.stats li,.card,.tile,.steps li,.review,.filters,.grid--gallery .thumb,.visit > div > *,.map,#gallery .center,#reviews .center";
  var targets = Array.from(new Set(all(REVEAL)));
  gsap.set(targets, { opacity: 0, y: 28 });
  ScrollTrigger.batch(targets, {
    start: "top 90%",
    once: true,
    onEnter: function (batch) {
      gsap.to(batch, { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: "power3.out", overwrite: true, clearProps: "transform,opacity", onComplete: function () { batch.forEach(function (el) { el.classList.add("is-in"); }); } });
    },
  });
  gsap.from(".exp", { y: 40, opacity: 0, duration: 0.9, ease: "power3.out", clearProps: "transform,opacity", scrollTrigger: { trigger: ".exp", start: "top 88%", once: true } });

  // Count-up numbers
  all("[data-count]").forEach(function (el) {
    var to = parseFloat(el.dataset.count), dec = parseInt(el.dataset.decimals || "0", 10), suf = el.dataset.suffix || "";
    el.textContent = (0).toFixed(dec) + suf;
    ScrollTrigger.create({
      trigger: el, start: "top 92%", once: true,
      onEnter: function () {
        var o = { v: 0 };
        gsap.to(o, { v: to, duration: 1.8, ease: "power1.out", onUpdate: function () { el.textContent = o.v.toFixed(dec) + suf; } });
      },
    });
  });

  // Floating WhatsApp button: pop in + pulse
  var wa = q(".wa-float");
  var pulse = document.createElement("span");
  pulse.className = "wa-float__pulse";
  pulse.setAttribute("aria-hidden", "true");
  wa.insertBefore(pulse, wa.firstChild);
  gsap.from(wa, { scale: 0, duration: 0.6, delay: 1.2, ease: "back.out(2)", clearProps: "transform" });

  // Re-measure once images/fonts settle so trigger positions are right
  window.addEventListener("load", function () { ScrollTrigger.refresh(); });
})();
