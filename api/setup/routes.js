const router = require('express').Router();
const passport = require('passport');
const { me, getUser, register, checkAuth } = require('../controllers/authCtrl');
const { getPost, getPosts, addPost, addComment } = require('../controllers/postCtrl');
const { getImage } = require('../controllers/imgCtrl');
const upload = require('../utils/imgUpload');

// Check logged in and return user info
router.get('/user/:username', getUser);
router.post('/auth/login', passport.authenticate('local'), me);
router.get('/auth/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});
router.post('/auth/register', register);
router.get('/ping', (req, res) => res.send('pong'));
router.get('/post/:postid', getPost);
router.get('/posts/:author', getPosts);
router.get('/image/:filename', getImage);

// Authenticated Routes
router.get('/me', checkAuth, me);
router.post('/post', checkAuth, upload, addPost);
router.post('/comment/:postid', checkAuth, addComment);

module.exports = router;
