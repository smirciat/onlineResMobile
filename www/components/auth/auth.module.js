'use strict';

angular.module('workspaceApp.auth', [
  'workspaceApp.constants',
  'workspaceApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
