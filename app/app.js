import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import ngFileUpload from 'ng-file-upload';
import ngInfiniteScroll from 'ng-infinite-scroll';
import Rest from './rest';
import checkTransitions from './auth';
import components from './components';
import pages from './pages';
import filters from './utils/filters';
import routes from './routes';
import './stylesheets/custom.scss';


const app = angular.module('app', [
  uiRouter,
  ngFileUpload,
  ngInfiniteScroll,
]);

components.forEach(component => app.component(...component));
pages.forEach(pageComponent => app.component(...pageComponent));
app.config(routes);
// app.config(authProviders);
app.service('rest', Rest);
filters.forEach(filter => app.filter(...filter));
// sessionStorage.clear();
app.run(checkTransitions);
angular.module('infinite-scroll').value('THROTTLE_MILLISECONDS', 1000);

// app.run(() => {
//   $(() => {
//     $('[data-toggle="popover"]').popover();
//   });
// });
