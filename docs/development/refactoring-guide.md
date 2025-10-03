# 🔄 Component Refactoring Guide - CampusNex

This guide provides detailed instructions for refactoring large components into smaller, maintainable pieces.

---

## 🎯 **Refactoring Strategy**

### **Goals:**
- Break down files > 400 lines into < 300 lines each
- Improve maintainability and readability
- Enable better testing and reusability
- Follow React best practices

### **Principles:**
- Single Responsibility Principle
- Extract reusable logic into custom hooks
- Separate concerns (UI, data, business logic)
- Maintain existing functionality

---

## 📁 **File 1: Home.js (754 lines → 6 components)**

### Current Structure Analysis:
```
Home.js (754 lines)
├── Mock data creation (60 lines)
├── Data fetching logic (80 lines)  
├── Hero section (120 lines)
├── Features section (100 lines)
├── Statistics section (80 lines)
├── Event sections (150 lines)
├── Testimonials (80 lines)
└── Call-to-action (40 lines)
```

### Target Structure:
```
src/pages/Home/
├── index.js (150 lines)              # Main component
├── components/
│   ├── HeroSection.js (120 lines)    # Hero with carousel
│   ├── FeaturesSection.js (100 lines) # 6 feature cards
│   ├── EventCarousel.js (80 lines)   # Event display logic
│   ├── StatisticsSection.js (60 lines) # Stats display
│   └── TestimonialsSection.js (80 lines) # Reviews section
├── hooks/
│   └── useHomeData.js (60 lines)     # Data fetching logic
└── utils/
    └── homeHelpers.js (40 lines)     # Helper functions
```

### Step-by-Step Refactoring:

#### Step 1: Create Directory Structure
```bash
cd src/pages
mkdir Home
cd Home
mkdir components hooks utils
```

#### Step 2: Extract Data Hook
**Create `hooks/useHomeData.js`:**
```javascript
import { useState, useEffect } from 'react';
import { eventsAPI } from '../../../services/api';
import { mockEvents, defaultEventImages } from '../../../data/mockEvents';

export const useHomeData = () => {
    const [highlightedEvents, setHighlightedEvents] = useState([]);
    const [currentEvents, setCurrentEvents] = useState([]);
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const addDefaultImages = (events) => {
        return events.map((event, index) => ({
            ...event,
            imageUrl: event.imageUrl || defaultEventImages[index % defaultEventImages.length]
        }));
    };

    const categorizeEvents = (events) => {
        const now = new Date();
        const current = [];
        const upcoming = [];

        events.forEach(event => {
            const eventDate = new Date(event.startDate || event.date);
            if (eventDate <= now) {
                current.push(event);
            } else {
                upcoming.push(event);
            }
        });

        return { current: current.slice(0, 4), upcoming: upcoming.slice(0, 4) };
    };

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true);
                const response = await eventsAPI.getAllEvents();

                if (response?.events?.length > 0) {
                    const eventsWithImages = addDefaultImages(response.events);
                    const { current, upcoming } = categorizeEvents(eventsWithImages);

                    setHighlightedEvents(eventsWithImages.slice(0, 3));
                    setCurrentEvents(current);
                    setUpcomingEvents(upcoming);
                } else {
                    throw new Error('No events found');
                }
            } catch (err) {
                console.error('Failed to fetch events:', err);
                const { current, upcoming } = categorizeEvents(mockEvents);
                setHighlightedEvents(mockEvents.slice(0, 3));
                setCurrentEvents(current);
                setUpcomingEvents(upcoming);
                setError(null);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    return {
        highlightedEvents,
        currentEvents,
        upcomingEvents,
        loading,
        error
    };
};
```

#### Step 3: Extract Hero Section
**Create `components/HeroSection.js`:**
```javascript
import React, { useState, useEffect } from 'react';
import PrimaryButton from '../../../components/PrimaryButton';

const HeroSection = ({ highlightedEvents, navigate }) => {
    const [activeSlide, setActiveSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            if (highlightedEvents.length > 0) {
                setActiveSlide((prevSlide) =>
                    prevSlide === highlightedEvents.length - 1 ? 0 : prevSlide + 1
                );
            }
        }, 5000);

        return () => clearInterval(timer);
    }, [highlightedEvents]);

    if (!highlightedEvents.length) return null;

    return (
        <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
            {/* Move hero JSX content here from original Home.js */}
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left: Text Content */}
                    <div className="space-y-6">
                        <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                            Discover Amazing
                            <span className="text-blue-600 block">Campus Events</span>
                        </h1>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Connect with your community through exciting events, workshops, and activities. 
                            From academic conferences to social gatherings, find your next adventure.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <PrimaryButton 
                                onClick={() => navigate('/discovery')}
                                className="text-lg px-8 py-3"
                            >
                                Explore Events
                            </PrimaryButton>
                            <button 
                                onClick={() => navigate('/signup')}
                                className="text-lg px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                            >
                                Join Community
                            </button>
                        </div>
                    </div>

                    {/* Right: Event Carousel */}
                    <div className="relative">
                        {/* Carousel implementation */}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
```

