import './user.scss';
import template from './user.html';

/* @ngInject */
function controller($state, rest) {
  this.clickBtn = () => {
    if (this.isFriend) {
      $state.go('/profile');
    } else {
      rest.sendFriendRequest();
    }
  };
}

export default ['saUser', {
  template,
  bindings: {
    user: '<',
  },
  controller,
}];
