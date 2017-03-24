'use strict';

(function() {

function UserResource($resource,tcFactory) {
  var api = tcFactory.api();
  return $resource(api + '/api/users/:id/:controller', {
    id: '@_id'
  }, {
    changePassword: {
      method: 'PUT',
      params: {
        controller:'password'
      }
    },
    get: {
      method: 'GET',
      params: {
        id:'me'
      }
    }
  });
}

angular.module('workspaceApp.auth')
  .factory('User', UserResource);

})();
