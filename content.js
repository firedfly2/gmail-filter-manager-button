/* i18n injected */
const __LBL = chrome.i18n.getMessage('open_filters_button_label') || 'Open Filters';
const __TIP = chrome.i18n.getMessage('open_filters_tooltip') || 'Open Gmail filter settings';
(() => {
  const BTN_ID = "arc-filters-button";

  const currentU = () => (location.pathname.match(/\/mail\/u\/(\d+)\//)?.[1] ?? "0");

  function toFilters(newTab = false) {
    const hash = "#settings/filters";
    if (!newTab) {
      if (location.hash !== hash) {
        location.hash = hash;
      } else {
        requestAnimationFrame(() => { location.hash = ""; requestAnimationFrame(() => (location.hash = hash)); });
      }
      return;
    }
    const url = `${location.origin}/mail/u/${currentU()}/${hash}`;
    window.open(url, "_blank");
  }

  function tt() {
    const lang = (document.documentElement.getAttribute("lang") || "").toLowerCase();
    return lang.startsWith("ja") ? "フィルタ" : "Filters";
  }
  function ariaLabel() {
    const lang = (document.documentElement.getAttribute("lang") || "").toLowerCase();
    return lang.startsWith("ja") ? "フィルタ一覧を開く" : "Open Gmail Filters";
  }

  // Create a FA-like "filter regular" SVG (outline funnel), DOM-safe
  function createFunnelSVG() {
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");
    svg.classList.add("arc-filter-icon", "T-I-J3", "J-J5-Ji");

    const path = document.createElementNS(svgNS, "path");
    // Outline funnel path (hand-tuned to resemble Font Awesome regular)
    // Top bar -> angled sides -> stem
    path.setAttribute("d", "M4 6 H20 L14 12 V18 L10 14 V12 L4 6");
    path.setAttribute("fill", "none");
    path.setAttribute("stroke", "currentColor");
    path.setAttribute("stroke-width", "2");
    path.setAttribute("stroke-linecap", "round");
    path.setAttribute("stroke-linejoin", "round");
    svg.appendChild(path);
    return svg;
  }

  function ensureSquare(btn){
    if(!btn) return;
    const rect = btn.getBoundingClientRect();
    if (rect.height) btn.style.width = Math.round(rect.height) + "px";
  }

  function buildButton() {
    const btn = document.createElement("div");
    btn.id = BTN_ID;
    btn.className = "T-I J-J5-Ji T-I-ax7 L3 arc-filter-btn";
    btn.setAttribute("role", "button");
    btn.setAttribute("tabindex", "0");
    btn.setAttribute("aria-label", ariaLabel());
    btn.setAttribute("data-tooltip", tt());
    btn.setAttribute("data-tooltip-vertical-offset", "-3");

    const wrap = document.createElement("div");
    wrap.className = "asa";
    wrap.appendChild(createFunnelSVG());
    btn.appendChild(wrap);

    btn.addEventListener("click", e => toFilters(e.metaKey || e.ctrlKey || e.button === 1));
    btn.addEventListener("auxclick", e => { if (e.button === 1) toFilters(true); });

    btn.addEventListener("mouseenter", () => btn.classList.add("T-I-JW"));
    btn.addEventListener("mouseleave", () => btn.classList.remove("T-I-JW","T-I-KE"));
    btn.addEventListener("blur",       () => btn.classList.remove("T-I-KE"));

    btn.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toFilters(false); }
    });

    return btn;
  }

  function findMoreButton(toolbar) {
    const sel = [
      'div.T-I[aria-label="その他"]',
      'div.T-I[data-tooltip="その他"]',
      'div.T-I[aria-label*="その他"]',
      'div.T-I[data-tooltip*="その他"]',
      'div.T-I[aria-label="More"]',
      'div.T-I[data-tooltip="More"]',
      'div.T-I[aria-label*="More"]',
      'div.T-I[data-tooltip*="More"]',
      'div.T-I.nf[aria-haspopup="true"]'
    ].join(",");
    return toolbar.querySelector(sel);
  }

  function isVisible(el) {
    if (!el) return false;
    const style = getComputedStyle(el);
    if (style.display === "none" || style.visibility === "hidden" || style.opacity === "0") return false;
    const rects = el.getClientRects();
    if (rects.length === 0) return false;
    const r = rects[0];
    return r.width > 0 && r.height > 0;
  }

  function getVisibleToolbar() {
    const candidates = Array.from(document.querySelectorAll('div[gh="mtb"]'));
    // Prefer visible ones; if multiple are visible, choose the last (most recently rendered)
    const visibles = candidates.filter(isVisible);
    if (visibles.length) return visibles[visibles.length - 1];
    // Fallback to last candidate
    return candidates[candidates.length - 1] || null;
  }

  function insert() {
    const toolbar = getVisibleToolbar();
    if (!toolbar) return;

    const existing = document.getElementById(BTN_ID);
    if (existing) {
      // すでにボタンがあれば、現行ツールバー内にあるか確認。なければ移動、あればサイズだけ調整。
      if (!toolbar.contains(existing)) {
        const more = findMoreButton(toolbar);
        if (more?.parentElement) {
          more.parentElement.insertBefore(existing, more);
        } else {
          const groups = Array.from(toolbar.querySelectorAll(':scope > .G-Ni.J-J5-Ji'))
            .filter(g => getComputedStyle(g).display !== "none");
          (groups[groups.length - 1] || toolbar).appendChild(existing);
        }
      }
      ensureSquare(existing);
      return;
    }

    const more = findMoreButton(toolbar);
    const btn = buildButton();

    if (more?.parentElement) {
      more.parentElement.insertBefore(btn, more);
    } else {
      const groups = Array.from(toolbar.querySelectorAll(':scope > .G-Ni.J-J5-Ji'))
        .filter(g => getComputedStyle(g).display !== "none");
      (groups[groups.length - 1] || toolbar).appendChild(btn);
    }
    ensureSquare(btn);
  }

  function boot() {
    insert();
    const obs = new MutationObserver(() => { insert(); const b=document.getElementById(BTN_ID); if(b) ensureSquare(b);} );
    obs.observe(document.body, { childList: true, subtree: true });
    window.addEventListener("hashchange", insert, { passive: true });
    window.addEventListener("resize", () => ensureSquare(document.getElementById(BTN_ID)), { passive: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
})();