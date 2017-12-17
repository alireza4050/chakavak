import './user.scss';
import template from './user.html';

/* @ngInject */
function controller($scope, $state, rest) {
  this.$onInit = () => {
    $scope.user = this.user;
    $scope.status = this.status;
  };
  this.clickBtn = () => {
    if (this.isFriend) {
      $state.go('/profile');
    } else {
      rest.sendFriendRequest();
    }
  };
}

export default ['saUser', {
  template,
  bindings: {
    user: '<',
    status: '<',
  },
  controller,
}];
