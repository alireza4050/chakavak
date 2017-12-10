import './header.scss';
import template from './header.html';

/* @ngInject */
function controller($scope) {
  $scope.user = {
    displayName: 'Alireza A',
    thumbnail: '',
    intro: 'Example user status',
    userProfilePicture: '/assets/img/guy.jpeg',
    tags: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5', 'tag6'],
  };
}

export default ['saHeader', { template, controller }];
