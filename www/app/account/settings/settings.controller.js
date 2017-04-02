'use strict';

angular.module('workspaceApp')
  .controller('SettingsController', function (Auth, $state,Modal) {
  
    this.errors = {};
    this.submitted = false;
    this.quickMessage = Modal.confirm.quickMessage();

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
  
  this.changeEmail = function(form) {
    this.submitted = true;

    if (form.$valid) {
      this.Auth.changeEmail(this.user.newEmail)
        .then(function() {
          self.emailMessage = 'Email successfully changed.';
        })
        .catch(function(err) {
          form.newEmail.$setValidity('mongoose', false);
          self.quickMessage(err.data.errors[0].message);
          self.emailMessage = '';
        });
    }
  }
  
});
