const express = require('express');

const router = express.Router();
const passport = require('passport');
const { register, changePassword, checkAuth } = require('../controllers/authCtrl');
const { me, getUser, searchUsers, updateProfile, changeAvatar, changeCover } = require('../controllers/userCtrl');
const { getPost, getPosts, getFeed, addPost, likePost, dislikePost } = require('../controllers/postCtrl');
const { addComment, likeComment, dislikeComment } = require('../controllers/commentCtrl');
const { getFriends, requestFriendship, acceptFriendship, removeFriend } = require('../controllers/friendCtrl');
const { getImage } = require('../controllers/imgCtrl');
const upload = require('../utils/imgUpload');

router.get('/user/:username', getUser);
router.post('/auth/login', passport.authenticate('local'), me);
router.get('/auth/logout', (req, res) => {
  req.logout();
  res.end();
});
router.post('/auth/register', register);
router.get('/ping', (req, res) => res.send('pong'));
router.get('/post/:postid', getPost);
router.get('/posts/:author', getPosts);
router.get('/image/:id/:filename', getImage);

// Authenticated Routes
const authenticatedRoutes = ((r) => {
  r.get('/me', me);
  r.get('/friends', getFriends);
  r.get('/feed', getFeed);
  r.get('/search', searchUsers);
  // TODO: allow password reset using emailed token
  r.post('/change-password', changePassword);
  r.post('/profile', updateProfile);
  r.post('/avatar', upload, changeAvatar);
  r.post('/cover', upload, changeCover);
  r.post('/add-friend', requestFriendship);
  r.post('/confirm-friend', acceptFriendship);
  r.post('/remove-friend', removeFriend);
  r.post('/post', upload, addPost);
  r.post('/comment/:postid', addComment);
  r.post('/like-post', likePost);
  r.post('/dislike-post', dislikePost);
  r.post('/like-comment', likeComment);
  r.post('/dislike-comment', dislikeComment);
  return r;
})(express.Router());

router.use(checkAuth, authenticatedRoutes);

module.exports = router;
