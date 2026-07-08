(function (global) {
  function bundleUrl(jsonUrl) {
    return jsonUrl.replace(/\.json(\?.*)?$/, ".bundle.js");
  }

  function resolveUrl(url) {
    if (/^https?:\/\//i.test(url)) return url;
    if (global.ToolcadePaths?.asset) return global.ToolcadePaths.asset(url);
    return url;
  }

  function bundleKey(jsonUrl) {
    const file = jsonUrl.split("/").pop() || jsonUrl;
    return file.replace(/\.json(\?.*)?$/, "").replace(/\.bundle\.js(\?.*)?$/, "");
  }

  function loadScript(url) {
    const resolved = resolveUrl(url);
    return new Promise((resolve, reject) => {
      const existing = document.querySelector(`script[data-toolcade-bundle="${resolved}"]`);
      if (existing) {
        existing.addEventListener("load", () => resolve(), { once: true });
        existing.addEventListener("error", () => reject(new Error(`Failed to load ${resolved}`)), {
          once: true,
        });
        return;
      }

      const script = document.createElement("script");
      script.src = resolved;
      script.dataset.toolcadeBundle = resolved;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load ${resolved}`));
      document.head.appendChild(script);
    });
  }

  async function loadData(jsonUrl) {
    const resolved = resolveUrl(jsonUrl);
    const key = bundleKey(resolved);

    if (global.TOOLCADE_BUNDLES?.[key]) {
      return global.TOOLCADE_BUNDLES[key];
    }

    if (location.protocol !== "file:") {
      try {
        const res = await fetch(resolved);
        if (res.ok) return res.json();
      } catch {
        // fall through to bundle
      }
    }

    await loadScript(bundleUrl(resolved));
    const data = global.TOOLCADE_BUNDLES?.[key];
    if (!data) throw new Error(`Bundle missing for ${key}`);
    return data;
  }

  global.ToolcadeLoad = { loadData, bundleUrl, bundleKey };
})(window);
