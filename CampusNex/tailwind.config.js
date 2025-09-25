/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          DEFAULT: '#FF6B35',
          light: '#FF8A5B',
          dark: '#E55A2B',
          50: '#FFF5F0',
          100: '#FEEADF',
          200: '#FDD6BF',
          300: '#FCB79F',
          400: '#FA997F',
          500: '#FF6B35',
          600: '#E55A2B',
          700: '#CC4A22',
          800: '#B23A1A',
          900: '#992A12',
        },
        'secondary': {
          DEFAULT: '#2B4777',
          light: '#3A5A8C',
          dark: '#1D3A62',
          50: '#F0F4F9',
          100: '#E0E9F4',
          200: '#C2D3E8',
          300: '#A3BDDD',
          400: '#85A7D2',
          500: '#5A84BE',
          600: '#3A5A8C',
          700: '#2B4777',
          800: '#1D3A62',
          900: '#0F2D4E',
        },
        'accent': {
          DEFAULT: '#2DD4BF',
          light: '#4FDED0',
          dark: '#20B3A2',
        },
        'royal-blue': '#2B4777',
        'warm-coral': '#FF6B6B',
        'bright-teal': '#2DD4BF',
        'neutral': {
          50: '#F8F9FA',
          100: '#E9ECEF',
          200: '#DEE2E6',
          300: '#CED4DA',
          400: '#ADB5BD',
          500: '#6C757D',
          600: '#495057',
          700: '#343A40',
          800: '#212529',
          900: '#121416',
        },
        'success': {
          DEFAULT: '#28A745',
          light: '#D4EDDA',
          dark: '#155724',
        },
        'warning': {
          DEFAULT: '#FFC107',
          light: '#FFF3CD',
          dark: '#856404',
        },
        'error': {
          DEFAULT: '#DC3545',
          light: '#F8D7DA',
          dark: '#721C24',
        },
        'info': {
          DEFAULT: '#17A2B8',
          light: '#D1ECF1',
          dark: '#0C5460',
        },
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
        'lalezar': ['Lalezar', 'cursive'],
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 6px 12px rgba(0, 0, 0, 0.15)',
        'dropdown': '0 2px 5px rgba(0, 0, 0, 0.1)',
        'button': '0 1px 3px rgba(0, 0, 0, 0.12)',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'fade-out': 'fadeOut 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-in-out',
        'slide-down': 'slideDown 0.3s ease-in-out',
        'slide-left': 'slideLeft 0.3s ease-in-out',
        'slide-right': 'slideRight 0.3s ease-in-out',
        'scale-in': 'scaleIn 0.3s ease-in-out',
        'scale-out': 'scaleOut 0.3s ease-in-out',
        'pulse-slow': 'pulse 2s infinite',
        'fadeInUp': 'fadeInUp 0.5s ease-out',
        'fadeInDown': 'fadeInDown 0.5s ease-out',
        'fadeInLeft': 'fadeInLeft 0.5s ease-out',
        'fadeInRight': 'fadeInRight 0.5s ease-out',
        'slideInFromTop': 'slideInFromTop 0.5s ease-out',
        'slideInFromBottom': 'slideInFromBottom 0.5s ease-out',
        'slideInFromLeft': 'slideInFromLeft 0.5s ease-out',
        'slideInFromRight': 'slideInFromRight 0.5s ease-out',
        'slideOutToTop': 'slideOutToTop 0.5s ease-in',
        'slideOutToBottom': 'slideOutToBottom 0.5s ease-in',
        'slideOutToLeft': 'slideOutToLeft 0.5s ease-in',
        'slideOutToRight': 'slideOutToRight 0.5s ease-in',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideLeft: {
          '0%': { transform: 'translateX(10px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideRight: {
          '0%': { transform: 'translateX(-10px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        scaleOut: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(0.9)', opacity: '0' },
        },
        fadeInUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeInDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeInLeft: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        fadeInRight: {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInFromTop: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInFromBottom: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInFromLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInFromRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideOutToTop: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(-100%)', opacity: '0' },
        },
        slideOutToBottom: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(100%)', opacity: '0' },
        },
        slideOutToLeft: {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(-100%)', opacity: '0' },
        },
        slideOutToRight: {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(100%)', opacity: '0' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

