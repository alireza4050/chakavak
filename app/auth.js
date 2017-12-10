// export const authProviders = ['$authProvider', function authProviders($authProvider) {
//   $authProvider.google({
//     clientId: 'Google Client ID',
//   });

//   $authProvider.instagram({
//     clientId: 'Instagram Client ID',
//   });

//   $authProvider.yahoo({
//     clientId: 'Yahoo Client ID / Consumer Key',
//   });
// }];

export default ['$transitions',
  function checkTransitions($transitions) {
    $transitions.onBefore({}, (transition) => {
      if (transition.to().authenticate && !sessionStorage.getItem('username')) { // $auth.isAuthenticated()) {
        return transition.router.stateService.target('signin');
      }
      return true;
    });
  }];
