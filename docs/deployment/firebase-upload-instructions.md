# Upload Phnom Penh Events to Firebase

This guide explains how to upload the 20 Phnom Penh-focused events to your Firebase Firestore database.

## Prerequisites

1. **Firebase Project**: Ensure your Firebase project is set up and active
2. **Firebase Config**: Your Firebase configuration is already in the project
3. **Node.js**: Make sure Node.js is installed

## Steps to Upload Events

### 1. Navigate to the CampusNex Directory
```bash
cd campusnex
```

### 2. Install Dependencies (if not already installed)
```bash
npm install
```

### 3. Run the Firebase Seeder
```bash
node scripts/seed-firebase.js
```

This command will:
- Connect to your Firebase Firestore database
- Upload all 20 Phnom Penh-focused events
- Add sample users and other data for testing

## Events Included (20 Cambodian Events)

### Cultural & Historical 🏛️
- Angkor Wat Sunrise Photography Workshop
- Royal Palace Evening Concert  
- Banteay Srei Temple Architecture Tour
- Bayon Temple Sunrise Meditation
- Ta Prohm Temple Photography Expedition
- Tuol Sleng & S21 Historical Learning Tour

### Food & Lifestyle 🍜
- Traditional Khmer Cooking Masterclass
- Phnom Penh Street Food Festival
- Cambodian Coffee Culture Experience
- Phnom Penh Night Market & Food Tour

### Arts & Entertainment 🎨
- Cambodian Traditional Dance Workshop
- Cambodian Art & Craft Workshop
- Cambodian Film Festival Screening

### Business & Technology 💼
- Cambodia Tech Startup Pitch Night
- Cambodia Digital Innovation Summit

### Outdoor Adventures 🚣
- Mekong River Sunset Cruise
- Tonle Sap Floating Village Experience
- Silk Island Bicycle Adventure

### Festivals & Celebrations 🎉
- Cambodian Independence Day Celebration
- Cambodian New Year Water Festival

## Featured Events

The following events are marked as "featured" and will appear prominently:
- Angkor Wat Sunrise Photography Workshop
- Cambodia Tech Startup Pitch Night
- Royal Palace Evening Concert
- Phnom Penh Street Food Festival
- Cambodian Independence Day Celebration
- Cambodia Digital Innovation Summit
- Cambodian New Year Water Festival

## Firebase Configuration

Your project is already configured with:
- **Project ID**: campusnex-37b2b
- **Auth Domain**: campusnex-37b2b.firebaseapp.com
- **Database**: Firestore

## Verification

After running the seeder:

1. **Check Firebase Console**: 
   - Go to https://console.firebase.google.com
   - Open your "campusnex-37b2b" project
   - Navigate to Firestore Database
   - You should see 20 events in the "events" collection

2. **Test Frontend**: 
   - Start your React app: `npm start`
   - Check that events load from Firebase
   - Events should show Cambodian locations and content

3. **API Integration**: 
   - The frontend will automatically fetch from Firebase
   - No additional API setup needed

## Locations Featured

All events showcase authentic Cambodian venues:
- **Angkor Archaeological Park** (Siem Reap)
- **Royal Palace Gardens** (Phnom Penh)
- **Sisowath Quay** (Phnom Penh riverfront)
- **Smart Axiata Digital Innovation Hub**
- **Wat Phnom Park**
- **Artisans Angkor** (Siem Reap)
- **Institut français du Cambodge**
- **Royal University of Fine Arts**
- **And many more authentic locations**

## Troubleshooting

- **Firebase Connection Error**: Check your internet connection and Firebase project status
- **Permission Denied**: Ensure Firebase rules allow writes (check Firestore rules)
- **Node.js Issues**: Make sure you're in the `/campusnex` directory

Your CampusNex application will now showcase authentic Cambodian cultural events from your Firebase database! 🇰🇭✨