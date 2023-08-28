
import {
    handleSearchFormSubmit,
    handleSearchCancelButtonClick,
    initializeSearchCancelButton,
    initializeSearchOverlay,
} from './search.js';

/**
 * Initialize search form and search overlay event listeners.
 */
document.addEventListener('DOMContentLoaded', function () {
    /**
     * Search form submission event listener.
     * @param {Event} event - The form submission event.
     */
    const searchForm = document.querySelector('[data-search-form]');
    if (searchForm) {
        searchForm.addEventListener('submit', handleSearchFormSubmit);
    }

    /**
     * Search cancel button and overlay event listeners.
     */
    const searchCancelButton = document.querySelector('[data-search-cancel]');
    const searchOverlayElement = document.querySelector('[data-search-overlay]');
    if (searchCancelButton && searchOverlayElement) {
        searchCancelButton.addEventListener('click', handleSearchCancelButtonClick);

        searchOverlayElement.addEventListener('toggle', function () {
            if (searchOverlayElement.open === true) {
                searchCancelButton.disabled = false;
            }
        });
    }

    // Initialize search cancel button and overlay
    initializeSearchCancelButton();
    initializeSearchOverlay();
});

import { handleDataListButtonClick } from './dataListButton.js';

/**
 * Attach the event listener for data list button when DOM content is loaded.
 */
document.addEventListener('DOMContentLoaded', function () {
    handleDataListButtonClick();
});

// Other code in main.js

import { showThemeSelectionDialog } from './theme.js';

document.addEventListener('DOMContentLoaded', function () {
    const settingsButton = document.querySelector('[data-header-settings]');
    if (settingsButton) {
        /**
         * Event listener for theme selection dialog.
         */
        settingsButton.addEventListener('click', showThemeSelectionDialog);
    }
});

import { createAuthors } from './authorSelect.js'; // Make sure the correct path is provided
import { authors } from "./data.js";


document.addEventListener('DOMContentLoaded', function () {
    const authorsSelect = document.querySelector('[data-list-authors]');
    if (authorsSelect) {
        createAuthors(authorsSelect, authors); // Pass the authorsSelect element and authors object
    }

    const searchAuthorsSelect = document.querySelector('[data-search-authors]');
    if (searchAuthorsSelect) {
        createAuthors(searchAuthorsSelect, authors); // Pass the searchAuthorsSelect element and authors object
    }
});

import { createGenreSelect } from './genreSelect.js';

document.addEventListener('DOMContentLoaded', function () {
    createGenreSelect();
});

import { handleSettingsButtonClick } from './settings.js';

document.addEventListener('DOMContentLoaded', function () {
    const settingsButton = document.querySelector('[data-header-settings]');
    if (settingsButton) {
        settingsButton.addEventListener('click', handleSettingsButtonClick);
    }
});

import { loadMoreBooks } from './bookList.js';

document.addEventListener('DOMContentLoaded', function () {
    loadMoreBooks();
});

document.addEventListener('DOMContentLoaded', function () {
    const authorsSelect = document.querySelector('[data-list-authors]');
    const searchAuthorsSelect = document.querySelector('[data-search-authors]');

    if (authorsSelect) {
        createAuthors(authorsSelect, authors); // Initializes author select options
    }

    if (searchAuthorsSelect) {
        createAuthors(searchAuthorsSelect, authors); // Initializes author select options
    }
});




