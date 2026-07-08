(function (global) {
  const FOOTER_LINKS = [
    { path: "pages/about.html", label: "소개" },
    { path: "pages/contact.html", label: "문의" },
    { path: "pages/privacy.html", label: "개인정보처리방침" },
    { path: "pages/terms.html", label: "이용약관" },
    { path: "pages/disclosure.html", label: "제휴·광고 고지" },
  ];

  const DEFAULT_SITE = {
    name: "툴케이드",
    nameEn: "Toolcade",
    tagline: "업무 생산성 큐레이션",
    operatorName: "툴케이드",
    contactEmail: "hello@toolcade.kr",
    affiliateDisclosure:
      "본 사이트의 일부 링크는 제휴(어필리에이트) 링크입니다. 링크를 통해 가입·결제가 이루어지면 툴케이드에 수수료가 발생할 수 있습니다. 추천 순위·리뷰 내용은 광고비와 무관하게 작성됩니다.",
    adsDisclosure:
      "본 사이트는 Google AdSense 등 제3자 광고 서비스를 통해 광고를 게재할 수 있습니다. Google을 포함한 제3자 공급업체는 쿠키를 사용하여 이용자의 이 사이트 및 다른 사이트 방문 기록을 바탕으로 맞춤 광고를 표시할 수 있습니다.",
  };

  function esc(str) {
    return String(str ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function homeHref() {
    return global.ToolcadePaths?.asset("index.html") || "index.html";
  }

  function pageHref(path) {
    return esc(global.ToolcadePaths?.asset(path) || path);
  }

  function mergeSite(site) {
    return { ...DEFAULT_SITE, ...(site || {}) };
  }

  function renderNav({ active = "home" } = {}) {
    const home = esc(homeHref());
    return `
    <header class="ph-nav">
      <div class="ph-nav-inner">
        <a href="${home}" class="ph-logo" aria-label="툴케이드 홈">
          <span class="ph-logo-mark">T</span>
          <span>Toolcade</span>
        </a>
        <label class="ph-search">
          <span class="ph-sr-only">검색</span>
          <input type="search" placeholder="툴·카테고리 검색" disabled aria-label="검색 (준비 중)">
        </label>
        <nav class="ph-nav-links" aria-label="주요 메뉴">
          <a class="ph-nav-link ${active === "home" ? "is-active" : ""}" href="${home}">홈</a>
          <a class="ph-nav-link" href="${home}#leaderboard">리더보드</a>
          <a class="ph-nav-link" href="${home}#categories">카테고리</a>
          <a class="ph-nav-link" href="${pageHref("pages/about.html")}">소개</a>
        </nav>
      </div>
    </header>`;
  }

  function renderFooter(siteInput, disclosureOverride) {
    const site = mergeSite(siteInput);
    const affiliate = disclosureOverride || site.affiliateDisclosure;
    const ads = site.adsDisclosure;
    const links = FOOTER_LINKS.map(
      (l) => `<a href="${pageHref(l.path)}">${esc(l.label)}</a>`
    ).join("");

    return `
    <footer class="ph-footer">
      <div class="ph-footer-inner">
        <div class="ph-footer-top">
          <div class="ph-footer-brand">
            <strong>${esc(site.nameEn)}</strong>
            <span>${esc(site.tagline)}</span>
          </div>
          <nav class="ph-footer-nav" aria-label="법적 고지 및 정보">
            ${links}
          </nav>
        </div>
        <div class="ph-footer-disclosures">
          <p><strong>제휴 고지</strong> ${esc(affiliate)}</p>
          <p><strong>광고 고지</strong> ${esc(ads)} 맞춤 광고를 원하지 않으시면 <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google 광고 설정</a>에서 해제할 수 있습니다.</p>
        </div>
        <p class="ph-footer-copy">© ${new Date().getFullYear()} ${esc(site.nameEn)} · ${esc(site.tagline)}</p>
      </div>
    </footer>`;
  }

  function mountShell({ active, disclosure, site } = {}) {
    const nav = document.getElementById("ph-nav");
    const footer = document.getElementById("ph-footer");
    if (nav) nav.innerHTML = renderNav({ active });
    if (footer) footer.innerHTML = renderFooter(site, disclosure);
  }

  global.ToolcadeShell = {
    esc,
    homeHref,
    pageHref,
    mergeSite,
    renderNav,
    renderFooter,
    mountShell,
    FOOTER_LINKS,
    DEFAULT_SITE,
  };
})(window);
