import template from './search.html';
import './search.scss';

/* @ngInject */
function controller($scope) {
  // this.$onInit = () => console.log(this.friends);
  $scope.status = (user) => {
    const friend = this.friends
      .find(f => f.friendname === user.username) || {};
    return friend.status;
  };
}
export default ['pageSearch', {
  template,
  controller,
  bindings: {
    user: '<',
    results: '<',
    friends: '<',
  },
}];
