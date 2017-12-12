import './header.scss';
import template from './header.html';

/* @ngInject */
function controller($scope) {
  this.$onInit = () => { $scope.user = this.user; };
}

export default ['saHeader', {
  template,
  controller,
  bindings: {
    user: '<',
  },
}];
