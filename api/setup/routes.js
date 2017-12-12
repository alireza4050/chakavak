const express = require('express');

const router = express.Router();
const passport = require('passport');
const { register, checkAuth } = require('../controllers/authCtrl');
const { me, getUser, updateProfile } = require('../controllers/userCtrl');
const { getPost, getPosts, addPost, likePost, dislikePost } = require('../controllers/postCtrl');
const { addComment, likeComment, dislikeComment } = require('../controllers/postCtrl');
const { getFriends, requestFriendship, acceptFriendship, removeFriend } = require('../controllers/friendCtrl');
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
const authenticatedRoutes = ((r) => {
  r.get('/me', me);
  r.get('/friends', getFriends);
  r.post('/update-profile', updateProfile);
  r.post('/add-friend', requestFriendship);
  r.post('/confirm-friend', acceptFriendship);
  r.post('/remove-friend', removeFriend);
  r.post('/post', upload, addPost);
  r.post('/comment/:postid', addComment);
  r.post('/like-post', likePost);
  r.post('/dislike-post', dislikePost);
  r.post('/like-comment', likeComment);
  r.post('/dislike-comment', dislikeComment);
})(express.Router());

router.use(checkAuth, authenticatedRoutes);

module.exports = router;
