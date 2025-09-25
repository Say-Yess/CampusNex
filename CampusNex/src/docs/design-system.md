# CampusNex Design System & Architecture Documentation

## Overview

The CampusNex design system is a comprehensive set of components, styles, and patterns designed to create a consistent, accessible, and engaging user experience across the application. This documentation outlines the design system's architecture, available components, utilities, and best practices.

## Core Design Principles

1. **Consistency**: Ensure a uniform look and feel across the application
2. **Accessibility**: Design for all users, regardless of abilities
3. **Responsiveness**: Provide optimal experiences across all device sizes
4. **Performance**: Create lightweight, optimized components
5. **Flexibility**: Allow for customization while maintaining consistency

## Color System

### Primary Colors

- `primary` - #FF6B35 (Warm Coral)
  - Used for primary actions, key highlights, and branding elements
  - Variants: light (#FF8A5B), dark (#E55A2B)
  - Includes a full palette from 50-900 for fine-grained control

### Secondary Colors

- `secondary` - #2B4777 (Royal Blue)
  - Used for secondary elements, backgrounds, and supporting UI
  - Variants: light (#3A5A8C), dark (#1D3A62)
  - Includes a full palette from 50-900

### Additional Colors

- `accent` - #2DD4BF (Bright Teal)
  - Used for accent elements and highlights
  - Variants: light (#4FDED0), dark (#20B3A2)

### Neutral Colors

- `neutral` - Grayscale palette from 50-900
  - Used for text, backgrounds, borders, and other UI elements
  - Provides sufficient contrast for accessibility

### Status Colors

- `success` - #28A745 (Green)
- `warning` - #FFC107 (Yellow)
- `error` - #DC3545 (Red)
- `info` - #17A2B8 (Blue)

## Typography

### Font Families

- `inter` - Primary font for body text and UI elements
- `poppins` - Used for headings and prominent text
- `montserrat` - Alternative font for certain UI elements
- `lalezar` - Decorative font for special elements

### Font Sizes

- We follow a consistent scale with 4px increments
- Base size: 16px (1rem)
- Heading sizes range from 1.5rem to 3rem
- Text sizes range from 0.75rem to 1.25rem

## Component Library

### Base Components

1. **Alert**
   - Variants: success, warning, error, info
   - Used to display important messages to users

2. **Badge**
   - Variants: primary, secondary, success, warning, error, info
   - Used to display small pieces of information or status

3. **Button**
   - Variants: primary, secondary, tertiary, danger
   - Sizes: sm, md, lg
   - States: default, hover, focus, disabled, loading

4. **Card**
   - Variants: default, elevated, flat
   - Used to group related content or actions

5. **Carousel**
   - Features: autoplay, navigation arrows, indicators
   - Used for displaying multiple items in a slideshow

6. **Footer**
   - Customizable columns, logo, and copyright information
   - Used for site-wide footer content

7. **Form**
   - Form-related components including fields, labels, and validation
   - Built for accessibility and ease of use

8. **Input**
   - Variants: text, number, email, password, textarea
   - States: default, focus, error, disabled

9. **Leaderboard**
   - Components for displaying ranked lists of users or items
   - Features top 3 highlight section and full list view

10. **Modal**
    - Sizes: sm, md, lg, xl, full
    - Used for displaying content that requires user attention

11. **Navbar**
    - Responsive navigation component
    - Supports branding, navigation links, and actions

12. **Toggle**
    - Switch control for boolean options
    - States: on/off, disabled

### Composite Components

1. **RSVPButton**
   - Complex component for event RSVP functionality
   - Combines Button and Modal components

2. **RSVPResultPopup**
   - Feedback component for RSVP actions
   - Uses Modal and Alert components

3. **EventCard**
   - Card component specialized for event display
   - Includes image, title, details, and action buttons

## Utilities

### Accessibility Utilities

Located in `src/utils/accessibility.js`:

1. **useFocusTrap**
   - Hook for managing focus within modal dialogs and other interactive elements
   - Ensures keyboard navigation stays within appropriate boundaries

2. **withAccessibility**
   - HOC that adds accessibility attributes to components
   - Handles common ARIA roles and properties

3. **ScreenReaderOnly**
   - Component for content visible only to screen readers
   - Maintains accessibility without affecting visual layout

4. **useKeyboardNavigation**
   - Hook for handling keyboard interactions
   - Provides consistent keyboard behavior across components

### Animation Utilities

Located in `src/utils/animations.js`:

1. **animations**
   - Predefined animation classes for common effects
   - Includes fade, slide, and scale animations

2. **useAnimation**
   - Hook for controlling animation states
   - Manages timing and transitions

3. **useScrollAnimation**
   - Hook for triggering animations on scroll
   - Implements "animate on visible" pattern

4. **AnimateOnScroll**
   - Component that animates children when they enter the viewport
   - Simplifies implementation of scroll animations

### Responsive Utilities

Located in `src/utils/responsive.js`:

1. **useBreakpoint**
   - Hook for detecting current screen breakpoint
   - Provides consistent responsive behavior

2. **Responsive**
   - Component for conditionally rendering content based on screen size
   - Simplifies responsive layouts

3. **withResponsive**
   - HOC that adds responsive capabilities to components
   - Provides breakpoint information to wrapped components

## Best Practices

### Component Usage

1. **Importing Components**
   ```jsx
   import { Button, Card, Input } from './components/ui';
   ```

2. **Customizing Components**
   ```jsx
   <Button 
     variant="primary"
     size="lg"
     className="custom-class"
   >
     Click Me
   </Button>
   ```

3. **Combining Components**
   ```jsx
   <Card>
     <h2>Card Title</h2>
     <p>Card content goes here...</p>
     <Button variant="primary">Action</Button>
   </Card>
   ```

### Accessibility

1. Always include appropriate ARIA attributes
2. Ensure sufficient color contrast (WCAG AA minimum)
3. Support keyboard navigation for all interactive elements
4. Provide text alternatives for non-text content
5. Use semantic HTML elements where possible

### Responsive Design

1. Design for mobile-first, then enhance for larger screens
2. Use the responsive utilities for conditional rendering
3. Test on multiple device sizes and orientations

### Animation

1. Use animations sparingly and purposefully
2. Ensure animations can be disabled for users with motion sensitivity
3. Keep animations subtle and brief (300-500ms)
4. Use the animation utilities for consistent behavior

## Implementation Guidelines

### Adding New Components

1. Create the component in `src/components/ui/`
2. Add appropriate PropTypes and default props
3. Export the component from `src/components/ui/index.js`
4. Document the component in this documentation

### Modifying Existing Components

1. Maintain backward compatibility where possible
2. Update PropTypes and default props as needed
3. Update documentation to reflect changes

### Testing Components

1. Test for accessibility using axe or similar tools
2. Test across different browsers and devices
3. Verify keyboard navigation works correctly
4. Ensure screen readers can interpret content correctly

## Roadmap

### Planned Enhancements

1. **Data Visualization Components**
   - Charts, graphs, and other data display components

2. **Animation Improvements**
   - More complex animation patterns and interactions

3. **Theme Customization**
   - Support for user-selected themes or color schemes

4. **Performance Optimizations**
   - Reduce bundle size and improve rendering performance

## Conclusion

The CampusNex design system provides a comprehensive set of tools for building consistent, accessible, and engaging user interfaces. By following the guidelines in this documentation, developers can create high-quality experiences that align with the project's visual identity and UX principles.