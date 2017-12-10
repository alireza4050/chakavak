import './feed.scss';
import template from './feed.html';

export default ['pageFeed', {
  template,
  bindings: {
    user: '<',
    posts: '<',
  },
}];
