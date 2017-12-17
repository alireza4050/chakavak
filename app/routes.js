// import demoRoutes from './demoRoutes';

const user = /* @ngInject */ rest => rest.getMe();

export default ['$stateProvider', '$urlRouterProvider', '$locationProvider',
  function routes($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');

    $stateProvider.state({
      name: 'feed',
      url: '/',
      resolve: {
        user,
        posts: /* @ngInject */ rest => rest.getFeed(),
      },
      component: 'pageFeed',
      authenticate: true,
    });
    $stateProvider.state({
      name: 'signin',
      url: '/signin',
      component: 'pageSignIn',
      authenticate: false,
    });
    $stateProvider.state({
      name: 'registerSuccess',
      url: '/mail_message',
      authenticate: false,
      template: `<div class="mx-auto text-center" style="margin-top: 50vh">
    <h2 class="text-success">با تشکر. ایمیل تایید ارسال شد</h2>
    <p><a class="btn btn-primary" href={{link}}>{{link}}</a></p>
    </div>`,
    });
    $stateProvider.state({
      name: 'logout',
      url: '/logout',
      authenticate: false,
      resolve: {
        logout: /* @ngInject */ rest => rest.logout(),
      },
    });
    $stateProvider.state({
      name: 'search',
      url: '/search/:query',
      resolve: {
        user,
        friends: /* @ngInject */ rest => rest.getFriends(),
        results: /* @ngInject */ (rest, $stateParams) => rest
          .searchUsers($stateParams.query, 0, 10),
      },
      component: 'pageSearch',
      authenticate: true,
    });
    $stateProvider.state({
      name: 'friends',
      url: '/friends',
      resolve: {
        user,
        friends: /* @ngInject */ rest => rest.getFriends(),
      },
      component: 'pageFriends',
      authenticate: true,
    });
    $stateProvider.state({
      name: 'profile',
      url: '/profile/:username',
      resolve: {
        user,
        // posts: /* @ngInject */ ($stateParams, rest) =>
        //   rest.getPosts($stateParams.username, 0, 10),
      },
      component: 'pageProfile',
      authenticate: true,
    });
    // demoRoutes($stateProvider);
  }];
