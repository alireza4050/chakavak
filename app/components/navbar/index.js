import './navbar.scss';
import template from './navbar.html';

/* @ngInject */
function controller($scope, rest) {
  this.$onInit = () => {
    $scope.user = this.user;
  };

  $scope.search = () => {
    rest.searchUsers($scope.query)
      .then(({ data }) => {
        $scope.searchResults = data;
      });
  };
}

export default ['saNavbar', {
  template,
  controller,
  bindings: {
    user: '<',
  },
}];
