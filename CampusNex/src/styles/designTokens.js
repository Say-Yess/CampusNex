// src/styles/designTokens.js

/**
 * CampusNex Design System Tokens
 * This file defines the core design tokens for the CampusNex application
 */

export const colors = {
    // Primary colors
    primary: {
        main: '#FF6B35', // Orange
        light: '#FF8A5B',
        dark: '#E55A2B',
        contrast: '#FFFFFF',
    },
    secondary: {
        main: '#2B4777', // Royal Blue
        light: '#3A5A8C',
        dark: '#1D3A62',
        contrast: '#FFFFFF',
    },
    accent: {
        main: '#2DD4BF', // Bright Teal
        light: '#4FDED0',
        dark: '#20B3A2',
        contrast: '#FFFFFF',
    },

    // Neutral colors
    neutral: {
        white: '#FFFFFF',
        background: '#F8F9FA',
        light: '#E9ECEF',
        medium: '#CED4DA',
        dark: '#6C757D',
        text: '#212529',
    },

    // Status colors
    status: {
        success: {
            main: '#28A745',
            light: '#D4EDDA',
            dark: '#155724',
        },
        warning: {
            main: '#FFC107',
            light: '#FFF3CD',
            dark: '#856404',
        },
        error: {
            main: '#DC3545',
            light: '#F8D7DA',
            dark: '#721C24',
        },
        info: {
            main: '#17A2B8',
            light: '#D1ECF1',
            dark: '#0C5460',
        },
    },
};

export const typography = {
    fontFamily: {
        primary: 'Inter, sans-serif',
        heading: 'Inter, sans-serif',
        code: 'monospace',
    },

    // Font sizes (in rem to support accessibility)
    fontSize: {
        xs: '0.75rem',    // 12px
        sm: '0.875rem',   // 14px
        base: '1rem',     // 16px
        lg: '1.125rem',   // 18px
        xl: '1.25rem',    // 20px
        '2xl': '1.5rem',  // 24px
        '3xl': '1.875rem', // 30px
        '4xl': '2.25rem',  // 36px
        '5xl': '3rem',     // 48px
    },

    fontWeight: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
    },

    lineHeight: {
        tight: 1.25,
        normal: 1.5,
        relaxed: 1.75,
    },
};

export const spacing = {
    // Spacing scale (in rem)
    0: '0',
    1: '0.25rem',  // 4px
    2: '0.5rem',   // 8px
    3: '0.75rem',  // 12px
    4: '1rem',     // 16px
    5: '1.25rem',  // 20px
    6: '1.5rem',   // 24px
    8: '2rem',     // 32px
    10: '2.5rem',  // 40px
    12: '3rem',    // 48px
    16: '4rem',    // 64px
    20: '5rem',    // 80px
    24: '6rem',    // 96px
    32: '8rem',    // 128px
};

export const borders = {
    radius: {
        none: '0',
        sm: '0.125rem',   // 2px
        DEFAULT: '0.25rem', // 4px
        md: '0.375rem',   // 6px
        lg: '0.5rem',     // 8px
        xl: '0.75rem',    // 12px
        '2xl': '1rem',    // 16px
        '3xl': '1.5rem',  // 24px
        full: '9999px',
    },
    width: {
        0: '0',
        1: '1px',
        2: '2px',
        4: '4px',
        8: '8px',
    },
};

export const shadows = {
    none: 'none',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
};

export const breakpoints = {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
};

export const zIndex = {
    0: 0,
    10: 10,
    20: 20,
    30: 30,
    40: 40,
    50: 50,
    auto: 'auto',
    dropdown: 1000,
    sticky: 1100,
    fixed: 1200,
    modalBackdrop: 1300,
    modal: 1400,
    popover: 1500,
    tooltip: 1600,
};

const designTokens = {
    colors,
    typography,
    spacing,
    borders,
    shadows,
    breakpoints,
    zIndex,
};

export default designTokens;