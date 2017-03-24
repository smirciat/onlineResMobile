'use strict';

angular.module('workspaceApp', [
  'workspaceApp.auth',
  'workspaceApp.admin',
  'workspaceApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.select',
  'ui.router',
  'ui.bootstrap',
  'validation.match',
  '720kb.datepicker',
  'ngTouch'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
