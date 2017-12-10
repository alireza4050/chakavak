import './navbar.scss';
import template from './navbar.html';

/* @ngInject */
function controller($scope, rest) {
  $scope.search = () => {
    rest.searchUsers($scope.query)
      .then(({ data }) => {
        $scope.searchResults = data;
      });
  };
  $scope.searchResults = [
    { name: 'امیر شهلا', thumbnail: 'https://avatars2.githubusercontent.com/u/1410106?v=4' },
    { name: 'شهناز رمارم', thumbnail: 'https://avatars1.githubusercontent.com/u/45491?v=4' },
    { name: 'بتول گندمی', thumbnail: 'https://avatars3.githubusercontent.com/u/313874?v=4' },
    { name: ' احمد نوروزی', thumbnail: 'https://avatars3.githubusercontent.com/u/1476070?v=4' },
    { name: 'محمدرضا حیدری', thumbnail: 'https://avatars1.githubusercontent.com/u/62071?v=4' },
    { name: 'علیرضا شهریاری', thumbnail: 'https://avatars3.githubusercontent.com/u/6573268?v=4' },
    { name: 'احسان اصولی', thumbnail: 'https://avatars2.githubusercontent.com/u/1570088?v=4' },
    { name: 'حمیدرضا موحدی‌زاده', thumbnail: 'https://avatars2.githubusercontent.com/u/1570088?v=4' },
    { name: 'سید مسعود ریاضی', thumbnail: 'https://avatars0.githubusercontent.com/u/177?v=4' },
  ];
}

export default ['saNavbar', { template, controller }];
