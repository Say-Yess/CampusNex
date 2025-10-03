# Firebase Firestore Setup Guide

## 🔥 The "NOT_FOUND" error means Firestore database hasn't been created yet!

### Step 1: Enable Firestore Database
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project: **campusnex-37b2b**
3. In the left sidebar, click **"Firestore Database"**
4. Click **"Create database"**
5. Choose **"Start in test mode"** (for now)
6. Select a location (choose closest to your users)
7. Click **"Done"**

### Step 2: Set up Authentication (Optional but recommended)
1. In Firebase Console, click **"Authentication"**
2. Go to **"Sign-in method"** tab
3. Enable **"Email/Password"**
4. Click **"Save"**

### Step 3: Update Firestore Security Rules
Go to **Firestore Database > Rules** tab and paste:

**For Development (Allows seeding):**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Temporary: Allow all access for development
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

**For Production (More secure):**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow anyone to read events (public browsing)
    match /events/{eventId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Allow users to manage their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Allow authenticated users to manage RSVPs
    match /rsvps/{rsvpId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

⚠️ **Use Development rules first to seed data, then switch to Production rules later.**

### Step 4: Run the seeder again
After updating the security rules, run:
```bash
node scripts/seed-firebase.js
```

### Step 5: Verify the Data
1. Go to **Firebase Console > Firestore Database > Data** tab
2. You should see an **"events"** collection with 5 documents
3. Each document should contain event data (title, description, etc.)

### Step 6: Switch Your App to Real Data
Once seeding is successful, your React app will automatically use the real Firebase data instead of mock data!

### 🎯 Expected Success Output:
```
🚀 CampusNex Database Seeder
========================================
🌱 Starting database seeding...
🔍 Testing Firestore connection...
📝 Adding event 1/5: "Tech Conference 2025"
✅ Event "Tech Conference 2025" added with ID: abc123
📝 Adding event 2/5: "Startup Weekend"
✅ Event "Startup Weekend" added with ID: def456
📝 Adding event 3/5: "AI Workshop: Building Chatbots"
✅ Event "AI Workshop: Building Chatbots" added with ID: ghi789
📝 Adding event 4/5: "Digital Marketing Masterclass"
✅ Event "Digital Marketing Masterclass" added with ID: jkl012
📝 Adding event 5/5: "Career Fair 2025"
✅ Event "Career Fair 2025" added with ID: mno345
🎉 Database seeding completed successfully!
📊 Added 5 events to the database.
```