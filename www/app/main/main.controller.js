'use strict';

angular.module('workspaceApp')
  .controller('MainController',function($http, $scope,Auth,tcFactory) {
    this.$http = $http;
    this.awesomeThings = [];

    $http.get(tcFactory.api() + '/api/things').then(response => {
      this.awesomeThings = response.data;
    });

    $scope.$on('$destroy', function() {
    });
  

  this.addThing =  function() {
    if (this.newThing) {
      this.$http.post(tcFactory.api() + '/api/things', { name: this.newThing });
      this.newThing = '';
    }
  }

  this.deleteThing =function(thing) {
    this.$http.delete(tcFactory.api() + '/api/things/' + thing._id);
  }
});


