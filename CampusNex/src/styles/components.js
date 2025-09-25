// src/styles/components.js

/**
 * CampusNex Component Styles
 * --------------------------
 * This file defines reusable component styles using TailwindCSS classes
 */

// Button variants
export const buttonStyles = {
    base: "flex items-center justify-center rounded-lg transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed",

    // Variants
    primary: "bg-primary text-white hover:bg-primary-dark focus:ring-primary",
    secondary: "bg-secondary text-white hover:bg-secondary-dark focus:ring-secondary",
    tertiary: "bg-white border border-neutral-300 text-neutral-800 hover:bg-neutral-50 focus:ring-neutral-400",
    danger: "bg-error text-white hover:bg-error-dark focus:ring-error",

    // Sizes
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-2.5 text-lg",

    // States
    withIcon: "inline-flex items-center gap-2",
    loading: "opacity-80 cursor-wait",
};

// Card variants
export const cardStyles = {
    base: "bg-white rounded-xl overflow-hidden",

    // Variants
    default: "border border-neutral-200 shadow-card",
    elevated: "border border-neutral-200 shadow-md",
    outline: "border-2 border-neutral-300",

    // States
    hover: "transition-all duration-200 hover:shadow-card-hover hover:-translate-y-1",
    selected: "border-2 border-primary",

    // Content sections
    header: "px-6 py-4 border-b border-neutral-200",
    body: "p-6",
    footer: "px-6 py-4 border-t border-neutral-200 bg-neutral-50",
};

// Form control styles
export const formStyles = {
    // Label
    label: "block text-sm font-medium text-neutral-700 mb-1",

    // Input
    input: {
        base: "w-full rounded-lg border-neutral-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-20 transition-colors duration-200",
        error: "border-error focus:border-error focus:ring-error",
        success: "border-success focus:border-success focus:ring-success",
        sizes: {
            sm: "px-3 py-1.5 text-sm",
            md: "px-4 py-2 text-base",
            lg: "px-4 py-2.5 text-lg",
        },
    },

    // Select
    select: {
        base: "w-full rounded-lg border-neutral-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-20 transition-colors duration-200",
        error: "border-error focus:border-error focus:ring-error",
        success: "border-success focus:border-success focus:ring-success",
    },

    // Checkbox/Radio
    checkbox: {
        base: "rounded border-neutral-300 text-primary focus:ring-primary",
        error: "border-error focus:ring-error",
    },

    radio: {
        base: "border-neutral-300 text-primary focus:ring-primary",
        error: "border-error focus:ring-error",
    },

    // Helper text
    helperText: "mt-1 text-sm text-neutral-500",
    errorText: "mt-1 text-sm text-error",
    successText: "mt-1 text-sm text-success",
};

// Navigation styles
export const navStyles = {
    // Main navbar
    navbar: {
        base: "w-full bg-white shadow-sm",
        container: "px-4 md:px-6 py-3 flex items-center justify-between",
        brand: "text-2xl font-bold text-primary flex items-center gap-2",
        navLinks: "hidden md:flex items-center space-x-1",
        navLink: {
            base: "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200",
            default: "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50",
            active: "text-primary bg-primary-light/10 font-semibold",
        },
        mobileMenu: "md:hidden",
        mobileMenuButton: "inline-flex items-center justify-center p-2 rounded-md text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary",
    },

    // Sidebar
    sidebar: {
        base: "h-full bg-white border-r border-neutral-200",
        nav: "flex flex-col h-full py-6",
        navItem: {
            base: "flex items-center px-6 py-2.5 text-sm font-medium rounded-md transition-colors duration-200",
            default: "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900",
            active: "bg-primary-light/10 text-primary font-semibold",
        },
        navGroup: {
            header: "px-6 py-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider",
            items: "mt-1 space-y-1",
        },
    },

    // Tabs
    tabs: {
        base: "border-b border-neutral-200",
        list: "flex space-x-8",
        tab: {
            base: "py-4 px-1 font-medium text-sm border-b-2 whitespace-nowrap",
            default: "text-neutral-500 border-transparent hover:text-neutral-700 hover:border-neutral-300",
            active: "text-primary border-primary font-semibold",
        },
    },
};

// Badge styles
export const badgeStyles = {
    base: "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",

    // Variants
    primary: "bg-primary-light text-primary-dark",
    secondary: "bg-secondary-light text-secondary-dark",
    success: "bg-success-light text-success-dark",
    warning: "bg-warning-light text-warning-dark",
    error: "bg-error-light text-error-dark",
    info: "bg-info-light text-info-dark",
    neutral: "bg-neutral-100 text-neutral-800",

    // Sizes
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-0.5 text-sm",
    lg: "px-3 py-1 text-base",
};

// Loading indicators
export const loadingStyles = {
    spinner: "animate-spin h-5 w-5 text-current",
    skeleton: "animate-pulse bg-neutral-200 rounded",
    dots: "flex space-x-1",
    dot: "h-2 w-2 bg-current rounded-full animate-pulse",
};

// Alert styles
export const alertStyles = {
    base: "p-4 rounded-lg border flex items-start gap-3",

    // Variants
    success: "bg-success-light border-success text-success-dark",
    warning: "bg-warning-light border-warning text-warning-dark",
    error: "bg-error-light border-error text-error-dark",
    info: "bg-info-light border-info text-info-dark",

    // Elements
    icon: "flex-shrink-0 h-5 w-5",
    title: "text-sm font-medium",
    body: "text-sm mt-1",
    action: "ml-auto pl-3",
};

// Modal/Dialog styles
export const modalStyles = {
    backdrop: "fixed inset-0 bg-neutral-900/75 backdrop-blur-sm transition-opacity",
    container: "fixed inset-0 z-modal overflow-y-auto",
    centered: "flex min-h-full items-center justify-center p-4 text-center",
    content: "relative transform overflow-hidden rounded-xl bg-white text-left shadow-xl transition-all w-full max-w-md",
    header: "px-6 py-4 border-b border-neutral-200 flex items-center justify-between",
    title: "text-lg font-semibold text-neutral-900",
    closeButton: "text-neutral-400 hover:text-neutral-500",
    body: "px-6 py-4",
    footer: "px-6 py-4 bg-neutral-50 border-t border-neutral-200 flex justify-end gap-3",
};

// Typography styles
export const typographyStyles = {
    h1: "text-4xl font-bold text-neutral-900",
    h2: "text-3xl font-bold text-neutral-900",
    h3: "text-2xl font-bold text-neutral-900",
    h4: "text-xl font-semibold text-neutral-900",
    h5: "text-lg font-semibold text-neutral-900",
    h6: "text-base font-semibold text-neutral-900",

    body1: "text-base text-neutral-700",
    body2: "text-sm text-neutral-700",

    caption: "text-xs text-neutral-500",

    link: "text-primary hover:text-primary-dark transition-colors duration-200",
};

// All component styles
const componentStyles = {
    buttonStyles,
    cardStyles,
    formStyles,
    navStyles,
    badgeStyles,
    loadingStyles,
    alertStyles,
    modalStyles,
    typographyStyles,
};

export default componentStyles;