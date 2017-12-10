const fakePeople = [
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

export default function demoRoutes($stateProvider) {
  $stateProvider.state({
    name: 'demo',
    abtract: true,
    template: '<div class="container pt-5"></div><div class="row"><div class=col-md-3></div><div class=col-md-6><ui-view></ui-view></div></div></div>',
  });
  $stateProvider.state({
    name: 'demo signin',
    url: '/demo/signin',
    component: 'pageSignIn',
  });
  $stateProvider.state({
    name: 'demo header',
    url: '/demo/header',
    component: 'saHeader',
  });
  $stateProvider.state({
    name: 'demo.passwordreset',
    url: '/demo/pwdreset',
    component: 'saPwdReset',
  });
  $stateProvider.state({
    name: 'demo.post',
    url: '/demo/post',
    component: 'saPost',
  });
  $stateProvider.state({
    name: 'demo.newpost',
    url: '/demo/new-post',
    component: 'saNewPost',
  });
  $stateProvider.state({
    name: 'demo.comment',
    url: '/demo/comment',
    template: `<sa-comment comment="{id: 6534, likes: 34, name: 'ممد ممدی',
    thumbnail: 'src/assets/img/guy.jpeg',
    content: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و
     مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد',}"></sa-comment>`,
  });
  $stateProvider.state({
    name: 'demo.userelement',
    url: '/demo/user-el',
    component: 'saUser',
  });
  $stateProvider.state({
    name: 'demo.imageUpload',
    url: '/demo/img-up',
    component: 'saImageUpload',
  });
  $stateProvider.state({
    name: 'demo friends',
    url: '/demo/friends',
    component: 'pageFriends',
    resolve: {
      friends: () => Promise.resolve(fakePeople),
    },
  });
  $stateProvider.state({
    name: 'demo feed',
    url: '/demo/feed',
    component: 'pageFeed',
    resolve: {
      user: () => Promise.resolve({
        displayName: 'ادوارد براون',
        intro: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون&rlm;...',
      }),
      posts: () => Promise.resolve({

      }),
    },
  });
  $stateProvider.state({
    name: 'demo search results',
    url: '/demo/search/:query',
    component: 'pageSearch',
    resolve: {
      results: /* @ngInject */ $stateParams => Promise.resolve(fakePeople
        .filter(p => p.name.contains($stateParams.query))),
    },
  });
  $stateProvider.state({
    name: 'demo profile',
    url: '/demo/home',
    component: 'pageProfile',
    resolve: {
      user: () => Promise.resolve({
        displayName: 'ادوارد براون',
        intro: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون&rlm;...',
      }),
      posts: () => Promise.resolve({

      }),
    },
  });
}
