/* EXPRESS */

const express = require('express');
const app = express();
const session = require('express-session');

app.set('view engine', 'ejs');

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: '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'
}));

const passport = require('passport');
var userProfile;

app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');

// Google AUTH
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GOOGLE_CLIENT_ID = '592412118796-14mlks04oiojh334m1ckpdcdgd6ro5sn.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    userProfile = profile;
    return done(null, userProfile);
  }
));

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/error' }),
  function(req, res) {
    // Successful authentication, redirect to success page or send response
    res.redirect('/success');
  });

app.get('/', function(req, res) {
  res.render('pages/auth');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('App listening on port ' + port));