#### Step 4: Extract Features Section
**Create `components/FeaturesSection.js`:**
```javascript
import React from 'react';

const features = [
    {
        icon: '🎯',
        title: 'Discover Events',
        description: 'Find events that match your interests and schedule with smart filtering.'
    },
    {
        icon: '👥',
        title: 'Connect & Network',
        description: 'Meet like-minded people and build meaningful connections.'
    },
    // ... other features
];

const FeaturesSection = () => {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                        Why Choose CampusNex?
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Your gateway to an vibrant campus life filled with opportunities and connections.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow">
                            <div className="text-4xl mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
```

#### Step 5: Create Main Index File
**Create `index.js`:**
```javascript
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import StatisticsSection from './components/StatisticsSection';
import TestimonialsSection from './components/TestimonialsSection';
import { useHomeData } from './hooks/useHomeData';

const Home = () => {
    const navigate = useNavigate();
    const { highlightedEvents, currentEvents, upcomingEvents, loading, error } = useHomeData();

    if (loading) {
        return (
            <div className="min-h-screen bg-white">
                <Navbar />
                <div className="flex items-center justify-center h-96">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="text-gray-600 mt-4">Loading amazing events...</p>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <HeroSection highlightedEvents={highlightedEvents} navigate={navigate} />
            <FeaturesSection />
            <StatisticsSection />
            <TestimonialsSection />
            <Footer />
        </div>
    );
};

export default Home;
```

#### Step 6: Update Import in App.js
```javascript
// Change from:
import Home from './pages/Home';

// To:
import Home from './pages/Home';  // This now imports index.js automatically
```

---

## 📁 **File 2: DiscoveryFeed.js (610 lines → 4 components)**

### Target Structure:
```
src/pages/DiscoveryFeed/
├── index.js (150 lines)
├── components/
│   ├── EventSwipeCard.js (120 lines)
│   ├── SwipeInterface.js (100 lines)
│   └── FilterControls.js (80 lines)
├── hooks/
│   └── useSwipeEvents.js (80 lines)
└── utils/
    └── swipeHelpers.js (40 lines)
```

### Key Extraction Points:
1. **EventSwipeCard**: Individual event card with swipe actions
2. **SwipeInterface**: Container managing swipe gestures
3. **FilterControls**: Category and filter UI
4. **useSwipeEvents**: Event data and swipe state management

---

## 📁 **File 3: Settings.js (521 lines → 5 components)**

### Target Structure:
```
src/pages/Settings/
├── index.js (100 lines)
├── components/
│   ├── SettingsLayout.js (60 lines)
│   ├── AccountSettings.js (100 lines)
│   ├── NotificationSettings.js (80 lines)
│   ├── PrivacySettings.js (80 lines)
│   └── PasswordSettings.js (80 lines)
└── hooks/
    └── useSettingsData.js (60 lines)
```

---

## 📁 **File 4: Profile.js (437 lines → 3 components)**

### Target Structure:
```
src/pages/Profile/
├── index.js (150 lines)
├── components/
│   ├── ProfileForm.js (120 lines)
│   └── ProfileStats.js (100 lines)
└── hooks/
    └── useProfileData.js (60 lines)
```

---

## 📁 **File 5: EventDetail.js (409 lines → 4 components)**

### Target Structure:
```
src/pages/EventDetail/
├── index.js (120 lines)
├── components/
│   ├── EventInfo.js (100 lines)
│   ├── EventActions.js (80 lines)
│   └── EventImage.js (60 lines)
└── hooks/
    └── useEventDetail.js (60 lines)
```

---

## ✅ **Refactoring Checklist**

### For Each Component:
- [ ] Create directory structure
- [ ] Extract data logic into custom hooks
- [ ] Split UI into logical sub-components
- [ ] Move helper functions to utils
- [ ] Update imports in parent files
- [ ] Test functionality works identically
- [ ] Ensure responsive design maintained
- [ ] Check accessibility features preserved

### Code Quality Checks:
- [ ] No component > 300 lines
- [ ] Clear separation of concerns
- [ ] Reusable hooks extracted
- [ ] Consistent naming conventions
- [ ] Proper prop types (if using)
- [ ] Error handling maintained

### Testing Strategy:
1. **Unit Tests**: Test individual components
2. **Integration Tests**: Test hook interactions
3. **Visual Tests**: Ensure UI looks identical
4. **User Flow Tests**: Test complete workflows

---

## 🚨 **Common Pitfalls to Avoid**

1. **Over-refactoring**: Don't split components that are naturally cohesive
2. **State Management**: Ensure state is lifted to appropriate levels
3. **Performance**: Avoid unnecessary re-renders with proper memoization
4. **Imports**: Update all import paths correctly
5. **CSS Classes**: Ensure Tailwind classes are preserved
6. **Event Handlers**: Maintain proper event handling

---

## 📊 **Success Metrics**

### Before Refactoring:
- Home.js: 754 lines
- DiscoveryFeed.js: 610 lines
- Settings.js: 521 lines
- Profile.js: 437 lines
- EventDetail.js: 409 lines
- **Total**: 2,731 lines in 5 files

### After Refactoring:
- 25+ components, each < 300 lines
- 10+ custom hooks
- 5+ utility modules
- **Improved**: Maintainability, testability, reusability

## ⚡ **Quick Start Command**
```bash
# Create all directories at once
cd src/pages
mkdir Home Home/components Home/hooks Home/utils
mkdir DiscoveryFeed DiscoveryFeed/components DiscoveryFeed/hooks
mkdir Settings Settings/components Settings/hooks
mkdir Profile Profile/components Profile/hooks
mkdir EventDetail EventDetail/components EventDetail/hooks
```