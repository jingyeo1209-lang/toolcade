(function (global) {
  const { esc, homeHref } = global.ToolcadeShell || {
    esc: (s) => String(s ?? ""),
    homeHref: () => "index.html",
  };

  const THUMB_CLASS = {
    fathom: "ph-thumb--fathom",
    fireflies: "ph-thumb--fireflies",
    otter: "ph-thumb--otter",
    granola: "ph-thumb--granola",
    meetgeek: "ph-thumb--meetgeek",
    tldv: "ph-thumb--tldv",
    zoom: "ph-thumb--zoom",
    "google-meet": "ph-thumb--google-meet",
    "microsoft-teams": "ph-thumb--microsoft-teams",
    whereby: "ph-thumb--whereby",
    discord: "ph-thumb--discord",
    jitsi: "ph-thumb--jitsi",
    zapier: "ph-thumb--zapier",
    make: "ph-thumb--make",
    n8n: "ph-thumb--n8n",
    relay: "ph-thumb--relay",
    bardeen: "ph-thumb--bardeen",
    activepieces: "ph-thumb--activepieces",
    "ublock-origin": "ph-thumb--ublock-origin",
    adguard: "ph-thumb--adguard",
    "brave-shields": "ph-thumb--brave-shields",
    "privacy-badger": "ph-thumb--privacy-badger",
    ghostery: "ph-thumb--ghostery",
    "ublock-origin-lite": "ph-thumb--ublock-origin-lite",
    raycast: "ph-thumb--raycast",
    alfred: "ph-thumb--alfred",
    alttab: "ph-thumb--alttab",
    "powertoys-command-palette": "ph-thumb--powertoys",
    "flow-launcher": "ph-thumb--flow-launcher",
    contexts: "ph-thumb--contexts",
    wordpress: "ph-thumb--wordpress",
    webflow: "ph-thumb--webflow",
    sanity: "ph-thumb--sanity",
    contentful: "ph-thumb--contentful",
    strapi: "ph-thumb--strapi",
    ghost: "ph-thumb--ghost",
    "google-calendar": "ph-thumb--google-calendar",
    "outlook-calendar": "ph-thumb--outlook-calendar",
    "notion-calendar": "ph-thumb--notion-calendar",
    fantastical: "ph-thumb--fantastical",
    motion: "ph-thumb--motion",
    reclaim: "ph-thumb--reclaim",
    vanta: "ph-thumb--vanta",
    drata: "ph-thumb--drata",
    secureframe: "ph-thumb--secureframe",
    sprinto: "ph-thumb--sprinto",
    thoropass: "ph-thumb--thoropass",
    onetrust: "ph-thumb--onetrust",
    zendesk: "ph-thumb--zendesk",
    intercom: "ph-thumb--intercom",
    freshdesk: "ph-thumb--freshdesk",
    "help-scout": "ph-thumb--help-scout",
    gorgias: "ph-thumb--gorgias",
    front: "ph-thumb--front",
    docusign: "ph-thumb--docusign",
    "dropbox-sign": "ph-thumb--dropbox-sign",
    "adobe-sign": "ph-thumb--adobe-sign",
    pandadoc: "ph-thumb--pandadoc",
    signnow: "ph-thumb--signnow",
    docuseal: "ph-thumb--docuseal",
    superhuman: "ph-thumb--superhuman",
    spark: "ph-thumb--spark",
    "outlook-mail": "ph-thumb--outlook-mail",
    "apple-mail": "ph-thumb--apple-mail",
    shortwave: "ph-thumb--shortwave",
    thunderbird: "ph-thumb--thunderbird",
    "google-drive": "ph-thumb--google-drive",
    dropbox: "ph-thumb--dropbox",
    onedrive: "ph-thumb--onedrive",
    box: "ph-thumb--box",
    "icloud-drive": "ph-thumb--icloud-drive",
    nextcloud: "ph-thumb--nextcloud",
    greenhouse: "ph-thumb--greenhouse",
    ashby: "ph-thumb--ashby",
    lever: "ph-thumb--lever",
    workable: "ph-thumb--workable",
    bamboohr: "ph-thumb--bamboohr",
    jazzhr: "ph-thumb--jazzhr",
    "notion-kb": "ph-thumb--notion-kb",
    confluence: "ph-thumb--confluence",
    guru: "ph-thumb--guru",
    coda: "ph-thumb--coda",
    slab: "ph-thumb--slab",
    gitbook: "ph-thumb--gitbook",
    ironclad: "ph-thumb--ironclad",
    clio: "ph-thumb--clio",
    harvey: "ph-thumb--harvey",
    spellbook: "ph-thumb--spellbook",
    lawgeex: "ph-thumb--lawgeex",
    relativity: "ph-thumb--relativity",
    fellow: "ph-thumb--fellow",
    range: "ph-thumb--range",
    spinach: "ph-thumb--spinach",
    supernormal: "ph-thumb--supernormal",
    clockwise: "ph-thumb--clockwise",
    reclaim: "ph-thumb--reclaim",
    "notion-notes": "ph-thumb--notion-notes",
    obsidian: "ph-thumb--obsidian",
    craft: "ph-thumb--craft",
    bear: "ph-thumb--bear",
    evernote: "ph-thumb--evernote",
    reflect: "ph-thumb--reflect",
    "adobe-acrobat": "ph-thumb--adobe-acrobat",
    foxit: "ph-thumb--foxit",
    "pdf-expert": "ph-thumb--pdf-expert",
    smallpdf: "ph-thumb--smallpdf",
    sejda: "ph-thumb--sejda",
    pdfgear: "ph-thumb--pdfgear",
    onepassword: "ph-thumb--onepassword",
    bitwarden: "ph-thumb--bitwarden",
    "proton-pass": "ph-thumb--proton-pass",
    dashlane: "ph-thumb--dashlane",
    keeper: "ph-thumb--keeper",
    nordpass: "ph-thumb--nordpass",
    powerpoint: "ph-thumb--powerpoint",
    "google-slides": "ph-thumb--google-slides",
    keynote: "ph-thumb--keynote",
    "canva-present": "ph-thumb--canva-present",
    pitch: "ph-thumb--pitch",
    gamma: "ph-thumb--gamma",
    loom: "ph-thumb--loom",
    navattic: "ph-thumb--navattic",
    storylane: "ph-thumb--storylane",
    walnut: "ph-thumb--walnut",
    demostack: "ph-thumb--demostack",
    tourial: "ph-thumb--tourial",
    linear: "ph-thumb--linear",
    jira: "ph-thumb--jira",
    asana: "ph-thumb--asana",
    clickup: "ph-thumb--clickup",
    monday: "ph-thumb--monday",
    trello: "ph-thumb--trello",
    teal: "ph-thumb--teal",
    rezi: "ph-thumb--rezi",
    kickresume: "ph-thumb--kickresume",
    novoresume: "ph-thumb--novoresume",
    "resume-io": "ph-thumb--resume-io",
    enhancv: "ph-thumb--enhancv",
    calendly: "ph-thumb--calendly",
    calcom: "ph-thumb--calcom",
    savvycal: "ph-thumb--savvycal",
    motion: "ph-thumb--motion",
    tidycal: "ph-thumb--tidycal",
    "ms-bookings": "ph-thumb--ms-bookings",
    cleanshot: "ph-thumb--cleanshot",
    snagit: "ph-thumb--snagit",
    "loom-capture": "ph-thumb--loom-capture",
    obs: "ph-thumb--obs",
    zight: "ph-thumb--zight",
    shottr: "ph-thumb--shottr",
    algolia: "ph-thumb--algolia",
    elasticsearch: "ph-thumb--elasticsearch",
    meilisearch: "ph-thumb--meilisearch",
    typesense: "ph-thumb--typesense",
    coveo: "ph-thumb--coveo",
    kagi: "ph-thumb--kagi",
    crowdstrike: "ph-thumb--crowdstrike",
    sentinelone: "ph-thumb--sentinelone",
    malwarebytes: "ph-thumb--malwarebytes",
    bitdefender: "ph-thumb--bitdefender",
    okta: "ph-thumb--okta",
    snyk: "ph-thumb--snyk",
    excel: "ph-thumb--excel",
    "google-sheets": "ph-thumb--google-sheets",
    airtable: "ph-thumb--airtable",
    smartsheet: "ph-thumb--smartsheet",
    rows: "ph-thumb--rows",
    nocodb: "ph-thumb--nocodb",
    slack: "ph-thumb--slack",
    "microsoft-teams-collab": "ph-thumb--microsoft-teams-collab",
    "discord-collab": "ph-thumb--discord-collab",
    twist: "ph-thumb--twist",
    mattermost: "ph-thumb--mattermost",
    "google-chat": "ph-thumb--google-chat",
    toggl: "ph-thumb--toggl",
    clockify: "ph-thumb--clockify",
    harvest: "ph-thumb--harvest",
    rescuetime: "ph-thumb--rescuetime",
    timely: "ph-thumb--timely",
    hubstaff: "ph-thumb--hubstaff",
    gather: "ph-thumb--gather",
    tandem: "ph-thumb--tandem",
    remo: "ph-thumb--remo",
    sococo: "ph-thumb--sococo",
    immersed: "ph-thumb--immersed",
    wonder: "ph-thumb--wonder",
    chrome: "ph-thumb--chrome",
    firefox: "ph-thumb--firefox",
    safari: "ph-thumb--safari",
    arc: "ph-thumb--arc",
    brave: "ph-thumb--brave",
    edge: "ph-thumb--edge",
  };

  function toolBySlug(data, slug) {
    return data.tools.find((t) => t.slug === slug);
  }

  function voteScore(rank, total = 6) {
    return Math.max(48, (total - rank + 1) * 38 + 24);
  }

  function toolTagline(tool) {
    return tool.comparison?.advantage || tool.bestFor || "";
  }

  function renderVoteButton(tool) {
    const href = global.ToolcadeAnalytics.withUtm(tool.affiliate.url, {
      utm_content: tool.slug,
    });
    return `
    <a href="${esc(href)}" target="_blank" rel="noopener noreferrer sponsored"
      class="ph-vote" data-tool-cta data-tool-name="${esc(tool.name)}" data-tool-slug="${esc(tool.slug)}"
      aria-label="${esc(tool.name)} 방문">
      <span class="ph-vote-icon">▲</span>
      <span class="ph-vote-num">${voteScore(tool.rank, tool.totalRank || 6)}</span>
      <span class="ph-vote-label">Visit</span>
    </a>`;
  }

  function renderLeaderboardRow(tool, { showRank = true } = {}) {
    const thumbClass = THUMB_CLASS[tool.slug] || "ph-thumb--cat";
    const initial = esc((tool.name || "?").charAt(0));
    const tags = (tool.tags || [])
      .slice(0, 3)
      .map((t) => `<span class="ph-tag">${esc(t)}</span>`)
      .join("");

    return `
    <article class="ph-row tool-row" id="row-${esc(tool.slug)}" data-tool-slug="${esc(tool.slug)}">
      ${showRank ? `<div class="ph-rank">${tool.rank}</div>` : ""}
      <div class="ph-thumb ${thumbClass}" aria-hidden="true">${initial}</div>
      <div class="ph-row-body">
        <h3 class="ph-row-title">
          <a href="#tool-${esc(tool.slug)}">${esc(tool.name)}</a>
        </h3>
        <p class="ph-row-tagline">${esc(toolTagline(tool))}</p>
        <div class="ph-tags">${tags}</div>
      </div>
      ${renderVoteButton(tool)}
    </article>`;
  }

  const TYPE_ICONS = {
    "회의 봇 참석": "🤖",
    "봇 없이 로컬 녹음": "🎧",
    "업로드·비동기": "📤",
    "스택 올인원": "🧩",
    "외부·이벤트형": "🎤",
    "가벼운 링크·상시형": "🔗",
    "노코드 연동형": "🔌",
    "개발자·셀프호스팅": "🛠️",
    "AI·브라우저 네이티브": "🧠",
    "확장 프로그램형": "🧩",
    "브라우저 내장형": "🌐",
    "시스템·크로스플랫폼형": "🛡️",
    "검색형 런처": "⌘",
    "창 전환형": "🪟",
    "OS 기본형": "💻",
    "전통형 CMS": "📝",
    "비주얼 빌더형": "🎨",
    "헤드리스 CMS": "🔌",
    "스택 기본형": "📬",
    "UX·허브형": "✨",
    "AI 플래너형": "🤖",
    "감사 자동화형": "📋",
    "가이드·지원 강화형": "🤝",
    "엔터프라이즈 GRC형": "🏛️",
    "티켓·운영형": "🎫",
    "제품·AI 메신저형": "💬",
    "인박스·버티컬형": "📥",
    "엔터프라이즈 서명형": "🏛️",
    "스토리지·문서 밀착형": "📄",
    "가성비·셀프호스트형": "💡",
    "파워유저·AI형": "⚡",
    "팀·멀티디바이스형": "📱",
    "OS·오픈소스 기본형": "💻",
    "스택 기본 드라이브": "☁️",
    "공유·엔터프라이즈형": "🔗",
    "셀프호스트형": "🖥️",
    "구조화·엔터프라이즈 ATS": "📋",
    "ATS+CRM·그로스형": "🎯",
    "SMB·HR 번들형": "🏢",
    "워크스페이스 위키형": "📓",
    "엔지니어링·IT 문서형": "🧩",
    "룩업·퍼블릭 문서형": "🔍",
    "CLM·인하우스 계약형": "📑",
    "로펌·리걸 AI형": "⚖️",
    "디스커버리·소송 자료형": "🗂️",
    "미팅 OS·안건형": "📋",
    "AI 미팅 어시스턴트형": "🤖",
    "캘린더·로드 최적화형": "📅",
    "팀 워크스페이스형": "🏢",
    "로컬·PKM형": "🧠",
    "캡처·라이팅형": "✍️",
    "프로·데스크톱형": "🖥️",
    "웹 유틸형": "🌐",
    "가성비·프리형": "💡",
    "프리미엄 UX·팀형": "✨",
    "오픈소스·가성비형": "🔓",
    "프라이버시·번들형": "🛡️",
    "오피스 표준형": "📊",
    "디자인·브랜드형": "🎨",
    "AI 초안형": "🪄",
    "비동기 영상형": "🎥",
    "인터랙티브 가이드형": "🖱️",
    "세일즈 샌드박스형": "🧪",
    "엔지니어링 이슈형": "⚙️",
    "전사 업무·워크로드형": "📁",
    "심플 보드형": "📌",
    "잡서치·트래커형": "🎯",
    "ATS 최적화형": "📈",
    "템플릿·디자인형": "🧾",
    "예약 링크 표준형": "🔗",
    "오픈소스·수신함형": "📬",
    "AI·스택 번들형": "🧩",
    "프로 캡처·주석형": "✂️",
    "비동기 영상 공유형": "🎬",
    "오픈·방송형": "📡",
    "관리형 사이트 검색형": "⚡",
    "오픈소스·셀프호스트형": "🛠️",
    "웹 검색엔진형": "🔎",
    "기업 EDR·XDR형": "🛡️",
    "엔드포인트·개인형": "💻",
    "ID·앱섹형": "🔑",
    "DB·워크플로형": "🗄️",
    "AI·연동형": "🤖",
    "실시간 허브형": "💬",
    "비동기·오픈소스형": "🧵",
    "커뮤니티·보이스형": "🎙️",
    "타이머·청구형": "⏱️",
    "자동 생산성형": "📈",
    "인력·모니터링형": "👁️",
    "맵·아바타형": "🗺️",
    "상시 보이스형": "🔊",
    "VR·이벤트형": "🥽",
    "호환·표준형": "🌐",
    "프라이버시·오픈형": "🔒",
    "생산성 UX형": "✨",
  };

  const CHECK_ICONS = ["🎯", "🔗", "💰", "🌏"];

  function scorePercent(rank, total = 6) {
    return Math.round(((total - rank + 1) / total) * 100);
  }

  function mockMetricRows(tool, columns) {
    const defaults = [
      { key: "recordingStyle", icon: "🎙", label: "기록" },
      { key: "meetingStyle", icon: "🎥", label: "용도" },
      { key: "freeQuota", icon: "🆓", label: "무료" },
      { key: "stackFit", icon: "🧱", label: "스택" },
      { key: "botVisibility", icon: "👁", label: "봇" },
    ];
    const fromCols = (columns || [])
      .filter((c) => c.key !== "name" && c.key !== "advantage")
      .slice(0, 2)
      .map((c) => {
        const known = defaults.find((d) => d.key === c.key);
        return {
          key: c.key,
          icon: known?.icon || "•",
          label: c.label,
        };
      });
    const rows = (fromCols.length ? fromCols : defaults.slice(0, 2)).concat([
      { key: "_rank", icon: "⭐", label: "순위", val: `#${tool.rank}` },
    ]);
    return rows
      .map((r) => {
        const val = r.val || tool.comparison?.[r.key] || "—";
        return `
      <div class="ws-mock-row">
        <span class="icon">${r.icon}</span>
        <span class="label">${esc(r.label)}</span>
        <span class="val">${esc(val)}</span>
      </div>`;
      })
      .join("");
  }

  function renderWsRankCard(tool, total) {
    const thumbClass = THUMB_CLASS[tool.slug] || "ph-thumb--cat";
    const score = voteScore(tool.rank, total);
    return `
    <a href="#tool-${esc(tool.slug)}" class="ws-rank-card tool-row" data-tool-slug="${esc(tool.slug)}">
      <span class="ws-rank-num">${tool.rank}</span>
      <div class="ws-rank-icon ${thumbClass}">${esc(tool.name.charAt(0))}</div>
      <div class="ws-rank-body">
        <h3 class="ws-rank-name">${esc(tool.name)}</h3>
        <p class="ws-rank-tagline">${esc(toolTagline(tool))}</p>
        <span class="ws-score-pill">▲ ${score}</span>
      </div>
    </a>`;
  }

  function renderWsRecordingTypes(guide) {
    if (!guide?.recordingTypes?.length) return "";
    const cards = guide.recordingTypes
      .map((t) => {
        const icon = TYPE_ICONS[t.type] || "📋";
        const examples = (t.examples || [])
          .map((e) => `<span class="ws-pill ws-pill--purple">${esc(e)}</span>`)
          .join("");
        return `
        <div class="ws-bento-card">
          <span class="ws-bento-icon">${icon}</span>
          <h3>${esc(t.type)}</h3>
          <p>${esc(t.description)}</p>
          <div class="ws-pill-row">${examples}</div>
        </div>`;
      })
      .join("");

    return `
    <section class="ws-band ws-band--lavender" id="guide">
      <div class="ws-inner">
        <span class="ws-section-label">유형 가이드</span>
        <h2 class="ws-section-title">${esc(guide.title || "유형별 정리")}</h2>
        <p class="ws-section-desc">${esc(guide.summary)}</p>
        <div class="ws-bento ws-bento--3">${cards}</div>
      </div>
    </section>`;
  }

  function renderWsChecklist(guide) {
    if (!guide?.howToChoose?.length) return "";
    const cards = guide.howToChoose
      .map((line, i) => {
        const num = String(i + 1).padStart(2, "0");
        return `
        <div class="ws-check-card">
          <div class="ws-check-icon">${CHECK_ICONS[i] || num}</div>
          <div>
            <strong>${num} · 고르기 전에</strong>
            <p>${esc(line)}</p>
          </div>
        </div>`;
      })
      .join("");

    return `
    <section class="ws-band ws-band--sky">
      <div class="ws-inner">
        <span class="ws-section-label">체크리스트</span>
        <h2 class="ws-section-title">4가지만 확인하세요</h2>
        <div class="ws-check-grid">${cards}</div>
      </div>
    </section>`;
  }

  function renderWsCompareGrid(tools, columns, compareTitle) {
    const cols = columns || [
      { key: "recordingStyle", label: "기록" },
      { key: "freeQuota", label: "무료" },
    ];
    const title =
      compareTitle ||
      cols
        .filter((c) => c.key !== "name" && c.key !== "advantage")
        .slice(0, 2)
        .map((c) => c.label)
        .join(" · ") ||
      "한눈 비교";
    const cells = tools
      .map((t) => {
        const metrics = cols
          .filter((c) => c.key !== "name" && c.key !== "advantage")
          .map((c) => {
            const val = t.comparison?.[c.key] || "—";
            const hl = c.key === "freeQuota" && t.comparison?.freeQuotaHighlight;
            return `
            <div class="ws-compare-metric">${esc(c.label)}</div>
            <div class="ws-compare-value${hl ? " ws-compare-value--highlight" : ""}">${esc(val)}</div>`;
          })
          .join("");
        return `
        <div class="ws-compare-cell">
          <strong>${esc(t.name)}</strong>
          ${metrics}
        </div>`;
      })
      .join("");

    return `
    <section class="ws-band ws-band--mint" id="compare">
      <div class="ws-inner">
        <span class="ws-section-label">한눈 비교</span>
        <h2 class="ws-section-title">${esc(title)}</h2>
        <p class="ws-section-desc">표보다 카드로 빠르게 훑어보세요.</p>
        <div class="ws-compare-grid">${cells}</div>
      </div>
    </section>`;
  }

  function renderWsDecide(data) {
    const chips = (data.decisionTree || [])
      .map(
        (item) => `
      <button type="button" class="ws-decide-btn decision-card" data-recommend="${esc(item.recommend)}" data-decision-id="${esc(item.id)}">
        ${esc(item.label)}
      </button>`
      )
      .join("");

    return `
    <section class="ws-band ws-band--dark" id="decide">
      <div class="ws-inner ws-inner--narrow" style="text-align:center">
        <span class="ws-section-label">상황별 추천</span>
        <h2 class="ws-section-title">나에게 맞는 툴은?</h2>
        <p class="ws-section-desc">버튼을 누르면 아래 리뷰로 이동합니다.</p>
        <div class="ws-decide-grid">${chips}</div>
        <p id="decision-result" class="ph-hidden"></p>
      </div>
    </section>`;
  }

  function renderWsToolBand(tool, index, total, columns) {
    const reverse = index % 2 === 1;
    const pct = scorePercent(tool.rank, total);
    const href = global.ToolcadeAnalytics.withUtm(tool.affiliate.url, {
      utm_content: tool.slug,
    });

    const pros = (tool.highlights || [])
      .map((h) => `<span class="ws-pill ws-pill--green">✓ ${esc(h.title)}</span>`)
      .join("");
    const cons = (tool.cons || [])
      .slice(0, 2)
      .map((c) => `<span class="ws-pill ws-pill--amber">△ ${esc(c.length > 36 ? c.slice(0, 34) + "…" : c)}</span>`)
      .join("");
    const tags = (tool.tags || [])
      .map((t) => `<span class="ws-pill">${esc(t)}</span>`)
      .join("");

    const mockRows = mockMetricRows(tool, columns);

    return `
    <section class="ws-band ws-tool-band ws-tool-band--${esc(tool.slug)} tool-row" id="tool-${esc(tool.slug)}" data-tool-slug="${esc(tool.slug)}">
      <div class="ws-inner">
        <div class="ws-tool-split${reverse ? " ws-tool-split--reverse" : ""}">
          <div class="ws-tool-copy">
            <div class="ws-tool-rank-badge">#${tool.rank} 추천 · 점수 ${voteScore(tool.rank, total)}</div>
            <h2 class="ws-tool-name">${esc(tool.name)}</h2>
            <p class="ws-tool-oneliner">${esc(tool.bestFor)}</p>
            <div class="ws-pill-row" style="margin-bottom:16px">${tags}</div>
            <div class="ws-pill-row" style="margin-bottom:8px">${pros}</div>
            <div class="ws-pill-row" style="margin-bottom:20px">${cons}</div>
            <a href="${esc(href)}" target="_blank" rel="noopener noreferrer sponsored" class="ws-cta"
              data-tool-cta data-tool-name="${esc(tool.name)}" data-tool-slug="${esc(tool.slug)}">
              ${esc(tool.affiliate.ctaLabel)} →
            </a>
          </div>
          <div class="ws-tool-visual">
            <div class="ws-mock-bar"><span style="width:${pct}%"></span></div>
            <div class="ws-mock-rows">${mockRows}</div>
            <p style="margin:16px 0 0;font-size:0.8125rem;color:#64748b;line-height:1.5;border-top:1px solid #f1f5f9;padding-top:14px">
              "${esc(tool.quote.length > 120 ? tool.quote.slice(0, 118) + "…" : tool.quote)}"
            </p>
          </div>
        </div>
      </div>
    </section>`;
  }

  function renderWsFaq(faq) {
    if (!faq?.length) return "";
    const items = faq
      .map(
        (f) => `
      <details class="ws-faq-item">
        <summary>${esc(f.q)}</summary>
        <p>${esc(f.a)}</p>
      </details>`
      )
      .join("");

    return `
    <section class="ws-band ws-band--gray" id="faq">
      <div class="ws-inner">
        <span class="ws-section-label">FAQ</span>
        <h2 class="ws-section-title">자주 묻는 질문</h2>
        <div class="ws-faq-grid">${items}</div>
      </div>
    </section>`;
  }

  function renderRelatedCategories(related) {
    if (!related?.length) return "";
    const chips = related
      .map((r) => {
        const href =
          global.ToolcadePaths?.asset(`categories/${r.slug}/index.html`) ||
          `categories/${r.slug}/index.html`;
        return `<a class="ws-related-chip" href="${esc(href)}">${esc(r.title)}</a>`;
      })
      .join("");
    return `
    <section class="ws-band ws-band--white">
      <div class="ws-inner">
        <span class="ws-section-label">관련 카테고리</span>
        <h2 class="ws-section-title">같이 보면 좋은 주제</h2>
        <div class="ws-related-row">${chips}</div>
      </div>
    </section>`;
  }

  function renderCategoryMain(data, categoriesData) {
    const c = data.category;
    const tools = [...data.tools].sort((a, b) => a.rank - b.rank);
    const total = tools.length;
    const typeCount = data.guide?.recordingTypes?.length || 0;
    const rankGrid = tools.map((t) => renderWsRankCard(t, total)).join("");
    const toolBands = tools
      .map((t, i) => renderWsToolBand(t, i, total, data.comparisonColumns))
      .join("");
    const catsHref =
      global.ToolcadePaths?.asset("categories/index.html") || "categories/index.html";

    const catMeta = (categoriesData?.categories || []).find((x) => x.slug === c.slug);
    const groupMeta = (categoriesData?.groups || []).find((g) => g.slug === catMeta?.group);
    const groupSlug = groupMeta?.slug || catMeta?.group || "";
    const groupTitle = groupMeta?.title || "";
    const groupCrumb = groupSlug
      ? `<span>/</span><a href="${esc(`${catsHref}#group-${groupSlug}`)}">${esc(groupTitle || groupSlug)}</a>`
      : "";

    return `
    <div class="ws-page">
      <section class="ws-band ws-band--hero">
        <div class="ws-inner">
          <nav class="ws-breadcrumb" aria-label="경로">
            <a href="${esc(homeHref())}">Toolcade</a>
            <span>/</span>
            <a href="${esc(catsHref)}">카테고리</a>
            ${groupCrumb}
            <span>/</span>
            <span>${esc(c.title)}</span>
          </nav>
          <span class="ws-eyebrow">${esc(c.title)}</span>
          <h1 class="ws-title">${esc(c.headline)}</h1>
          <p class="ws-lead">${esc(c.subtitle)}</p>
          ${
            data.guide?.summary
              ? `<p class="ws-lead ws-lead--soft"><strong>무엇인가?</strong> ${esc(data.guide.summary)}</p>`
              : ""
          }
          <div class="ws-stat-row">
            <div class="ws-stat"><strong>${total}</strong><span>추천 툴</span></div>
            <div class="ws-stat"><strong>${typeCount || "—"}</strong><span>${esc(c.statLabel || "유형")}</span></div>
            <div class="ws-stat"><strong>${esc(c.updatedAt?.slice(5) || "—")}</strong><span>업데이트</span></div>
          </div>
        </div>
      </section>

      <section class="ws-band ws-band--white" id="leaderboard">
        <div class="ws-inner">
          <span class="ws-section-label">리더보드</span>
          <h2 class="ws-section-title">추천 ${total}선</h2>
          <p class="ws-section-desc">카드를 누르면 아래 상세로 이동합니다.</p>
          <div class="ws-rank-grid">${rankGrid}</div>
        </div>
      </section>

      ${renderWsRecordingTypes(data.guide)}
      ${renderWsChecklist(data.guide)}
      ${renderWsCompareGrid(tools, data.comparisonColumns, c.compareTitle)}
      ${renderWsDecide(data)}
      ${toolBands}
      ${renderRelatedCategories(data.relatedCategories)}
      ${renderWsFaq(data.faq)}

      <section class="ws-band ws-band--cream">
        <div class="ws-inner ws-inner--narrow" style="text-align:center">
          <h2 class="ws-section-title" style="margin-bottom:8px">큐레이션 원칙</h2>
          <p class="ws-section-desc" style="margin-bottom:0">장점만이 아니라 단점·비추천 조건까지 적습니다. 제휴 링크가 있어도 순위는 팩트 기준입니다.</p>
        </div>
      </section>
    </div>`;
  }

  function categoryHref(c) {
    return c.path ? global.ToolcadePaths?.asset(c.path) || c.path : "#";
  }

  function categoriesIndexHref() {
    return global.ToolcadePaths?.asset("categories/index.html") || "categories/index.html";
  }

  function statusBadge(c) {
    return c.status === "published"
      ? `<span class="ph-status ph-status--live">Live</span>`
      : `<span class="ph-status ph-status--soon">Soon</span>`;
  }

  function groupCategories(categoriesData) {
    const groups = categoriesData.groups || [];
    const cats = categoriesData.categories || [];
    return groups
      .map((g) => ({
        ...g,
        categories: cats.filter((c) => c.group === g.slug),
      }))
      .filter((g) => g.categories.length > 0);
  }

  function renderCategoryCard(c) {
    const href = categoryHref(c);
    const count =
      typeof c.toolCount === "number"
        ? `<span class="ph-cat-card-count">${c.toolCount}개 툴</span>`
        : "";
    const inner = `
      <div class="ph-cat-card-top">
        <span class="ph-cat-card-emoji" aria-hidden="true">${c.emoji || "📦"}</span>
        ${statusBadge(c)}
      </div>
      <h3 class="ph-cat-card-title">${esc(c.title)}</h3>
      <p class="ph-cat-card-desc">${esc(c.description)}</p>
      ${count}`;
    return c.path
      ? `<a href="${esc(href)}" class="ph-cat-card">${inner}</a>`
      : `<div class="ph-cat-card ph-cat-card--disabled">${inner}</div>`;
  }

  function renderCategoryGroups(categoriesData, { limitPerGroup = null } = {}) {
    return groupCategories(categoriesData)
      .map((g) => {
        const list =
          limitPerGroup == null ? g.categories : g.categories.slice(0, limitPerGroup);
        const more =
          limitPerGroup != null && g.categories.length > limitPerGroup
            ? `<a class="ph-group-more" href="${esc(categoriesIndexHref())}#group-${esc(g.slug)}">전체 ${g.categories.length}개 보기 →</a>`
            : "";
        return `
        <section class="ph-group" id="group-${esc(g.slug)}">
          <div class="ph-section-head">
            <div>
              <h2>${esc(g.title)}</h2>
              <p class="ph-group-desc">${esc(g.description || "")}</p>
            </div>
            ${more || `<span>${g.categories.length}개</span>`}
          </div>
          <div class="ph-cat-grid">
            ${list.map(renderCategoryCard).join("")}
          </div>
        </section>`;
      })
      .join("");
  }

  function renderCategoriesIndexMain(categoriesData) {
    const total = (categoriesData.categories || []).length;
    const live = (categoriesData.categories || []).filter((c) => c.status === "published").length;
    return `
    <div class="ph-page">
      <div class="ph-breadcrumb">
        <a href="${esc(homeHref())}">Toolcade</a> / 카테고리
      </div>
      <div class="ph-hero">
        <h1>카테고리</h1>
        <p>Product Hunt처럼 주제별로 묶었습니다. 업무에 맞는 카테고리부터 고르세요.</p>
        <p class="ph-meta">${live}개 Live · ${total}개 카테고리</p>
      </div>
      <nav class="ph-group-jump" aria-label="카테고리 그룹">
        ${(categoriesData.groups || [])
          .map(
            (g) =>
              `<a href="#group-${esc(g.slug)}">${esc(g.title)}</a>`
          )
          .join("")}
      </nav>
      ${renderCategoryGroups(categoriesData)}
    </div>`;
  }

  function renderComingSoonMain(category, categoriesData) {
    const group = (categoriesData.groups || []).find((g) => g.slug === category.group);
    const catsHref = categoriesIndexHref();
    return `
    <div class="ph-page">
      <div class="ph-breadcrumb">
        <a href="${esc(homeHref())}">Toolcade</a> /
        <a href="${esc(catsHref)}">카테고리</a>
        ${group ? ` / <a href="${esc(catsHref)}#group-${esc(group.slug)}">${esc(group.title)}</a>` : ""}
        / ${esc(category.title)}
      </div>
      <div class="ph-empty">
        <div class="ph-empty-icon">${category.emoji || "📦"}</div>
        <h1>${esc(category.title)}</h1>
        <p>${esc(category.description)}</p>
        <p class="ph-meta" style="margin-bottom:20px">큐레이션 준비 중입니다. 곧 리더보드로 공개합니다.</p>
        <a href="${esc(catsHref)}" class="ph-cta">카테고리 목록으로</a>
      </div>
    </div>`;
  }

  function renderHomeMain(categoriesData, meetingData) {
    let toolPreview = "";
    if (meetingData?.tools?.length) {
      const tools = [...meetingData.tools].sort((a, b) => a.rank - b.rank).slice(0, 5);
      toolPreview = `
      <div class="ph-section-head" id="leaderboard">
        <h2>AI 미팅 노트 · 상위 ${tools.length}</h2>
        <span><a href="${esc(categoryHref({ path: "categories/meeting-notes/index.html" }))}" style="color:var(--ph-brand)">전체 보기 →</a></span>
      </div>
      <div class="ph-list">
        ${tools.map((t) => renderLeaderboardRow(t)).join("")}
      </div>`;
    }

    return `
    <div class="ph-page">
      <div class="ph-hero">
        <h1>지친 실무자를 위한<br>업무 툴 리더보드</h1>
        <p>Product Hunt처럼 한눈에 비교하고, 상황별로 고르세요. 과장 없이, 단점까지.</p>
      </div>

      <div class="ph-section-head" id="categories">
        <h2>카테고리</h2>
        <span><a href="${esc(categoriesIndexHref())}" style="color:var(--ph-brand)">전체 보기 →</a></span>
      </div>
      ${renderCategoryGroups(categoriesData, { limitPerGroup: 4 })}

      ${toolPreview}
    </div>`;
  }

  function applySeo(data) {
    const seo = data.category?.seo || data.seo || {};
    if (seo.title) document.title = seo.title;

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    if (seo.description) meta.content = seo.description;

    if (!data.tools) return;

    const ld = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: seo.title || data.category?.title,
      description: seo.description || data.category?.subtitle,
      dateModified: data.category?.updatedAt,
      itemListElement: [...data.tools]
        .sort((a, b) => a.rank - b.rank)
        .map((t, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: t.name,
          url: t.affiliate.url,
          description: t.bestFor,
        })),
    };

    let script = document.getElementById("toolcade-jsonld");
    if (!script) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = "toolcade-jsonld";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(ld);
  }

  function highlightTool(slug) {
    document.querySelectorAll(".tool-row").forEach((el) => {
      const match = el.getAttribute("data-tool-slug") === slug;
      el.classList.toggle("is-highlighted", match);
      el.classList.toggle("is-dimmed", !!slug && !match);
    });
  }

  function bindDecision(data) {
    const result = document.getElementById("decision-result");
    document.querySelectorAll(".decision-card").forEach((btn) => {
      btn.addEventListener("click", () => {
        const slug = btn.getAttribute("data-recommend");
        const decisionId = btn.getAttribute("data-decision-id");
        const tool = toolBySlug(data, slug);
        if (!tool) return;

        document.querySelectorAll(".decision-card").forEach((b) => {
          b.classList.toggle("is-active", b === btn);
        });

        highlightTool(slug);
        const target = document.getElementById(`tool-${slug}`);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        if (result) {
          result.classList.remove("ph-hidden");
          result.innerHTML = `<strong>${esc(tool.name)}</strong> 추천 · ${esc(tool.bestFor)}`;
        }

        global.ToolcadeAnalytics.track("decision_select", {
          decision_id: decisionId,
          tool_slug: slug,
          tool_name: tool.name,
        });
      });
    });
  }

  async function loadJson(url) {
    if (global.ToolcadeLoad?.loadData) return global.ToolcadeLoad.loadData(url);
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to load ${url}: ${res.status}`);
    return res.json();
  }

  async function mountCategoryPage({
    dataUrl,
    categoriesUrl = "data/categories.json",
    siteDisclosure,
    mountSelector = "#app",
  }) {
    const root = document.querySelector(mountSelector);
    if (!root) throw new Error("Mount root not found");

    const [data, cats] = await Promise.all([
      loadJson(dataUrl),
      loadJson(categoriesUrl).catch(() => null),
    ]);
    applySeo(data);

    root.innerHTML = renderCategoryMain(data, cats);

    global.ToolcadeShell?.mountShell?.({
      active: "category",
      site: cats?.site,
      disclosure: siteDisclosure || cats?.site?.affiliateDisclosure,
    });

    global.ToolcadeAnalytics.bindCtaClicks(root);
    bindDecision(data);
    global.ToolcadeAnalytics.track("page_view", { category: data.category.slug });

    return data;
  }

  async function mountHomePage({
    categoriesUrl,
    featuredUrl,
    siteDisclosure,
    mountSelector = "#app",
  }) {
    const root = document.querySelector(mountSelector);
    if (!root) throw new Error("Mount root not found");

    const categoriesData = await loadJson(categoriesUrl);
    let meetingData = null;
    try {
      if (featuredUrl) meetingData = await loadJson(featuredUrl);
    } catch {
      /* optional */
    }

    root.innerHTML = renderHomeMain(categoriesData, meetingData);

    global.ToolcadeShell?.mountShell?.({
      active: "home",
      site: categoriesData.site,
      disclosure: siteDisclosure || categoriesData.site?.affiliateDisclosure,
    });

    global.ToolcadeAnalytics.bindCtaClicks(root);
    global.ToolcadeAnalytics.track("page_view", { page: "home" });

    return categoriesData;
  }

  async function mountCategoriesIndexPage({
    categoriesUrl = "data/categories.json",
    siteDisclosure,
    mountSelector = "#app",
  } = {}) {
    const root = document.querySelector(mountSelector);
    if (!root) throw new Error("Mount root not found");

    const categoriesData = await loadJson(categoriesUrl);
    document.title = "카테고리 | Toolcade";
    root.innerHTML = renderCategoriesIndexMain(categoriesData);

    global.ToolcadeShell?.mountShell?.({
      active: "categories",
      site: categoriesData.site,
      disclosure: siteDisclosure || categoriesData.site?.affiliateDisclosure,
    });

    global.ToolcadeAnalytics?.bindCtaClicks?.(root);
    global.ToolcadeAnalytics?.track?.("page_view", { page: "categories" });

    return categoriesData;
  }

  async function mountComingSoonPage({
    slug,
    categoriesUrl = "data/categories.json",
    siteDisclosure,
    mountSelector = "#app",
  }) {
    const root = document.querySelector(mountSelector);
    if (!root) throw new Error("Mount root not found");

    const categoriesData = await loadJson(categoriesUrl);
    const category = (categoriesData.categories || []).find((c) => c.slug === slug);
    if (!category) throw new Error(`Unknown category slug: ${slug}`);

    document.title = `${category.title} | Toolcade`;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = category.description;

    root.innerHTML = renderComingSoonMain(category, categoriesData);

    global.ToolcadeShell?.mountShell?.({
      active: "categories",
      site: categoriesData.site,
      disclosure: siteDisclosure || categoriesData.site?.affiliateDisclosure,
    });

    global.ToolcadeAnalytics?.track?.("page_view", {
      page: "category_coming_soon",
      category: slug,
    });

    return category;
  }

  global.ToolcadeRender = {
    mountCategoryPage,
    mountHomePage,
    mountCategoriesIndexPage,
    mountComingSoonPage,
    loadJson,
    withUtm: (...args) => global.ToolcadeAnalytics.withUtm(...args),
  };
})(window);
