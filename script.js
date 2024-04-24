const apikey = 'd2c04654a35341b7af7c8f572bf2f08a'

const blogContainer = document.getElementById("blog-container");
const searchButton = document.getElementById("search-button"); // Declaring searchButton

async function fetchRandomNews() {
    try {
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${apikey}`; // Corrected apiUrl variable
        const response = await fetch(apiUrl);

        const data = await response.json();
        console.log(data);

        return data.articles;
    } catch (error) {
        console.error("Error Fetching News :(", error);
        return [];
    }
}

searchButton.addEventListener("click", async () => {
    const query = document.getElementById("search-input").value.trim(); // Accessing searchField value directly
    if (query !== "") {
        try {
            const articles = await fetchNewsQuery(query);
            displayBlog(articles);
        } catch (error) {
            console.error("Error fetching news by query:", error);
        }
    }
});

async function fetchNewsQuery(query) {
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apiKey=${apikey}`; // Corrected apiUrl variable
        const response = await fetch(apiUrl);

        const data = await response.json();
        console.log(data);

        return data.articles;
    } catch (error) {
        console.error("Error Fetching News :(", error);
        return [];
    }
}

function displayBlog(articles) {
    blogContainer.innerHTML = "";
    articles.forEach((article) => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");
        const img = document.createElement("img");
        img.src = article.urlToImage;
        img.alt = article.title;
        const title = document.createElement("h2");
        title.textContent = article.title;
        const description = document.createElement("p");
        description.textContent = article.description;

        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogContainer.appendChild(blogCard);
    });
}

(async () => {
    try {
        const articles = await fetchRandomNews();
        displayBlog(articles);
    } catch (error) {
        console.error("Error fetching Random News");
    }
})();






