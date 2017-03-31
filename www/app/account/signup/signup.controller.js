'use strict';

angular.module('workspaceApp')
  .controller('SignupController', function (Auth, $state,Modal) {
    this.user = {};
    this.errors = {};
    this.submitted = false;
    var self =this;

  self.quickModal=Modal.confirm.quickMessage();
  this.register = function(form) {
    this.submitted = true;

    if (form.$valid) {
      Auth.createUser({
        name: this.user.name,
        email: this.user.email,
        password: this.user.password
      })
      .then(function()  {
        // Account created, redirect to home
        $state.go('main');
      })
      .catch(function(err) {
        self.quickModal("Error on signup: " + err.data.errors[0].message||"");
        err = err.data;
        self.errors = {};

        // Update validity of form fields that match the sequelize errors
        if (err.name) {
          angular.forEach(err.fields, function(field) {
            form[field].$setValidity('mongoose', false);
            self.errors[field] = err.message;
          });
        }
      });
    }
  };
});
