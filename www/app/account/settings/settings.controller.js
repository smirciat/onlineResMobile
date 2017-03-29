'use strict';

angular.module('workspaceApp')
  .controller('SettingsController', function (Auth, $state) {
  //start-non-standard
    this.errors = {};
    this.submitted = false;


              var self = this;

  this.changePassword = function(form) {
    this.submitted = true;

    if (form.$valid) {
      this.Auth.changePassword(this.user.oldPassword, this.user.newPassword)
        .then(function() {
          self.message = 'Password successfully changed.';
        })
        .catch(function() {
          form.password.$setValidity('mongoose', false);
          self.errors.other = 'Incorrect password';
          self.message = '';
        });
    }
  };
  
});
