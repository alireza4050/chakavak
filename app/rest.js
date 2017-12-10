/* @ngInject */
export default class Rest {
  constructor($http, $state) { // $auth) {
    this.$http = $http;
    this.$state = $state;
    // this.$auth = $auth;
  }

  getMe = () => this.$http.get('/api/me')
    .then(({ data }) => data)
    .catch(console.err);

  getUser = username => this.$http.get(`/api/user/${username}`)
    .then(({ data }) => data)
    .catch(console.err);

  register = form => this.$http.post('/api/auth/register', form)
    .then(({ data: user }) => {
      const { username } = user;
      sessionStorage.setItem('username', username);
      this.$state.go('profile', { username, user });
    })
    .catch(console.err);

  login = form => this.$http.post('/api/auth/login', form)
    .then(({ data: user }) => {
      const { username } = user;
      sessionStorage.setItem('username', username);
      this.$state.go('profile', { username, user });
    })
    .catch(console.err);

  logout = () => this.$http.get('/api/auth/logout').then(() => {
    sessionStorage.removeItem('username');
    this.$state.go('signin');
  });

  // getAvatar = (fileName) => {
  //   if (!fileName) return Promise.resolve(default_avatar);
  //   return this.$http.get(`/api/image/${fileName}`)
  //     .then(({ data }) => data);
  // }

  searchUsers = query => this.$http.get(`/api/users/searchUsername/${query}`).catch(console.err);

  getPosts = (author, start = 0, num = 5) => this
    .$http.get(`/api/posts/${author}?start=${start}&num=${num}`)
    .then(({ data }) => data).catch(console.err);

  getPost = postid => this.$http.get(`/api/post/${postid}`)
    .then(res => res.data).catch(console.err);

  getFeed = () => this.$http.get(`/api/posts/feed/${sessionStorage.getItem('username')}`)
    .then(({ data }) => data).catch(console.err);

  newPost = post => this.$http.post('/api/post', { post }).catch(console.err);

  getFriends = () => this.$http.get(`/api/userFriend/friendList/${sessionStorage.getItem('username')}`).catch(console.err);

  isFriend = otherId => this.$http.get(`/api/userFriend/friendshipCheck/${sessionStorage.getItem('username')}/${otherId}`).catch(console.err);
}
