'use strict';

angular.module('workspaceApp')
  .controller('NavbarController', function (Auth, $state) {
  
    this.menu = [//{
      //'title': 'Home',
      //'state': 'main'
    //}
    ];
  
    this.isCollapsed = true;
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
  });
