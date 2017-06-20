'use strict';

angular.module('workspaceApp')
  .controller('SettingsController', function (Auth, $state,$http,Modal,tcFactory) {
  
    this.errors = {};
    this.submitted = false;
    this.quickMessage = Modal.confirm.quickMessage();
    var api = tcFactory.api;
    var self = this;
    this.Auth = Auth;
    this.$http = $http;
    this.user = Auth.getCurrentUser();
    $http.get(api+'/api/userAttributes/mobile/user/' + this.user._id).then(function(response) {
      if (response.data.length===0) {
         self.$http.post(api+'/api/userAttributes/mobile', {uid:self.user._id}).then(function(response) {
            self.userAtt = response.data;
         });
      }
      else {
        self.userAtt = response.data[response.data.length-1];
      }
    });

  this.changePhone = function() {
    this.$http.put(api+'/api/userAttributes/mobile/' + this.userAtt._id, this.userAtt).then(function(response) {
      $state.go('main');
    });
  };

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
