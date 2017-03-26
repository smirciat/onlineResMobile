(function(angular, undefined) {
'use strict';

angular.module('workspaceApp.constants', [])

.constant('appConfig', {userRoles:['guest','user','admin']})
.constant('angularMomentConfig', {timezone: 'America/Anchorage'})

;
})(angular);