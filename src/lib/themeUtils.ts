export function applyTheme(themeId: string) {
    if (typeof document === 'undefined') return;

    const root = document.documentElement;
    // Remove previous theme classes
    root.classList.forEach((cls) => {
        if (cls.startsWith("theme-")) {
            root.classList.remove(cls);
        }
    });

    // Default "dark" means no extra class needed
    if (themeId !== "dark") {
        root.classList.add(`theme-${themeId}`);
    }
}
