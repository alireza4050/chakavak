import './profileSettings.scss';
import template from './profileSettings.html';

/* @ngInject */
function controller($scope, rest) {
  const tagsBox = $('#tags-edit');
  // this.$onInit = () => {
  //   const { name, intro } = this.user;
  //   Object.assign($scope, { name, intro });
  //   tagsBox.val(this.user.tags.join(','));
  // };
  $scope.submit = () => {
    const { name, intro } = $scope;
    rest.updateProfile({ name, intro, tags: tagsBox.tagsinput('items') })
      .then(({ data }) => {
        Object.assign(this.user, data);
      });
  };
}

export default ['saProfileSettings', {
  template,
  controller,
  bindings: {
    user: '=',
  },
}];
