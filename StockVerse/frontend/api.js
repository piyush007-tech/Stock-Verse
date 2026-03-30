console.log("api.js loaded");

const newsContainer = document.getElementById("news-container");
const headline = document.getElementById("headline");

const btnLive = document.getElementById("btn-live");
const btnTrending = document.getElementById("btn-trending"); 
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");

/* ===============================
   SKELETON LOADER
   =============================== */
function showSkeletons(count = 5) {
  newsContainer.innerHTML = "";
  for (let i = 0; i < count; i++) {
    const skeleton = document.createElement("div");
    skeleton.className = "skeleton";
    skeleton.innerHTML = `
      <div class="skeleton-title"></div>
      <div class="skeleton-text"></div>
      <div class="skeleton-text"></div>
      <div class="skeleton-text short"></div>
    `;
    newsContainer.appendChild(skeleton);
  }
}

/* ===============================
   RENDER NEWS
   =============================== */
function renderNews(data, titleText) {
  newsContainer.innerHTML = "";
  headline.textContent = titleText;

  if (!data.articles || data.articles.length === 0) {
    newsContainer.innerHTML = "<p>No news found</p>";
    return;
  }

  data.articles.forEach(article => {
    const newsCard = document.createElement("div");
    const title = document.createElement("h3");
    const link = document.createElement("a");
    const source = document.createElement("p");
    const time = document.createElement("p");

    newsCard.className = "div-api";
    title.className = "h3-api";
    link.className = "p-api";
    source.className = "p2-api";
    time.className = "time-api";

    title.textContent = article.title || "No title available";

    link.href = article.url;
    link.textContent =
      article.description || "Read full article →";
    link.target = "_blank";
    link.rel = "noopener noreferrer";

    source.textContent =
      "Source: " + (article.source?.name || article.author || "Unknown");

    const dt = new Date(
      article.publishedAt || article.published || article.updatedAt
    );
    time.textContent = "Last Updated: " + dt.toLocaleString();

    newsCard.append(title, link, source, time);
    newsContainer.appendChild(newsCard);
  });
}

/* ===============================
   LOAD LIVE / TRENDING / LATEST
   =============================== */
function loadNews(type = "headlines") {
  showSkeletons();

  fetch(`https://stockverse-fyy7.onrender.com/api/news/${type}`)
    .then(res => res.json())
    .then(data => {
      const heading =
        type === "headlines"
          ? "Top Headlines"
          : type === "trending"
          ? "Trending News"
          : "Latest News";

      renderNews(data, heading);
    })
    .catch(err => {
      console.error(err);
      newsContainer.innerHTML = "<p>Error loading news</p>";
    });
}


function searchNews(query) {
  if (!query) return;

  showSkeletons();

  fetch(
    `https://stockverse-fyy7.onrender.com/api/news/search?q=${encodeURIComponent(query)}`
  )
    .then(async (res) => {

      /* ===============================
         LOG STATUS + HEADERS
         =============================== */
      console.log("Status Code:", res.status);

      console.log("Response Headers:");
      for (const [key, value] of res.headers.entries()) {
        console.log(`${key}: ${value}`);
      }

      /* ===============================
         HANDLE RATE LIMIT (429)
         =============================== */
      if (res.status === 429) {

        // Read Retry-After header (seconds)
        const retryAfter = res.headers.get("retry-after");

        // Read JSON error body
        const errorJson = await res.json();

        const error = errorJson.error;
        const message = errorJson.message;

        // Convert seconds to readable time
        const retrySeconds = retryAfter ? parseInt(retryAfter, 10) : null;
        const retryMessage = retrySeconds
          ? `Please try again in ${retrySeconds} seconds.`
          : "Please try again later.";

        // Show user-friendly message
        newsContainer.innerHTML = `
          <div style="color:#ff6b6b; text-align:center; padding:20px;">
            <h3>⚠️ ${error || "Rate Limit Exceeded"}</h3>
            <p>${message || "Too many requests."}</p>
            <p><strong>${retryMessage}</strong></p>
          </div>
        `;

        // Debug logs
        console.log("Rate Limit Error:");
        console.log("error:", error);
        console.log("message:", message);
        console.log("retry-after:", retryAfter);

        return; // stop further execution
      }

      /* ===============================
         HANDLE OTHER ERRORS
         =============================== */
      if (!res.ok) {
        throw new Error(`HTTP Error ${res.status}`);
      }

      /* ===============================
         SUCCESS RESPONSE
         =============================== */
      const data = await res.json();
      renderNews(data, `Search results for "${query}"`);
    })
    .catch((err) => {
      console.error("Search failed:", err);
      newsContainer.innerHTML = "<p>Error searching news</p>";
    });
}



/* ===============================
   EVENT LISTENERS
   =============================== */
btnLive.addEventListener("click", () => loadNews("headlines"));
btnTrending.addEventListener("click", () => alert("🚧 Trending section is under development.\nPlease check back soon!"));

searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  searchNews(query);
});

searchInput.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    searchNews(searchInput.value.trim());
  }
});

/* ===============================
   DEFAULT LOAD
   =============================== */
loadNews("headlines");
