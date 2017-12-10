import loadGoogleMapsApi from 'load-google-maps-api-2';
import './newPost.scss';
import template from './newPost.html';

/* @ngInject */
function controller($scope, $timeout, Upload) {
  const newPost = document.getElementById('new-post');
  const textBox = document.getElementById('new-post-textarea');
  this.$onInit = () => {
    $scope.isExpanded = false;
    $scope.post = {};
    newPost.addEventListener('focusin', () => {
      $scope.isExpanded = true;
      textBox.style.height = '10em';
    });
    newPost.addEventListener('focusout', () => {
      if ($scope.post.content) return;
      $scope.isExpanded = false;
      textBox.style.height = '3.5em';
    });
  };

  $scope.resizeBox = ({ expanded }) => {
    if ($scope.content) expanded = true;
    $scope.isExpanded = expanded;
    textBox.style.height = $scope.isExpanded ? '10em' : '3.5em';
  };

  $timeout(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const location = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      loadGoogleMapsApi({
        key: 'AIzaSyDtoeFXpi4wnUXkKhJFoW2x0iYpI43NNBA',
        language: 'fa',
        region: 'IR',
      })
        .then((googleMaps) => {
          const geocoder = new googleMaps.Geocoder();
          geocoder.geocode({ location }, ([result]) => {
            $scope.location = result.address_components[1].short_name;
          });
        })
        .catch(console.error);
    });
  });
  $scope.publish = () => {
    // if ($scope.form.image.$valid && $scope.post.image) {
    $scope.upload($scope.post);
    // }
  };
  $scope.upload = (post) => {
    Upload.upload({
      url: '/api/post',
      data: {
        content: post.content,
        // location: post.location,
        file: post.image,
      },
    }).then((response) => {
      $scope.posts.push(response.data);
      $scope.post = {};
      newPost.blur();
      console.warn(response);
    }, (response) => {
      console.error(response);
      if (response.status > 0) {
        $scope.errorMsg = `${response.status}: ${response.data}`;
      }
    }, (evt) => {
      $scope.progress = Math.round(100.0 * (evt.loaded / evt.total));
    });
  };
}

export default ['saNewPost', { template, controller }];
