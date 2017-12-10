import './profile.scss';
import template from './profile.html';

/* @ngInject */
function controller($scope, rest) {
  this.$onInit = () => {
    $scope.posts = [];
    $scope.isMyProfile = this.user.username === sessionStorage.getItem('username');
  };
  $scope.getPosts = () => {
    rest.getPosts(this.user.username, $scope.posts.length, 5);
  };
}

export default ['pageProfile', {
  template,
  controller,
  bindings: {
    user: '<',
  },
}];
