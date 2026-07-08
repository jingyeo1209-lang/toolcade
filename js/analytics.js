(function (global) {
  const DEFAULT_UTM = {
    utm_source: "toolcade",
    utm_medium: "affiliate",
    utm_campaign: "meeting-notes",
  };

  function withUtm(url, extra = {}) {
    try {
      const u = new URL(url, window.location.href);
      const params = { ...DEFAULT_UTM, ...extra };
      Object.entries(params).forEach(([k, v]) => {
        if (v != null && v !== "" && !u.searchParams.has(k)) {
          u.searchParams.set(k, v);
        }
      });
      return u.toString();
    } catch {
      return url;
    }
  }

  function track(eventName, payload = {}) {
    const detail = {
      event: eventName,
      ...payload,
      ts: new Date().toISOString(),
      path: window.location.pathname,
    };

    console.info("[toolcade]", detail);

    if (typeof global.gtag === "function") {
      global.gtag("event", eventName, payload);
    }

    if (global.plausible) {
      global.plausible(eventName, { props: payload });
    }

    global.dispatchEvent(new CustomEvent("toolcade:track", { detail }));
  }

  function bindCtaClicks(root = document) {
    root.querySelectorAll("[data-tool-cta]").forEach((el) => {
      el.addEventListener("click", () => {
        track("tool_click", {
          tool_name: el.getAttribute("data-tool-name") || "",
          tool_slug: el.getAttribute("data-tool-slug") || "",
          cta_label: (el.textContent || "").trim(),
          destination: el.getAttribute("href") || "",
        });
      });
    });
  }

  global.ToolcadeAnalytics = { withUtm, track, bindCtaClicks, DEFAULT_UTM };
})(window);
