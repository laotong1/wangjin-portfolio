/* 王锦 · 作品集：渲染与滚动 */
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

  function statsHTML(list, cls) {
    return list.map(function (s) {
      return '<div class="' + cls + '">' +
        '<p class="' + cls + '-v">' +
          '<span class="' + cls + '-n" data-n="' + s.n + '" data-dec="' + (s.dec || 0) + '">0</span>' +
          '<span class="' + cls + '-s">' + esc(s.suffix) + "</span>" +
        "</p>" +
        '<p class="' + cls + '-l">' + esc(s.label) + "</p>" +
        '<p class="' + cls + '-sub">' + esc(s.sub || "") + "</p>" +
        "</div>";
    }).join("");
  }

  function render() {
    $("#coverName").textContent = S.name;
    $("#coverRole").textContent = S.role;
    $("#coverLead").textContent = S.lead;
    $("#coverMeta").textContent = [S.intent, S.phone, S.age, S.city].filter(Boolean).join("　·　");

    var cs = $("#coverStats");
    if (cs) cs.innerHTML = S.stats.map(function (s) {
      return '<div class="cs">' +
        '<p class="cs-v"><span class="cs-n" data-n="' + s.n + '" data-dec="' + (s.dec || 0) + '">0</span><span class="cs-s">' + esc(s.suffix) + "</span></p>" +
        '<p class="cs-l">' + esc(s.label) + "</p>" +
        '<p class="cs-sub">' + esc(s.sub) + "</p>" +
        "</div>";
    }).join("");

    var sg = $("#statGrid");
    if (sg) sg.innerHTML = S.stats.map(function (s) {
      return '<article class="stat">' +
        '<p class="stat-v"><span class="stat-n" data-n="' + s.n + '" data-dec="' + (s.dec || 0) + '">0</span><span class="stat-s">' + esc(s.suffix) + "</span></p>" +
        '<p class="stat-l">' + esc(s.label) + "</p>" +
        '<p class="stat-sub">' + esc(s.sub) + "</p>" +
        "</article>";
    }).join("");

    var dl = $("#domesticList");
    if (dl) dl.innerHTML = S.domestic.map(function (w, i) {
      var tag = w.tag === "head" ? '<span class="tag">代表作</span>'
        : w.tag === "join" ? '<span class="tag">参与</span>' : "";
      return '<li class="work" data-i="' + i + '">' +
        '<span class="w-thumb"' + (w.poster ? ' style="background-image:url(' + w.poster + ')"' : "") + '></span>' +
        '<span class="w-no">' + esc(w.no) + "</span>" +
        '<div class="w-main">' +
          '<h3 class="w-title">《' + esc(w.title) + "》" + tag + "</h3>" +
          '<p class="w-meta">' + (w.eps ? w.eps + " 集" : "") +
            "　·　" + esc(w.genre) + "　·　" + esc(w.role) + "</p>" +
        "</div>" +
        '<span class="w-play">' + esc(w.play) + "</span>" +
        '<p class="work-note">' + esc(w.note) + "</p>" +
        "</li>";
    }).join("");

    var ol = $("#overseasList");
    if (ol) ol.innerHTML = S.overseas.map(function (w) {
      return '<div class="ov-row">' +
        '<span class="ov-thumb"' + (w.poster ? ' style="background-image:url(' + w.poster + ')"' : "") + '>' +
          (w.poster ? "" : "<span>9:16</span>") + "</span>" +
        '<div class="ov-main">' +
          '<p class="ov-t">' + esc(w.title) + '<span class="ov-zh">' + esc(w.zh) + "</span></p>" +
          '<p class="ov-meta">' + esc(w.genre) + "</p>" +
        "</div>" +
        '<span class="ov-play">' + esc(w.play) + "<span>播放</span></span>" +
        '<span class="ov-save">' + esc(w.save) + "<span>收藏</span></span>" +
        "</div>";
    }).join("");

    var mg = $("#methodGrid");
    if (mg) mg.innerHTML = S.method.map(function (m) {
      return '<article class="mth">' +
        '<p class="mth-en">' + esc(m.en) + "</p>" +
        '<h3 class="mth-k">' + esc(m.k) + "</h3>" +
        '<p class="mth-p">' + esc(m.text) + "</p>" +
        "</article>";
    }).join("");

    var el = $("#extraList");
    if (el) el.innerHTML = S.works_extra.map(function (w, i) {
      return '<article class="ex">' +
        '<span class="ex-no">0' + (i + 1) + "</span>" +
        '<p class="ex-t">《' + esc(w.title) + "》</p>" +
        '<p class="ex-r">' + esc(w.role) + "</p>" +
        '<p class="ex-g">' + esc(w.genre) + "</p>" +
        '<p class="ex-p">' + esc(w.note) + "</p>" +
        "</article>";
    }).join("");

    var tr = $("#toolRows");
    if (tr && S.tools) {
      var rows = [["AI 生成", S.tools.gen], ["音频", S.tools.audio], ["后期", S.tools.post], ["自动化", S.tools.auto]];
      tr.innerHTML = rows.map(function (r) {
        return '<div class="trow"><span class="trow-k">' + r[0] + "</span>" +
          '<span class="trow-v">' + r[1].map(function (t) { return "<span>" + esc(t) + "</span>"; }).join("") + "</span></div>";
      }).join("");
    }

    var cv = $("#cvList");
    if (cv) cv.innerHTML = S.timeline.map(function (j) {
      return '<article class="cv">' +
        '<p class="cv-time">' + esc(j.from) + " — " + esc(j.to) + "</p>" +
        "<div>" +
          '<p class="cv-org">' + esc(j.org) + "</p>" +
          '<p class="cv-title">' + esc(j.title) + "</p>" +
          '<ul class="cv-pts">' + j.points.map(function (p) { return "<li>" + esc(p) + "</li>"; }).join("") + "</ul>" +
        "</div>" +
        "</article>";
    }).join("");

    var edu = $("#edu");
    if (edu) edu.innerHTML =
      '<p class="edu-k">教育</p>' +
      '<div><p class="edu-v">' + esc(S.school) + "（专科）</p>" +
      '<p class="edu-s">2022.09 — 2025.07　·　普通话二级甲等　·　全媒体运营师证书</p></div>';

    var cg = $("#contactGrid");
    if (cg) {
      var cells = [
        ["电话", '<a href="tel:' + S.phone + '">' + S.phone + "</a>"],
        ["邮箱", '<a href="mailto:' + S.email + '">' + S.email + "</a>"],
        ["城市", S.city],
        ["作品网盘", '<a href="' + S.netdisk + '" target="_blank" rel="noopener">百度网盘 ↗</a>']
      ];
      cg.innerHTML = cells.map(function (c) {
        return '<div class="ct"><p class="ct-k">' + c[0] + "</p><p class=\"ct-v\">" + c[1] + "</p></div>";
      }).join("");
    }
  }


  /* 右侧媒体位：先放占位，将来把 video/img 塞进 #stageMedia 即可 */
  function renderStage(i) {
    var media = $("#stageMedia");
    if (!media || !S.domestic) return;
    var w = S.domestic[i] || S.domestic[0];
    if (w.video) {
      media.innerHTML = '<video muted playsinline webkit-playsinline loop preload="none" ' +
        'poster="' + esc(w.poster || "") + '" data-src="' + esc(w.video) + '"></video>' +
        '<button class="stage-play" type="button" aria-label="播放">▶ 播放 · 有声</button>';
      var v = media.querySelector("video");
      if (v && !reduce) {
        v.src = v.dataset.src;
        var pr = v.play();
        if (pr && pr.catch) pr.catch(function () {});
      }
    } else {
      media.innerHTML = '<div class="ph">' +
        '<b>' + esc(w.no) + "</b>" +
        "<span>9:16 · 视频待补</span>" +
        "</div>";
    }
    /* 说明已并入中间的作品行 */
    $$(".work").forEach(function (row) {
      row.classList.toggle("is-active", Number(row.dataset.i) === i);
    });
  }

  function setupStage() {
    if (!$("#stageMedia")) return;
    renderStage(0);
    document.addEventListener("click", function (e) {
      var btn = e.target.closest(".stage-play");
      if (!btn) return;
      var v = btn.parentElement.querySelector("video");
      if (!v) return;
      if (v.muted) { v.muted = false; v.volume = 0.7; btn.textContent = "🔊 有声"; }
      else { v.muted = true; btn.textContent = "▶ 播放 · 有声"; }
      var pr = v.play();
      if (pr && pr.catch) pr.catch(function () {});
    });

    $$(".work").forEach(function (row) {
      var i = Number(row.dataset.i) || 0;
      row.addEventListener("mouseenter", function () { renderStage(i); });
      row.addEventListener("focus", function () { renderStage(i); });
      row.addEventListener("click", function () { renderStage(i); });
    });
  }

  /* 左侧章节轨 */
  function buildRail() {
    var host = $("#rail");
    if (!host) return;
    var secs = $$(".sec");
    host.innerHTML = secs.map(function (s, i) {
      var no = (i + 1 < 10 ? "0" : "") + (i + 1);
      return '<li><a href="#' + s.id + '" data-target="' + s.id + '"><i></i>' + no + "　" + esc(s.dataset.label || "") + "</a></li>";
    }).join("");
  }

  function setupSpy() {
    var links = $$("#rail a");
    if (!links.length || !("IntersectionObserver" in window)) return;
    var byId = {};
    links.forEach(function (a) { byId[a.dataset.target] = a; });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a) { a.classList.remove("is-on"); });
        var a = byId[en.target.id];
        if (a) a.classList.add("is-on");
        document.body.classList.toggle("on-blue", en.target.id === "overseas");
      });
    }, { rootMargin: "-45% 0px -45% 0px" });

    $$(".sec").forEach(function (s) { io.observe(s); });
  }

  /* 数字滚动 */
  function countUp(el) {
    var target = parseFloat(el.dataset.n) || 0;
    var dec = parseInt(el.dataset.dec || "0", 10);
    var t0 = 0, dur = 1200;
    function fmt(v) {
      return dec ? v.toFixed(dec) : Math.round(v).toLocaleString("en-US");
    }
    function frame(ts) {
      if (!t0) t0 = ts;
      var p = Math.min((ts - t0) / dur, 1);
      var e = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(target * e);
      if (p < 1) requestAnimationFrame(frame);
      else el.textContent = fmt(target);
    }
    requestAnimationFrame(frame);
  }

  function setupCounters() {
    var nums = $$("[data-n]");
    if (!nums.length) return;
    if (reduce || !("IntersectionObserver" in window)) {
      nums.forEach(function (n) {
        var dec = parseInt(n.dataset.dec || "0", 10);
        var v = parseFloat(n.dataset.n) || 0;
        n.textContent = dec ? v.toFixed(dec) : v.toLocaleString("en-US");
      });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        countUp(en.target);
        io.unobserve(en.target);
      });
    }, { threshold: 0.5 });
    nums.forEach(function (n) { io.observe(n); });
  }

  /* 段落淡入 */
  function setupReveal() {
    if (reduce || !("IntersectionObserver" in window)) return;
    $$(".sec").forEach(function (s) { s.classList.add("reveal"); });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) en.target.classList.add("is-in");
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -30px 0px" });
    $$(".sec").forEach(function (s) { io.observe(s); });
  }

  function boot() {
    document.documentElement.classList.add("js");
    render();
    setupStage();
    buildRail();
    setupSpy();
    setupCounters();
    setupReveal();
    window.__SITE_READY = true;
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
