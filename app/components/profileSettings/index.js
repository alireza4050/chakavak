import './profileSettings.scss';
import template from './profileSettings.html';

/* @ngInject */
function controller($scope, rest) {
  $scope.submit = () => {
    rest.getUser()
      .then((user) => {
        const newUser = Object.merge({}, user, $scope.user);
        rest.register(newUser);
      });
  };
}

export default ['saProfileSettings', { template, controller }];
