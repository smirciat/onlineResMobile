'use strict';

angular.module('workspaceApp')
  .controller('LoginController', function (Auth, $state,$timeout) {
    this.user = {};
    this.object={};
    this.errors = {};
    this.submitted = false;
    var self = this;
    this.user.email = window.localStorage.getItem( 'email' )||"";
    this.user.password = window.localStorage.getItem( 'password' )||"";
    this.object.checked = window.localStorage.getItem( 'checked' )||'NO';

    this.login = function(form) {
      this.submitted = true;
  
      if (form.$valid) {
        if (this.object.checked==='YES') {
              window.localStorage.setItem('email',this.user.email);
              window.localStorage.setItem('password',this.user.password);
              window.localStorage.setItem('checked','YES');
        }
        else {
              window.localStorage.setItem('email',"");
              window.localStorage.setItem('password',"");
              window.localStorage.setItem('checked','NO');
        }
              
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

