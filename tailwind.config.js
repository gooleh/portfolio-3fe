// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2D3436',    // 차콜 그레이
        secondary: '#636E72',  // 미디엄 그레이
        background: '#F5F6FA', // 연한 회색빛 화이트
        surface: '#FFFFFF',    // 순수 화이트
        textPrimary: '#1A1A1A',// 거의 검정
        textSecondary: '#718096'// 슬레이트 그레이
      },
    },
    fontFamily: {
      sans: ['Nunito', 'sans-serif'],
    },
  },
  plugins: [],
}
