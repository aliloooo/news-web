export const themes = {
    default: {
        name: 'default',
        primary: 'vintage-teal',
        bgApp: 'bg-vintage-cream',
        textMain: 'text-vintage-ink',
        cardBg: 'bg-white',
        cardBorder: 'border-2 border-vintage-ink',
        cardText: 'text-gray-700',
        btnPrimary: 'text-vintage-teal hover:text-vintage-red hover:underline decoration-2 underline-offset-4',
        badge: 'bg-vintage-mustard text-vintage-ink border-2 border-vintage-ink',
        layoutBorder: 'border-b-4 border-vintage-ink',
        shadow: 'shadow-retro hover:shadow-retro-hover',
        isDark: false
    },
    indonesia: {
        name: 'indonesia',
        primary: 'vintage-red',
        bgApp: 'bg-vintage-cream',
        textMain: 'text-vintage-ink',
        navBg: 'bg-vintage-orange',
        cardBg: 'bg-vintage-paper', // Warmer card for red theme
        cardBorder: 'border-2 border-vintage-ink',
        cardText: 'text-vintage-ink',
        btnPrimary: 'text-vintage-red hover:text-vintage-teal font-bold tracking-wide uppercase',
        badge: 'bg-vintage-red text-white border-2 border-vintage-ink',
        layoutBorder: 'border-b-4 border-vintage-red',
        shadow: 'shadow-retro hover:shadow-retro-red',
        isDark: false
    },
    programming: {
        name: 'programming',
        primary: 'vintage-teal',
        bgApp: 'bg-vintage-cream', // Keeping cream background for consistency, but using teal accents
        textMain: 'text-vintage-ink',
        navBg: 'bg-vintage-teal',
        cardBg: 'bg-white',
        cardBorder: 'border-2 border-vintage-ink',
        cardText: 'text-gray-600 font-mono text-sm', // Mono font for code feel
        btnPrimary: 'text-vintage-teal hover:bg-vintage-teal hover:text-white px-2 py-1 transition-colors',
        badge: 'bg-vintage-teal text-white border-2 border-vintage-ink',
        layoutBorder: 'border-b-4 border-vintage-teal',
        shadow: 'shadow-retro hover:shadow-retro-hover',
        isDark: false // Switching programming to light retro theme to match overall aesthetic
    }
};

export const getTheme = (key) => themes[key] || themes.default;
