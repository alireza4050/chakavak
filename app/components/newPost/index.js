import loadGoogleMapsApi from 'load-google-maps-api-2';
import './newPost.scss';
import template from './newPost.html';

/* @ngInject */
function controller($scope, $timeout, Upload) {
  const newPost = document.getElementById('new-post');
  const textBox = document.getElementById('new-post-textarea');
  $scope.fileInput = document.getElementById('imageInput');
  this.$onInit = () => {
    // $scope.isExpanded = false;
    $scope.post = {};
    newPost.addEventListener('focusin', () => {
      // $scope.isExpanded = true;
      textBox.style.height = '10em';
    });
    newPost.addEventListener('focusout', () => {
      if ($scope.post.content) return;
      // $scope.isExpanded = false;
      textBox.style.height = '3.5em';
    });
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
            $scope.post.location = result.address_components[1].short_name;
          });
        })
        .catch(console.error);
    });
  });
  $scope.fileChanged = (file) => { $scope.post.image = file; };
  // $scope.resizeOptions = (width, height) => {
  //   const ratio = width / height;
  //   let centerCrop = true;
  //   if (ratio < 0.8) {
  //     height = width / 0.8;
  //   } else if (ratio > 1.91) {
  //     width = 1.91 * height;
  //   } else {
  //     centerCrop = false;
  //   }

  //   if (width > 1080) {
  //     height *= 1080 / width;
  //     width = 1080;
  //   }
  //   $scope.rszOpts = { width, height, centerCrop };
  //   return $scope.rszOpts;
  // };

  // $scope.resizeCondition = (w, h) => {
  //   const { width, height } = $scope.resizeOptions(w, h);
  //   return width === w && height === h;
  // };

  // [$scope.post.image] = $scope.fileInput.files; };
  $scope.publish = () => {
    // if ($scope.form.image.$valid && $scope.post.image) {
    $scope.upload();
    // }
  };
  $scope.upload = () => {
    Upload.upload({
      url: '/api/post',
      data: $scope.post,
    }).then((response) => {
      this.posts = [response.data].concat(this.posts);
      $scope.post = {};
      newPost.dispatchEvent(new Event('focusout'));
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

export default ['saNewPost', {
  template,
  controller,
  bindings: {
    posts: '=',
  },
}];
