(function (global) {
  function githubPagesBase() {
    if (!location.hostname.endsWith("github.io")) return null;
    const parts = location.pathname.split("/").filter(Boolean);
    if (parts.length === 0) return null;
    const repo = parts[0];
    if (repo === "index.html") return null;
    return `/${repo}/`;
  }

  function root() {
    const meta = document.querySelector('meta[name="toolcade-root"]');
    if (meta?.content != null) return meta.content;
    if (location.protocol === "file:") return "./";
    return githubPagesBase() || "/";
  }

  function asset(path) {
    const raw = String(path);
    // 이미 상대/절대 URL이면 prefix를 다시 붙이지 않음
    if (/^(?:\.\.\/|\.\/|\/|https?:\/\/)/i.test(raw)) return raw;

    const base = root();
    const clean = raw.replace(/^\//, "");
    if (base === "/") return `/${clean}`;
    return `${base}${clean}`;
  }

  global.ToolcadePaths = { root, asset };
})(window);
