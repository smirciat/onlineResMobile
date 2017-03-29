'use strict';

angular.module('workspaceApp')
  .controller('LoginController', function (Auth, $state) {
    this.user = {};
    this.errors = {};
    this.submitted = false;
    var self = this;

    this.login = function(form) {
      this.submitted = true;
  
      if (form.$valid) {
        Auth.login({
          email: this.user.email,
          password: this.user.password
        })
        .then(function() {
          // Logged in, redirect to home
          $state.go('main');
        })
        .catch(function(err) {
          self.errors.other = err.message;
        });
      }
    };
});

