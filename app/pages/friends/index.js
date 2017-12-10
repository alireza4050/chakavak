import template from './friends.html';
import './friends.scss';

export default ['pageFriends', {
  template,
  bindings: {
    friends: '<',
    user: '<',
  },
}];
