'use strict';
window.onerror = function(errorMsg,url,lineNumber){
    alert('!' + errorMsg.substring(0,800) + '  ' + errorMsg.length + ' '  + url + ' ' + lineNumber);
};

angular.module('workspaceApp', ['ionic',
                                'workspaceApp.auth',
                                'workspaceApp.admin',
                                'workspaceApp.constants',
                                'ngCookies',
                                'ngResource',
                                'ngSanitize',
                                'ngAnimate',
                                'ui.select',
                                'ui.router',
                                'ui.bootstrap',
                                'validation.match',
                                'ngTouch',
                                'angularMoment'
                                ])

.run(function($ionicPlatform,$state,$timeout) {
     $ionicPlatform.ready(function() {
                          // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                          // for form inputs)
                          
                          if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                          //cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                          //cordova.plugins.Keyboard.disableScroll(true);
                          
                          }
                          if (window.StatusBar) {
                          // org.apache.cordova.statusbar required
                          StatusBar.styleDefault();
                          }
                          });
     })

.config(function($stateProvider, $urlRouterProvider) {
        
        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        
        
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/');
        
        });
