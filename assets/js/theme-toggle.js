document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('theme-toggle');
    const darkCss = document.getElementById('dark-mode-css');
    const lightCss = document.getElementById('light-mode-css');

    // Check system preference
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Check local storage
    let currentTheme = localStorage.getItem('theme');

    // Initialize
    if (!currentTheme) {
        currentTheme = systemPrefersDark ? 'dark' : 'light';
    }

    applyTheme(currentTheme);

    if (toggleButton) {
        toggleButton.addEventListener('click', () => {
            // Toggle between light and dark
            if (currentTheme === 'dark') {
                currentTheme = 'light';
            } else {
                currentTheme = 'dark';
            }
            applyTheme(currentTheme);
        });
    }

    function applyTheme(theme) {
        // Reset both first to ensure clean state
        darkCss.disabled = true;
        lightCss.disabled = true;

        if (theme === 'dark') {
            darkCss.disabled = false;
            updateIcon('moon');
        } else {
            lightCss.disabled = false;
            updateIcon('sun');
        }

        // Save preference
        localStorage.setItem('theme', theme);
        currentTheme = theme;
    }

    function updateIcon(iconName) {
        if (!toggleButton) return;
        const icon = toggleButton.querySelector('i');
        if (icon) {
            icon.className = `fas fa-${iconName}`;
        }
    }
});
