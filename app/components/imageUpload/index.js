import './imageUpload.scss';
import template from './imageUpload.html';

/* @ngInject */
function controller($scope, Upload, $timeout) {
  $scope.previews = [];
  $scope.upload = (dataUrl, name) => {
    Upload.upload({
      url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
      data: {
        file: Upload.dataUrltoBlob(dataUrl, name),
      },
    }).then((response) => {
      $timeout(() => {
        $scope.result = response.data;
        $scope.previews.push(dataUrl);
      });
    }, (response) => {
      if (response.status > 0) {
        $scope.errorMsg = `${response.status}: ${response.data}`;
      }
    }, (evt) => {
      $scope.progress = Math.round(100.0 * (evt.loaded / evt.total));
    });
  };
}

export default ['saImageUpload', { template, controller }];
