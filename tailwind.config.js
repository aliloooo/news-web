module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        vintage: {
          cream: '#FDFBF7',
          mustard: '#E5D5A6',
          orange: '#EEA47F',
          teal: '#00539C',
          red: '#C94C4C',
          ink: '#2B2B2B',
          paper: '#F2EFE9', // Slightly darker cream for cards
        }
      },
      fontFamily: {
        headline: ['"Playfair Display"', 'serif'],
        body: ['Georgia', 'serif'],
        sans: ['"Helvetica Neue"', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        'retro': '4px 4px 0px 0px rgba(43, 43, 43, 1)', // Solid hard shadow
        'retro-hover': '6px 6px 0px 0px rgba(0, 83, 156, 1)', // Teal hard shadow
        'retro-red': '6px 6px 0px 0px rgba(201, 76, 76, 1)',
      }
    },
  },
  plugins: [],
};