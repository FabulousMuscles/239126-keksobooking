'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var PHOTO_LIMIT = 10;
  var PHOTO_WIDTH = 70;
  var PHOTO_HEIGHT = 70;

  var AVATAR_SRC_DEFAULT = 'img/muffin-grey.svg';
  var AVATAR_LIMIT = 1;

  var onPhotoLoad = function (fileSource) {
    var divElement = document.createElement('div');
    var imageElement = document.createElement('img');

    divElement.classList.add('ad-form__photo');

    imageElement.src = fileSource;
    imageElement.width = PHOTO_WIDTH;
    imageElement.height = PHOTO_HEIGHT;

    divElement.appendChild(imageElement);
    photoContainerElement.appendChild(divElement);
  };

  var onAvatarLoad = function (fileSource) {
    avatarImageElement.src = fileSource;
  };

  var uploadAvatar = function (fileElement) {
    Array
      .from(fileElement.files)
      .slice(0, AVATAR_LIMIT)
      .forEach(processFile(onAvatarLoad));
  };

  var uploadPhotos = function (fileElement) {
    var photosElements = photoContainerElement.querySelectorAll('.ad-form__photo');

    if (hasPhotoPlaceholder) {
      removePhotoPlaceholder();
    }

    Array
      .from(fileElement.files)
      .slice(0, PHOTO_LIMIT - photosElements.length)
      .forEach(processFile(onPhotoLoad));
  };

  var processFile = function (callbackLoad) {
    return function (file) {
      var reader;
      var fileName = file.name.toLowerCase();
      var matches = FILE_TYPES.some(function (fileType) {
        return fileName.endsWith(fileType);
      });

      if (matches) {
        reader = new FileReader();
        reader.addEventListener('load', function () {
          callbackLoad(reader.result);
        });
        reader.readAsDataURL(file);
      }
    };
  };

  var onAvatarFileChanged = function (evt) {
    uploadAvatar(evt.currentTarget);
  };

  var onAvatarDropZoneDrop = function (evt) {
    evt.preventDefault();

    uploadAvatar(evt.dataTransfer);
  };

  var onPhotoFileChanged = function (evt) {

    uploadPhotos(evt.currentTarget);
  };

  var onDragOver = function (evt) {
    evt.preventDefault();
  };

  var onPhotoDropZoneDrop = function (evt) {
    evt.preventDefault();

    uploadPhotos(evt.dataTransfer);
  };

  var removePhotoPlaceholder = function () {
    document.querySelector('.ad-form__photo').remove();
    hasPhotoPlaceholder = false;
  };

  var createPhotoPlaceholder = function () {
    var divElement = document.createElement('div');

    divElement.classList.add('ad-form__photo');
    photoContainerElement.appendChild(divElement);

    hasPhotoPlaceholder = true;
  };

  var cleanPhotoContainer = function () {
    var photosElements = photoContainerElement.querySelectorAll('.ad-form__photo');

    Array.from(photosElements).forEach(function (photoElement) {
      photoContainerElement.removeChild(photoElement);
    });

    createPhotoPlaceholder();
  };

  var cleanAvatar = function () {
    avatarImageElement.src = AVATAR_SRC_DEFAULT;
  };

  var hasPhotoPlaceholder = true;
  var avatarDropZoneElement = document.querySelector('.ad-form-header__drop-zone');
  var avatarFileElement = document.querySelector('.ad-form-header__input');
  var avatarElement = document.querySelector('.ad-form-header__preview');
  var avatarImageElement = avatarElement.querySelector('img');

  var photoContainerElement = document.querySelector('.ad-form__photo-container');
  var photoDropZoneElement = document.querySelector('.ad-form__drop-zone');
  var photoFileElement = document.querySelector('.ad-form__upload input[type="file"]');

  var onAvatarDropZoneDragOver = onDragOver;
  var onPhotoDropZoneDragOver = onDragOver;

  window.formPhoto = {
    activate: function () {
      avatarFileElement.addEventListener('change', onAvatarFileChanged);
      avatarDropZoneElement.addEventListener('dragover', onAvatarDropZoneDragOver);
      avatarDropZoneElement.addEventListener('drop', onAvatarDropZoneDrop);

      photoFileElement.addEventListener('change', onPhotoFileChanged);
      photoDropZoneElement.addEventListener('dragover', onPhotoDropZoneDragOver);
      photoDropZoneElement.addEventListener('drop', onPhotoDropZoneDrop);
    },
    deactivate: function () {
      avatarFileElement.removeEventListener('change', onAvatarFileChanged);
      avatarDropZoneElement.removeEventListener('dragover', onAvatarDropZoneDragOver);
      avatarDropZoneElement.removeEventListener('drop', onAvatarDropZoneDrop);

      photoFileElement.removeEventListener('change', onPhotoFileChanged);
      photoDropZoneElement.removeEventListener('dragover', onPhotoDropZoneDragOver);
      photoDropZoneElement.removeEventListener('drop', onPhotoDropZoneDrop);

      cleanPhotoContainer();
      cleanAvatar();
    }
  };
})();
