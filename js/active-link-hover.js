document.addEventListener("DOMContentLoaded", () => {
  const REPO_BASE = "/ura-hovalot"; // имя репо на GitHub Pages

  const normalize = (path) => {
    path = decodeURIComponent(path);

    // убираем index.html
    path = path.replace(/index\.html$/i, "");

    // убираем конечный слэш (кроме корня)
    if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);

    // убираем префикс репозитория (если есть)
    if (path === REPO_BASE) return "/";
    if (path.startsWith(REPO_BASE + "/")) path = path.slice(REPO_BASE.length);

    // пустоту приводим к "/"
    if (path === "") path = "/";

    return path;
  };

  const current = normalize(window.location.pathname);

  document.querySelectorAll(".nav_link").forEach((a) => {
    // берём pathname из href
    const linkUrl = new URL(a.href, window.location.origin);
    const link = normalize(linkUrl.pathname);

    // отладка
    console.log("current:", current, "| link:", link);

    // подсветка
    if (current === link) a.classList.add("active");
    else a.classList.remove("active");
  });
});
