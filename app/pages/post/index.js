import template from './post.html';

export default ['saPostPage', {
  template,
  bindings: {
    post: '<',
    comments: '<',
  },

}];
