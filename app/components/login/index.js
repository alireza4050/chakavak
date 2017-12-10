import template from './login.html';

/* @ngInject */
function controller($scope, $state, rest) {
  $scope.submit = () => {
    if ($scope.form.$valid) {
      rest.login($scope.loginForm);
    }
  };
}

export default ['saLogin', { template, controller }];
