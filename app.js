/* eslint-disable no-undef */
document.addEventListener('DOMContentLoaded', () => {
    const resetButton = document.getElementById('resetButton');
    resetButton.addEventListener('click', () => {
        const form = document.getElementById('searchForm');
        if (form) {
            form.reset();
        }

        // Je redirige vers la page de recherche avec le formulaire
        window.location.href = '/search';
    });
});

