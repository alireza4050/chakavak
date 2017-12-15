import './post.scss';
import template from './post.html';

export default ['saPost', {
  template,
  bindings: {
    post: '<',
  },
}];
