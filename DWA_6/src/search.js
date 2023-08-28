import { books, authors, BOOKS_PER_PAGE } from './data.js';
import { page } from './bookList.js';

/**
 * Handles the form submission event for the search form.
 *
 * @param {Event} event - The form submission event.
 */
export function handleSearchFormSubmit(event) {
    /**
     * Prevents the default form submission behavior and initiates book search.
     *
     * @event Event#submit
     * @param {Event} event - The form submission event.
     */
    event.preventDefault();

    // Extract filter data from form
    const formData = new FormData(event.target);
    const filters = Object.fromEntries(formData);
    const results = [];

    // Loop through books and apply filters
    for (const book of books) {
        const titleMatch = filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase());

        const authorId = filters.author;
        const genre = filters.genre;

        const authorMatch = authorId === 'any' || book.author === authorId;
        const genreMatch = genre === 'any' || book.genres.includes(genre);

        if (titleMatch && authorMatch && genreMatch) {
            results.push(book);
        }
    }

    // Update the book list with filtered results
    updateBookList(results);

    // Enable search cancel and submit buttons
    const searchCancelButton = document.querySelector('[data-search-cancel]');
    const searchButton = document.querySelector('[data-search-button]');
    if (searchCancelButton && searchButton) {
        /**
         * Enables the search cancel and submit buttons.
         */
        searchCancelButton.disabled = false;
        searchButton.disabled = false;
    }
}


/**
 * Updates the book list based on the search results.
 *
 * @param {Array} results - An array of book objects representing search results.
 */
export function updateBookList(results) {
    // Select necessary elements
    const dataListItems = document.querySelector('[data-list-items]');
    const dataListButton = document.querySelector('[data-list-button]');
    const dataSearchOverlay = document.querySelector('[data-search-overlay]');
    const dataListMessage = document.querySelector('[data-list-message]');

    // Calculate remaining books
    const remainingBooks = results.length - (page * BOOKS_PER_PAGE);
    const hasRemaining = remainingBooks > 0;
    const remaining = hasRemaining ? remainingBooks : 0;

    // Update "Show more" button
    if (dataListButton) {
        dataListButton.disabled = !hasRemaining;
    }

    // Update "Show more" button text and visibility
    if (dataListButton) {
        dataListButton.innerHTML = `
            <span>Show more</span>
            <span class="list__remaining">(${remaining})</span>
        `;
    }

    // Create document fragment to hold book previews
    const fragment = document.createDocumentFragment();

    // Populate fragment with book previews
    for (const book of results) {
        const { author: authorId, id, image, title } = book;
        const element = document.createElement('button');
        element.classList.add('preview');
        element.setAttribute('data-preview', id);

        element.innerHTML = `
            <img class="preview__image" src="${image}" />
            <div class="preview__info">
                <h3 class="preview__title">${title}</h3>
                <div class="preview__author">${authors[authorId]}</div>
            </div>
        `;

        fragment.appendChild(element);
    }

    // Clear and update data list items
    dataListItems.innerHTML = '';
    dataListItems.appendChild(fragment);

    // Show or hide no results message
    if (dataListMessage) {
        dataListMessage.style.display = results.length === 0 ? 'block' : 'none';
    }

    // Show or hide "Show more" button and no results message
    if (dataListButton && dataListMessage) {
        dataListButton.style.display = results.length > 0 ? 'block' : 'none';
        dataListMessage.style.display = results.length === 0 ? 'block' : 'none';
    }

    // Scroll to top of page
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Close search overlay
    if (dataSearchOverlay) {
        dataSearchOverlay.open = false;
    }
}

/**
 * Handles the click event for the search cancel button.
 */
export function handleSearchCancelButtonClick() {
    const searchOverlayElement = document.querySelector('[data-search-overlay]');
    if (searchOverlayElement.open === true) {
        /**
         * Closes the search overlay when the search cancel button is clicked.
         */
        searchOverlayElement.open = false;
    }
}

/**
 * Initializes the search cancel button event listener.
 */
export function initializeSearchCancelButton() {
    const searchCancelButton = document.querySelector('[data-search-cancel]');
    if (searchCancelButton) {
        searchCancelButton.addEventListener('click', handleSearchCancelButtonClick);
    }
}



/**
 * Attaches event listeners for search form initialization when the DOM is loaded.
 */
document.addEventListener('DOMContentLoaded', function () {
    /**
     * Initializes search form and search overlay event listeners.
     *
     * @event Event#DOMContentLoaded
     */
    const searchForm = document.querySelector('[data-search-form]');
    if (searchForm) {
        searchForm.addEventListener('submit', handleSearchFormSubmit);
    }

    // Initialize Search Cancel Button
    initializeSearchCancelButton();

    const searchOverlayElement = document.querySelector('[data-search-overlay]');
    if (searchOverlayElement) {
        searchOverlayElement.addEventListener('toggle', function () {
            /**
             * Enables the search cancel button when the search overlay is open.
             */
            if (searchOverlayElement.open === true) {
                const searchCancelButton = document.querySelector('[data-search-cancel]');
                if (searchCancelButton) {
                    searchCancelButton.disabled = false;
                }
            }
        });
    }
});

/**
 * Initializes the search overlay and attaches event listener for opening the overlay.
 */
export function initializeSearchOverlay() {
    document.querySelector('[data-header-search]').addEventListener('click', function () {
        const searchOverlay = document.querySelector('[data-search-overlay]');
        const searchTitle = document.querySelector('[data-search-title]');

        /**
         * Opens the search overlay and focuses on the search input.
         */
        searchOverlay.open = true;
        searchTitle.focus();
    });
}

/**
 * Attaches the event listener for search overlay initialization when the DOM is loaded.
 */
document.addEventListener('DOMContentLoaded', function () {
    initializeSearchOverlay();
});

