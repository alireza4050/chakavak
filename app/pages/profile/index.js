import './profile.scss';
import template from './profile.html';

/* @ngInject */
function controller($scope, rest) {
  this.$onInit = () => {
    $scope.posts = [];
    const { username } = this.user;
    $scope.isMyProfile = username === sessionStorage.getItem('username');
    $scope.getPosts = () => {
      rest.getPosts(username, $scope.posts.length, 5)
        .then((posts) => { $scope.posts = $scope.posts.concat(posts); });
    };
    $scope.getPosts();
  };
}

export default ['pageProfile', {
  template,
  controller,
  bindings: {
    user: '<',
  },
}];
