import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import ngFileUpload from 'ng-file-upload';
import ngInfiniteScroll from 'ng-infinite-scroll';
import Rest from './rest';
import checkTransitions from './auth';
import components from './components';
import pages from './pages';
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
app.filter('farsiNum', () => num => num.toLocaleString('fa-IR'));
// sessionStorage.clear();
app.run(checkTransitions);
app.run(() => {
  $(() => {
    $('[data-toggle="popover"]').popover();
  });
});
