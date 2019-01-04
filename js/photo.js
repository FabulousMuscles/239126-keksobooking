'use strict';
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var createPhotoElement = function (url) {
    var photosElements = photoContainerElement.querySelectorAll('.ad-form__photo');
    if (photosElements.length === 10) {
      return null;
    } else {
      var photoElementClone = photoElement.cloneNode(true);
      photoElement.remove();
      var img = document.createElement('img');
      img.src = url;
      img.width = '70';
      img.height = '70';
      photoElementClone.appendChild(img);

      return photoElementClone;
    }
  };

  var uploadPhoto = function (uploadedFile) {
    var files = uploadedFile.files;
    var fileName;
    var matches;
    var reader;

    Array.from(files).forEach(function (file) {
      fileName = file.name.toLowerCase();

      matches = FILE_TYPES.some(function (fileType) {
        return fileName.endsWith(fileType);
      });

      if (matches) {
        reader = new FileReader();

        reader.addEventListener('load', function () {
          photoContainerElement.appendChild(createPhotoElement(reader.result));
        });

        reader.readAsDataURL(file);
      }
    });
  };

  var fileUploadElementChangeHandler = function () {
    uploadPhoto(fileUploadElement);
  };

  var dropZoneElementDragOverHandler = function (evt) {
    evt.preventDefault();
  };

  var dropZoneElementDropHandler = function (evt) {
    evt.preventDefault();
    uploadPhoto(evt.dataTransfer);
  };

  var cleanPhotoContainer = function () {
    var photosElements = photoContainerElement.querySelectorAll('.ad-form__photo');
    Array.from(photosElements).forEach(function (photoElement) {
      photoContainerElement.removeChild(photoElement);
    });
    photoContainerElement.appendChild(photoElement);
  };

  var fileUploadElement = document.querySelector('.ad-form__upload input[type="file"]');
  var dropZoneElement = document.querySelector('.ad-form__drop-zone');
  var photoElement = document.querySelector('.ad-form__photo');
  var photoContainerElement = document.querySelector('.ad-form__photo-container');

  window.photo = {
    activate: function () {
      fileUploadElement.addEventListener('change', fileUploadElementChangeHandler);
      dropZoneElement.addEventListener('dragover', dropZoneElementDragOverHandler);
      dropZoneElement.addEventListener('drop', dropZoneElementDropHandler);
    },
    deactivate: function () {
      fileUploadElement.removeEventListener('change', fileUploadElementChangeHandler);
      dropZoneElement.removeEventListener('dragover', dropZoneElementDragOverHandler);
      dropZoneElement.removeEventListener('drop', dropZoneElementDropHandler);
      cleanPhotoContainer();
    }
  };
})();
