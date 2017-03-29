'use strict';

angular.module('workspaceApp')
.controller('AdminController', function (User) {
    // Use the User $resource to fetch all users
    this.users = User.query();
  

  this.delete = function(user) {
    user.$remove();
    this.users.splice(this.users.indexOf(user), 1);
  }
 });
