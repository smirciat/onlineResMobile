(function(angular, undefined) {
'use strict';

angular.module('workspaceApp.constants', [])

.constant('appConfig', {userRoles:['guest','user','admin']})
//.constant('moment', require('moment-timezone'))
.constant('angularMomentConfig', {
    timezone: 'America/Anchorage'})

;
})(angular);