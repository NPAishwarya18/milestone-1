const express = require('express');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

const app = express();

app.use(session({ secret: 'your_secret_key', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

passport.use(new GoogleStrategy({
    clientID: 'your_google_client_id',
    clientSecret: 'your_google_client_secret',
    callbackURL: 'your_redirect_uri'
  },
  (accessToken, refreshToken, profile, done) => {
    // Here you can save the user data in your database
    return done(null, profile);
  }
));

passport.use(new FacebookStrategy({
    clientID: 'your_facebook_client_id',
    clientSecret: 'your_facebook_client_secret',
    callbackURL: 'your_redirect_uri',
    profileFields: ['id', 'displayName', 'email']
  },
  (accessToken, refreshToken, profile, done) => {
    // Here you can save the user data in your database
    return done(null, profile);
  }
));

app.get('/', (req, res) => {
  res.send('Welcome to the application!');
});

app.get('/login/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/login/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/');
  }
);

app.get('/login/facebook', passport.authenticate('facebook', { scope: ['email'] }));

app.get('/login/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/');
  }
);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});