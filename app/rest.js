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
    .then(() => {
      // TODO: currently logins after register. should not do this after email verification is added
      return this.login({ username: form.username, password: form.password });
    })
    .catch(console.err);

  login = form => this.$http.post('/api/auth/login', form)
    .then(({ data: user }) => {
      const { username } = user;
      sessionStorage.setItem('username', username);
      this.$state.go('profile', { username });
    })
    .catch(console.err);

  logout = () => this.$http.get('/api/auth/logout').then(() => {
    sessionStorage.removeItem('username');
    this.$state.go('signin');
  });

  searchUsers = (query, start = 0, num = 3) => this.$http
    .get(`/api/search?q=${query}&start=${start}&num=${num}`)
    .then(({ data }) => data)
    .catch(console.err);

  getPosts = (author, start = 0, num = 5) => this
    .$http.get(`/api/posts/${author}?start=${start}&num=${num}`)
    .then(({ data }) => data).catch(console.err);

  getPost = postid => this.$http.get(`/api/post/${postid}`)
    .then(res => res.data).catch(console.err);

  getFeed = () => this.$http.get(`/api/posts/feed/${sessionStorage.getItem('username')}`)
    .then(({ data }) => data).catch(console.err);

  newPost = post => this.$http.post('/api/post', { post }).catch(console.err);

  getFriends = () => this.$http
    .get('/api/friends')
    .then(({ data }) => data)
    .catch(console.err);

  isFriend = otherId => this.$http.get(`/api/userFriend/friendshipCheck/${sessionStorage.getItem('username')}/${otherId}`).catch(console.err);
}
