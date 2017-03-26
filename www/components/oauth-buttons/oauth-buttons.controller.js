'use strict';

angular.module('workspaceApp')
  .controller('OauthButtonsCtrl', function($window,Auth) {
    this.loginOauth = function(provider) {
      $window.location.href = Auth.api() + '/auth/' + provider;
    };
  });
