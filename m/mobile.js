/* =========================================================
   手机版：视频自动静音循环，点一下有声
   ========================================================= */
(function () {
  "use strict";

  var S = window.SITE || {};
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function esc(v) {
    return String(v == null ? "" : v)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  /* 慢网 / 省流量：不自动加载，点一下再下 */
  function canAutoPlay() {
    if (reduce) return false;
    var c = navigator.connection || navigator.mozConnection || {};
    if (c.saveData) return false;
    if (/^(slow-)?2g$/.test(c.effectiveType || "")) return false;
    if (typeof c.downlink === "number" && c.downlink > 0 && c.downlink < 0.8) return false;
    return true;
  }

  function render() {
    var n = $("#cName"), r = $("#cRole"), l = $("#cLead"), s = $("#cStat");
    if (n && S.name) n.textContent = S.name;
    if (r) r.textContent = S.role || "";
    if (l) l.textContent = S.lead || "";
    if (s && S.stats) {
      var a = S.stats[0];
      s.textContent = "累计播放 " + (a.prefix || "") + a.n + a.suffix + "　·　导演作品 10 部";
    }

    /* 国内 6 部 + 参与 1 部 */
    var html = (S.domestic || []).map(function (w, i) {
      var no = (i + 1 < 10 ? "0" : "") + (i + 1);
      return '<section class="slide slide--work" id="w-' + esc(w.no) + '" data-work>' +
        '<video muted playsinline webkit-playsinline loop preload="none" ' +
          'poster="' + esc(('../' + (w.poster || "")).replace(/^\.\.\/\.\.\//, "../")) + '" ' +
          'data-src="' + esc(("../" + (w.video || "")).replace(/^\.\.\/\.\.\//, "../")) + '"></video>' +
        '<div class="scrim"></div>' +
        '<div class="work-top"><span class="no">' + no + "</span>" +
          '<button class="sound" type="button">🔇 静音</button></div>' +
        '<div class="copy">' +
          '<h2 class="t">《' + esc(w.title) + "》</h2>" +
          '<p class="m">' + (w.eps ? w.eps + " 集　·　" : "") + esc(w.genre) + "　·　" + esc(w.role) + "</p>" +
          '<p class="p"><b>' + esc(w.play) + "</b><em>仅抖音</em></p>" +
          '<p class="line">' + esc(w.note) + "</p>" +
        "</div>" +
        "</section>";
    }).join("");

    /* 海外 4 部 */
    html += (S.overseas || []).map(function (w, i) {
      return '<section class="slide slide--work" data-work>' +
        '<video muted playsinline webkit-playsinline loop preload="none" ' +
          'poster="' + esc(("../" + (w.poster || ""))) + '" ' +
          'data-src="' + esc(("../" + (w.video || ""))) + '"></video>' +
        '<div class="scrim"></div>' +
        '<div class="work-top"><span class="no">海外 ' + (i + 1) + "</span>" +
          '<button class="sound" type="button">🔇 静音</button></div>' +
        '<div class="copy">' +
          '<h2 class="t">' + esc(w.title) + "</h2>" +
          '<p class="m">' + esc(w.zh) + "　·　" + esc(w.genre) + "</p>" +
          '<p class="p"><b>' + esc(w.play) + "</b><em>播放</em><b>" + esc(w.save) + "</b><em>收藏</em></p>" +
          '<p class="line">' + esc(w.note) + "</p>" +
        "</div>" +
        "</section>";
    }).join("");

    var anchor = $("#stats");
    if (anchor) anchor.insertAdjacentHTML("beforebegin", html);

    /* 数据 */
    var g = $("#statGrid");
    if (g && S.stats) g.innerHTML = S.stats.map(function (st) {
      return '<div class="st">' +
        '<p class="st-v">' + (st.prefix ? '<span class="st-p">' + esc(st.prefix) + "</span>" : "") +
          '<span class="st-n" data-n="' + st.n + '" data-dec="' + (st.dec || 0) + '">0</span>' +
          '<span class="st-s">' + esc(st.suffix) + "</span></p>" +
        '<p class="st-l">' + esc(st.label) + "</p>" +
        "</div>";
    }).join("");

    /* 联系 */
    var mail = $("#mail");
    if (mail && S.email) { mail.href = "mailto:" + S.email; mail.textContent = S.email; }
    var links = $("#links");
    if (links) links.innerHTML =
      '<a href="tel:' + S.phone + '">' + S.phone + "</a>" +
      '<a href="' + S.netdisk + '" target="_blank" rel="noopener">作品网盘 ↗</a>';
  }

  function setupVideos() {
    var vids = $$("video[data-src]");
    if (!vids.length || !("IntersectionObserver" in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var v = en.target;
        if (en.intersectionRatio > 0.55 && canAutoPlay()) {
          if (!v.src) v.src = v.dataset.src;
          var p = v.play();
          if (p && p.catch) p.catch(function () {});
        } else if (en.intersectionRatio < 0.15 && !v.paused) {
          v.pause();
        }
      });
    }, { threshold: [0, 0.15, 0.55] });
    vids.forEach(function (v) {
      v.addEventListener("error", function () {
        if (v.dataset.tries === "1") return;
        v.dataset.tries = "1";
        setTimeout(function () { v.load(); var p = v.play(); if (p && p.catch) p.catch(function () {}); }, 1200);
      });
      io.observe(v);
    });
  }

  document.addEventListener("click", function (e) {
    var slide = e.target.closest("[data-work]");
    if (!slide) return;
    var v = slide.querySelector("video");
    var btn = slide.querySelector(".sound");
    if (!v) return;

    if (!v.src) {
      v.src = v.dataset.src;
      v.muted = false;
      v.volume = 0.7;
      var pp = v.play();
      if (pp && pp.catch) pp.catch(function () {});
      if (btn) btn.textContent = "🔊 有声";
      return;
    }
    v.muted = !v.muted;
    if (!v.muted) { v.volume = 0.7; var p = v.play(); if (p && p.catch) p.catch(function () {}); }
    if (btn) btn.textContent = v.muted ? "🔇 静音" : "🔊 有声";
  });

  function setupBar() {
    var bar = $("#bar");
    if (!bar) return;
    var onScroll = function () {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0).toFixed(2) + "%";
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function setupCounters() {
    var nums = $$(".st-n");
    if (!nums.length) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        var target = parseFloat(el.dataset.n) || 0;
        var dec = parseInt(el.dataset.dec || "0", 10);
        var t0 = 0;
        function frame(ts) {
          if (!t0) t0 = ts;
          var p = Math.min((ts - t0) / 1100, 1);
          var e = 1 - Math.pow(1 - p, 3);
          el.textContent = dec ? (target * e).toFixed(dec) : Math.round(target * e);
          if (p < 1) requestAnimationFrame(frame);
        }
        requestAnimationFrame(frame);
        io.unobserve(el);
      });
    }, { threshold: 0.5 });
    nums.forEach(function (n) { io.observe(n); });
  }

  function boot() { render(); setupVideos(); setupBar(); setupCounters(); }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
