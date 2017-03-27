'use strict';

angular.module('workspaceApp')
  .controller('SignupController', function (Auth, $state) {
    this.user = {};
    this.errors = {};
    this.submitted = false;


    this.Auth = Auth;
    this.$state = $state;


  this.register = function(form) {
    this.submitted = true;

    if (form.$valid) {
      this.Auth.createUser({
        name: this.user.name,
        email: this.user.email,
        password: this.user.password
      })
      .then(() => {
        // Account created, redirect to home
        this.$state.go('main');
      })
      .catch(err => {
        err = err.data;
        this.errors = {};

        // Update validity of form fields that match the sequelize errors
        if (err.name) {
          angular.forEach(err.fields, field => {
            form[field].$setValidity('mongoose', false);
            this.errors[field] = err.message;
          });
        }
      });
    }
  };
});
