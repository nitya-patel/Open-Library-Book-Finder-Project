const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const bookContainer = document.getElementById("bookContainer");
const loading = document.getElementById("loading");

async function fetchBooks(query) {
    loading.classList.remove("hidden");
    bookContainer.innerHTML = "";

    try {
        const response = await fetch(
            `https://openlibrary.org/search.json?q=${query}`
        );

        const data = await response.json();

        displayBooks(data.docs);
    } catch (error) {
        bookContainer.innerHTML = "<p>Something went wrong.</p>";
    } finally {
        loading.classList.add("hidden");
    }
}

function displayBooks(books) {
    if (books.length === 0) {
        bookContainer.innerHTML = "<p>No books found.</p>";
        return;
    }

    bookContainer.innerHTML = books
        .slice(0, 12)
        .map((book) => {
            const coverId = book.cover_i
                ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                : "https://via.placeholder.com/150";

            return `
                <div class="book-card">
                    <img src="${coverId}" alt="${book.title}" />
                    <h3>${book.title}</h3>
                    <p><strong>Author:</strong> ${
                        book.author_name
                            ? book.author_name[0]
                            : "Unknown"
                    }</p>
                    <p><strong>Year:</strong> ${
                        book.first_publish_year || "N/A"
                    }</p>
                </div>
            `;
        })
        .join("");
}

searchBtn.addEventListener("click", () => {
    const query = searchInput.value.trim();

    if (query) {
        fetchBooks(query);
    }
});