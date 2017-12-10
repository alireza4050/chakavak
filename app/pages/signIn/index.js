import template from './signIn.html';
import './signIn.scss';

/* @ngInject */
function controller($scope) {
  $scope.isLogin = true;
  $scope.authenticate = x => x; // name => $auth.authenticate(name);
}
export default ['pageSignIn', { template, controller }];
