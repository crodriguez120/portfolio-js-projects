const modal = document.getElementById("modal");
const modalShow = document.getElementById("show-modal");
const modalClose = document.getElementById("close-modal");
const bookmarkForm = document.getElementById("bookmark-form");
const websiteNameEl = document.getElementById("website-name");
const websiteUrlEl = document.getElementById("website-url");
const bookmarkContainer = document.getElementById("bookmarks-container");

let bookmarks = {};

// Show Modal, focus on Input
function showModal() {
    modal.classList.add("show-modal");
    websiteNameEl.focus();
}

// Modal Event Listeners
modalShow.addEventListener("click", showModal);
modalClose.addEventListener("click", () => modal.classList.remove("show-modal"));
window.addEventListener("click", (e) => e.target === modal ? modal.classList.remove("show-modal") : false);

// Validate Form
function validate(nameValue, urlValue) {
    const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
    const regex = new RegExp(expression);
    if (!urlValue || !nameValue) {
        alert("Please submit value for both fields");
        return false;
    }
    if (!urlValue.match(regex)) {
        alert("Please provide a valid web address");
        return false;
    }
    // Valid
    return true;
}

// Build Bookmarks
function buildBookmarks() {
    // Remove all bookmark elements
    bookmarkContainer.textContent = "";
    // Build items
    Object.keys(bookmarks).forEach((id) => {

        const {name, url} = bookmarks[id];

        // Item
        const item = document.createElement("div");
        item.classList.add("item");
        // Close Icons
        const closeIcon = document.createElement("i");
        closeIcon.classList.add("fas", "fa-times");
        closeIcon.setAttribute("title", "Delete Bookmark");
        closeIcon.setAttribute("onClick", `deleteBookmark("${id}")`)
        // Favicon / Link Container
        const linkInfo = document.createElement("div");
        linkInfo.classList.add("name");
        // Favicon
        const favicon = document.createElement("img");
        favicon.setAttribute("src", `https://www.google.com/s2/favicons?domain=${url}`);
        favicon.setAttribute("alt", "Favicon");
        // Link
        const link = document.createElement("a");
        link.setAttribute("href", `${url}`);
        link.setAttribute("target", "_blank")
        link.textContent = name;
        // Append to Bookmarks Container
        linkInfo.append(favicon, link);
        item.append(closeIcon, linkInfo);
        bookmarkContainer.appendChild(item);
    });
}

// Fetch Bookmarks
function fetchBookmarks() {
    // Get bookmarks from localStorage if available
    if (localStorage.getItem("bookmarks")) {
        bookmarks = JSON.parse(localStorage.getItem("bookmarks"))
    } else {
        id = `https://www.carlos.com`
        bookmarks[id] = {
                name: "Carlos Design",
                url: "https://www.carlos.com"
            }
        
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    }
    buildBookmarks();
}

// Delete Bookmarks
function deleteBookmark(id) {
    // Loop through the bookmarks array
    if (bookmarks[id]) {
        delete bookmarks[id]
    }
    // Update Bookmarks Array in localStorage, re-populate DOM
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    fetchBookmarks();
}

// Handle Data from Form
function storeBookmark(e) {
    e.preventDefault();
    const nameValue = websiteNameEl.value;
    let urlValue = websiteUrlEl.value;
    if (!urlValue.includes("http://", "https://")) {
        urlValue = `https://${urlValue}`;
    }
    // Validate
    if (!validate(nameValue, urlValue)) {
        return false;
    }
    // Set bookmark object, add to array
    const bookmark = {
        name: nameValue,
        url: urlValue
    }
    bookmarks[urlValue] = bookmark;
    // Set bookmarks in localStorage, fetch, reset input fields
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    fetchBookmarks();
    bookmarkForm.reset();
    websiteNameEl.focus();
}

// Event Listener
bookmarkForm.addEventListener("submit", storeBookmark);

// On Load, Fetch bookmarks
fetchBookmarks();
