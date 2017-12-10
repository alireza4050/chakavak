import template from './pwdReset.html';

/* @ngInject */
function controller($scope, rest) {
  $scope.submit = () => {
    if ($scope.form.$valid) {
      rest.pwdReset($scope.pwdForm.password, $scope.verificationToken);
    }
  };
}

export default ['saPwdReset', { template, controller }];
