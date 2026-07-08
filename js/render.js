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

  const RECORDING_ICONS = {
    "회의 봇 참석": "🤖",
    "봇 없이 로컬 녹음": "🎧",
    "업로드·비동기": "📤",
  };

  const CHECK_ICONS = ["🎯", "🔗", "💰", "🌏"];

  function scorePercent(rank, total = 6) {
    return Math.round(((total - rank + 1) / total) * 100);
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
        const icon = RECORDING_ICONS[t.type] || "📋";
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
        <span class="ws-section-label">기록 방식</span>
        <h2 class="ws-section-title">${esc(guide.title || "3가지 방식")}</h2>
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

  function renderWsCompareGrid(tools, columns) {
    const cols = columns || [
      { key: "recordingStyle", label: "기록" },
      { key: "freeQuota", label: "무료" },
    ];
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
        <h2 class="ws-section-title">기록 방식 · 무료 한도</h2>
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

  function renderWsToolBand(tool, index, total) {
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

    const mockRows = [
      { icon: "🎙", label: "기록", val: tool.comparison?.recordingStyle || "—" },
      { icon: "🆓", label: "무료", val: tool.comparison?.freeQuota || "—" },
      { icon: "⭐", label: "순위", val: `#${tool.rank}` },
    ]
      .map(
        (r) => `
      <div class="ws-mock-row">
        <span class="icon">${r.icon}</span>
        <span class="label">${r.label}</span>
        <span class="val">${esc(r.val)}</span>
      </div>`
      )
      .join("");

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

  function renderCategoryMain(data) {
    const c = data.category;
    const tools = [...data.tools].sort((a, b) => a.rank - b.rank);
    const total = tools.length;
    const rankGrid = tools.map((t) => renderWsRankCard(t, total)).join("");
    const toolBands = tools.map((t, i) => renderWsToolBand(t, i, total)).join("");

    return `
    <div class="ws-page">
      <section class="ws-band ws-band--hero">
        <div class="ws-inner">
          <a href="${esc(homeHref())}" style="font-size:0.8125rem;color:#64748b;text-decoration:none;display:inline-block;margin-bottom:12px">← Toolcade</a>
          <span class="ws-eyebrow">${esc(c.title)}</span>
          <h1 class="ws-title">${esc(c.headline)}</h1>
          <p class="ws-lead">${esc(c.subtitle)}</p>
          <div class="ws-stat-row">
            <div class="ws-stat"><strong>${total}</strong><span>추천 툴</span></div>
            <div class="ws-stat"><strong>3</strong><span>기록 방식</span></div>
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
      ${renderWsCompareGrid(tools, data.comparisonColumns)}
      ${renderWsDecide(data)}
      ${toolBands}
      ${renderWsFaq(data.faq)}

      <section class="ws-band ws-band--cream">
        <div class="ws-inner ws-inner--narrow" style="text-align:center">
          <h2 class="ws-section-title" style="margin-bottom:8px">큐레이션 원칙</h2>
          <p class="ws-section-desc" style="margin-bottom:0">장점만이 아니라 단점·비추천 조건까지 적습니다. 제휴 링크가 있어도 순위는 팩트 기준입니다.</p>
        </div>
      </section>
    </div>`;
  }

  function renderHomeMain(categoriesData, meetingData) {
    const cats = categoriesData.categories || [];
    const catRows = cats
      .map((c) => {
        const href = c.path ? (global.ToolcadePaths?.asset(c.path) || c.path) : "#";
        const live = c.status === "published";
        const status = live
          ? `<span class="ph-status ph-status--live">Live</span>`
          : `<span class="ph-status ph-status--soon">Soon</span>`;
        const inner = `
          <div class="ph-thumb ph-thumb--cat">${c.emoji || "📦"}</div>
          <div class="ph-row-body">
            <h3 class="ph-row-title">${esc(c.title)} ${status}</h3>
            <p class="ph-row-tagline">${esc(c.description)}</p>
          </div>
          <span class="ph-cat-arrow" aria-hidden="true">→</span>`;
        return live || c.path
          ? `<a href="${esc(href)}" class="ph-row ph-cat-row">${inner}</a>`
          : `<div class="ph-row ph-cat-row" style="opacity:0.75">${inner}</div>`;
      })
      .join("");

    let toolPreview = "";
    if (meetingData?.tools?.length) {
      const tools = [...meetingData.tools].sort((a, b) => a.rank - b.rank).slice(0, 5);
      toolPreview = `
      <div class="ph-section-head" id="leaderboard">
        <h2>AI 미팅 노트 · 상위 ${tools.length}</h2>
        <span><a href="${esc(global.ToolcadePaths?.asset("categories/meeting-notes/index.html") || "#")}" style="color:var(--ph-brand)">전체 보기 →</a></span>
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
        <span>주제별 큐레이션</span>
      </div>
      <div class="ph-list" style="margin-bottom:32px">${catRows}</div>

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

    root.innerHTML = renderCategoryMain(data);

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

  global.ToolcadeRender = {
    mountCategoryPage,
    mountHomePage,
    loadJson,
    withUtm: (...args) => global.ToolcadeAnalytics.withUtm(...args),
  };
})(window);
