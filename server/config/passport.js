const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { User } = require('../models');

// Check if Google OAuth credentials are configured
if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    // Google OAuth is disabled - this is normal for basic authentication
    // console.warn('⚠️  Google OAuth credentials not configured. Google authentication will be disabled.');
    // console.warn('   To enable Google OAuth, set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in your .env file.');
    // console.warn('   See docs/setup/google-oauth-setup.md for setup instructions.');
} else {
    // Configure Google OAuth Strategy
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL ||
            (process.env.NODE_ENV === 'production'
                ? "https://campusnex-backend-production.up.railway.app/api/auth/google/callback"
                : "/api/auth/google/callback")
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            // Check if user already exists with this Google ID
            let user = await User.findOne({ where: { googleId: profile.id } });

            if (user) {
                // User exists, return the user
                return done(null, user);
            }

            // Check if user exists with the same email (merge accounts)
            user = await User.findOne({ where: { email: profile.emails[0].value } });

            if (user) {
                // Update existing user with Google ID
                user.googleId = profile.id;
                user.provider = 'google';
                user.profilePicture = user.profilePicture || profile.photos[0]?.value;
                await user.save();
                return done(null, user);
            }

            // Create new user
            const newUser = await User.create({
                googleId: profile.id,
                email: profile.emails[0].value,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                provider: 'google',
                profilePicture: profile.photos[0]?.value,
                // role will be set from session in the route handler
                role: 'student' // Default role for Google OAuth users
            });

            return done(null, newUser);
        } catch (error) {
            console.error('Google OAuth error:', error);
            return done(error, null);
        }
    }));
}

// Serialize user for session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findByPk(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

module.exports = passport;