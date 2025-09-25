# CampusNex UI Design System

This document outlines the new design system and UI components implemented in CampusNex to improve user experience and provide a consistent look and feel across the application.

## Design Tokens

### Colors

The design system uses a consistent color palette with primary and secondary colors, along with supporting colors for notifications, errors, and neutral tones:

- **Primary**: Used for primary actions, important elements, and brand identity
- **Secondary**: Used for secondary actions and accents
- **Success**: Used for success messages and indicators
- **Warning**: Used for warning messages and indicators
- **Error**: Used for error messages and indicators
- **Info**: Used for informational messages and indicators
- **Neutral**: Used for text, backgrounds, and borders in a variety of shades

### Typography

The application uses a clear typography hierarchy:

- **Font Family**: System fonts with good readability
- **Font Sizes**: Consistent sizes from xs to 3xl
- **Font Weights**: Regular (400), Medium (500), and Bold (700)
- **Line Heights**: Appropriate for each text size

### Spacing

A consistent spacing scale is used throughout the application:

- **0**: 0px
- **1**: 0.25rem (4px)
- **2**: 0.5rem (8px)
- **3**: 0.75rem (12px)
- **4**: 1rem (16px)
- **6**: 1.5rem (24px)
- **8**: 2rem (32px)
- **12**: 3rem (48px)
- **16**: 4rem (64px)

### Borders & Shadows

- **Border Radius**: Consistent rounding with sm, md, lg, xl, and full options
- **Shadows**: Various elevation levels for cards and modals
- **Border Widths**: 1px, 2px, and 4px options with consistent colors

## UI Components

The following components have been implemented as part of the design system:

### Basic Components

1. **Button**
   - Variants: primary, secondary, tertiary, danger
   - Sizes: sm, md, lg
   - States: default, hover, focus, disabled, loading

2. **Input**
   - Types: text, email, password, number, etc.
   - States: default, focus, error, disabled
   - Helper text and error message support

3. **Badge**
   - Variants: default, primary, secondary, success, danger, warning, info
   - Sizes: sm, md, lg

4. **Card**
   - Variants: default, elevated, flat, outlined
   - Padding options: none, small, default, large

5. **Alert**
   - Variants: info, success, warning, error
   - Optional title and dismissible functionality

6. **Toggle**
   - Sizes: sm, md, lg
   - States: on/off, disabled

7. **Modal**
   - Sizes: sm, md, lg, xl, full
   - Optional title and close button
   - Portal-based implementation

8. **Form**
   - Form component with responsive layout
   - FormSection for grouping form elements
   - FormGroup for creating responsive form layouts

### Updated Components

The following existing components have been updated to use the new design system:

1. **EventCard**: Redesigned to use Card component with consistent styling
2. **TextInput**: Updated to use the new Input component
3. **PasswordInput**: Updated to use the new Input component with toggle functionality
4. **PrimaryButton**: Updated to use the new Button component
5. **CategoryCard**: Redesigned with Card component and icon system
6. **RSVPButton**: Completely redesigned with Modal, Card, Button, and Toggle components

## Usage Guidelines

### Component Import

```javascript
// Import individual components
import { Button, Card, Input } from './components/ui';

// Use components
function MyComponent() {
  return (
    <div>
      <Card variant="elevated" padding="default">
        <h2>Card Title</h2>
        <Input label="Username" placeholder="Enter your username" />
        <Button variant="primary">Submit</Button>
      </Card>
    </div>
  );
}
```

### Form Layout Example

```javascript
import { Form, Input, Button } from './components/ui';

function SignupForm() {
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Section title="Account Information">
        <Form.Group cols={2}>
          <Input label="First Name" required />
          <Input label="Last Name" required />
        </Form.Group>
        <Input label="Email" type="email" required />
      </Form.Section>
      
      <Form.Section title="Password">
        <Input label="Password" type="password" required />
        <Input label="Confirm Password" type="password" required />
      </Form.Section>
      
      <Button type="submit" variant="primary">Create Account</Button>
    </Form>
  );
}
```

## Next Steps

1. **Accessibility Improvements**:
   - Add ARIA attributes to all components
   - Ensure keyboard navigation works properly
   - Test with screen readers

2. **Responsive Enhancements**:
   - Further optimize for mobile and tablet views
   - Add responsive utilities for different screen sizes

3. **Animation & Transitions**:
   - Add consistent transitions for hover/focus states
   - Implement loading animations and skeleton screens

4. **Documentation**:
   - Create a live component storybook
   - Add more examples and usage guidelines

5. **Testing**:
   - Add unit tests for all components
   - Add integration tests for complex interactions

6. **Themeing**:
   - Implement dark mode support
   - Allow customizing primary/secondary colors