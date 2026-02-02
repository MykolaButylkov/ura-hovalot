const CARDS_PER_PAGE = 9; // как на скрине: 3x3
let allArticles = [];
let currentPage = 1;

function getPageFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const p = parseInt(params.get("page") || "1", 10);
  return Number.isFinite(p) && p > 0 ? p : 1;
}

function setPageToUrl(page) {
  const url = new URL(window.location.href);
  url.searchParams.set("page", String(page));
  history.pushState({}, "", url);
}

function renderCards(page) {
  const cardsEl = document.getElementById("cards");
  cardsEl.innerHTML = "";

  const start = (page - 1) * CARDS_PER_PAGE;
  const items = allArticles.slice(start, start + CARDS_PER_PAGE);

  items.forEach((a) => {
    const card = document.createElement("a");
    card.href = a.url; // отдельная страница статьи
    card.className =
      "block bg-white rounded-lg border border-gray-200 shadow-sm p-6 hover:shadow-md transition";

    card.innerHTML = `
      <h3 class="text-lg font-bold text-[#684597] mb-3">${a.title}</h3>
      <p class="text-gray-600 leading-relaxed mb-4">${a.excerpt}</p>
      <span class="text-[#684597] font-semibold">קרא עוד</span>
    `;

    cardsEl.appendChild(card);
  });
}

function renderPagination(page) {
  const pagEl = document.getElementById("pagination");
  pagEl.innerHTML = "";

  const totalPages = Math.ceil(allArticles.length / CARDS_PER_PAGE);
  if (totalPages <= 1) return;

  const makeBtn = (label, targetPage, isActive = false) => {
    const btn = document.createElement("button");
    btn.textContent = label;
    btn.className =
      "px-3 py-1 rounded border text-sm " +
      (isActive
        ? "bg-[#684597] text-white border-[#684597]"
        : "bg-white text-[#684597] border-gray-300 hover:bg-gray-100");
    btn.onclick = () => goToPage(targetPage);
    return btn;
  };

  // Prev
  if (page > 1) pagEl.appendChild(makeBtn("‹", page - 1));

  // Показываем “окно” страниц как на сайтах: например 1..5
  const windowSize = 7;
  let start = Math.max(1, page - Math.floor(windowSize / 2));
  let end = Math.min(totalPages, start + windowSize - 1);
  start = Math.max(1, end - windowSize + 1);

  for (let p = start; p <= end; p++) {
    pagEl.appendChild(makeBtn(String(p), p, p === page));
  }

  // Next
  if (page < totalPages) pagEl.appendChild(makeBtn("›", page + 1));
}

function goToPage(page) {
  currentPage = page;
  setPageToUrl(page);
  renderCards(page);
  renderPagination(page);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

async function init() {
  currentPage = getPageFromUrl();

  const res = await fetch("./data/articles.json");
  allArticles = await res.json();

  const totalPages = Math.ceil(allArticles.length / CARDS_PER_PAGE);
  if (currentPage > totalPages) currentPage = totalPages || 1;

  renderCards(currentPage);
  renderPagination(currentPage);
}

window.addEventListener("popstate", () => {
  currentPage = getPageFromUrl();
  renderCards(currentPage);
  renderPagination(currentPage);
});

init();
