import './navbar.scss';
import template from './navbar.html';

/* @ngInject */
function controller($scope, $state, rest) {
  this.$onInit = () => {
    $scope.user = this.user;
    $scope.logo = require('../../assets/img/logo.svg'); // eslint-disable-line global-require
    $scope.searchResults = [];
  };

  $scope.search = () => {
    rest.searchUsers($scope.query)
      .then((results) => {
        $scope.searchResults = results;
      });
  };

  $scope.submit = () => {
    $state.go('search', { query: $scope.query });
  };
}

export default ['saNavbar', {
  template,
  controller,
  bindings: {
    user: '<',
  },
}];
