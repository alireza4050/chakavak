import './comment.scss';
import template from './comment.html';

/* @ngInject */
function controller(rest) {
  this.like = function like() {
    rest.like(this.comment.id);
  };
}

export default ['saComment', {
  template,
  bindings: {
    comment: '<',
  },
  controller,
}];
