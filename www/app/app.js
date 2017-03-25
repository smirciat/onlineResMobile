'use strict';

var dependencies = [
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
];
var isMobile = typeof(ionic)!=='undefined' && (ionic.Platform.is("ios") || ionic.Platform.is("android"));
if(isMobile) {
    dependencies.push('ionic');
}

var ngModule = angular.module('workspaceApp', dependencies)
    .config(function ($locationProvider, $compileProvider, $urlRouterProvider) {
       $urlRouterProvider
      .otherwise('/');
       $locationProvider.html5Mode(true); // enable html5 mode
       // other pieces of code.
    });
    //.run(function (application, $rootScope) {
      // application.setPageTitle();
       //$rootScope.$on('$stateChangeSuccess', function (event) {
         // application.setPageTitle();
       //});
       // other pieces of code.
   //});
if(isMobile) {
   ngModule.run(function ($ionicPlatform) {
       $ionicPlatform.ready(function() {
       // Anything native should go here, like StatusBar.styleLightContent()
       if (window.StatusBar) {
          // org.apache.cordova.statusbar required
          StatusBar.styleDefault();
       }
    });
  }); 
}