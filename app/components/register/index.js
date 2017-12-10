import template from './register.html';

/* @ngInject */
function controller($scope, $state, rest) {
  $scope.submit = () => {
    if ($scope.form.$valid &&
      $scope.registerForm.password === $scope.passwdConfirm) {
      rest.register($scope.registerForm);
    }
  };
}

export default ['saRegister', { template, controller }];
