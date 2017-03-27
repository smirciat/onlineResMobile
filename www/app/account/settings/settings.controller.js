'use strict';

angular.module('workspaceApp')
  .controller('SettingsController', function (Auth, $state) {
  //start-non-standard
    this.errors = {};
    this.submitted = false;

    this.Auth = Auth;
  

  this.changePassword = function(form) {
    this.submitted = true;

    if (form.$valid) {
      this.Auth.changePassword(this.user.oldPassword, this.user.newPassword)
        .then(() => {
          this.message = 'Password successfully changed.';
        })
        .catch(() => {
          form.password.$setValidity('mongoose', false);
          this.errors.other = 'Incorrect password';
          this.message = '';
        });
    }
  };
  
});
