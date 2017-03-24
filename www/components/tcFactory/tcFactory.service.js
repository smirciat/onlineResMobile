'use strict';

angular.module('workspaceApp')
  .factory('tcFactory', ['$http', function ($http) {
    var api = 'https://res-c9-smirciat2.c9users.io';
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var d = new Date(Date.now());
    var date = d;
    var dateTime=d;
    var smfltnum = undefined;
    var travelCodes;
    var pilots;
    var dt;
    var aircraft;
    var flights;
    var scheduledFlights;
    var reservations;
    var oldBody = {};
    var oldBody1={};
    var oldBody2={};
    var name;
    var invoice;
    var sections=[];
    
    return {
        api: function(){
          return api;
        },
        getData: function (callback) {
            if(travelCodes) {
                return callback(travelCodes);
            } else {
                $http.get('https://res-c9-smirciat2.c9users.io:8080/api/travelCodes').success(function(d) {
                    travelCodes = d;
                    return callback(d);
                });
            }
        },
        getFlights: function (body,callback) {
            if (oldBody.date) oldBody.date = new Date(oldBody.date);
            if (body.date) body.date = new Date(body.date);
            if (flights&&oldBody.date&&
                         oldBody.date.getMonth()===body.date.getMonth()&&
                         oldBody.date.getFullYear()===body.date.getFullYear()&&
                         oldBody.date.getDate()===body.date.getDate()) {
                            return callback(flights);
                         }
            else {
                $http.post('https://res-c9-smirciat2.c9users.io:8080/api/flights/o',{date:body.date}).success(function(d) {
                  oldBody=body;
                  flights=d;
                  return callback(flights);
                });
            }
        },
        getF: function () {
            
                  return flights;

        },
        getReservations: function (body,callback) {
            if (body.smfltnum) body.smfltnum = body.smfltnum.toUpperCase();
            if (reservations&&oldBody1.date===body.date&&oldBody1.smfltnum===body.smfltnum) return callback(reservations);
            else {
                $http.post('https://res-c9-smirciat2.c9users.io:8080/api/reservations/o',body).success(function(d) {
                  oldBody1=body;
                  return callback(reservations=d);
                });
            }
        },
        getPilots: function (callback) {
            if(pilots) {
                return callback(pilots);
            } else {
                $http.get('https://res-c9-smirciat2.c9users.io:8080/api/pilotSchs').success(function(d) {
                    return callback(pilots = d);
                });
            }
        },
        getAircraft: function (callback) {
            if(aircraft) {
                return callback(aircraft);
            } else {
                $http.get('https://res-c9-smirciat2.c9users.io:8080/api/aircraftSchs').success(function(d) {
                    return callback(aircraft = d);
                });
            }
        },
        getScheduledFlights: function (body,callback) {
            if (oldBody2.date) oldBody2.date = new Date(oldBody2.date);
            if (body.date) body.date = new Date(body.date);
            if (oldBody2.date&&body.date&&oldBody2.date.getMonth()===body.date.getMonth()&&
                         oldBody2.date.getFullYear()===body.date.getFullYear()&&
                         oldBody2.date.getDate()===body.date.getDate()&&scheduledFlights) return callback(scheduledFlights);
            else {
                $http.post('https://res-c9-smirciat2.c9users.io:8080/api/scheduledFlights',body).success(function(d) {
                    oldBody2.date=body.date;
                    return callback(scheduledFlights = d);
                });
            }
        },
        setInvoice: function(i){
            invoice=i;
        },
        getInvoice: function(){
            return invoice;
        },
        setName: function(nm){
            name=nm;
        },
        getName: function(){
            return name;
        },
        setSections: function(sec){
            sections=sec;
        },
        getSections: function(){
            return sections;
        },
        setDate: function(dt){
            dt=new Date(dt);
            date=days[dt.getDay()] + ' ' + months[dt.getMonth()] + ' ' + dt.getDate() + ', ' + dt.getFullYear();
            dateTime=dt;
        },
        getDate: function(){
                dt = new Date(date);
                return days[dt.getDay()] + ' ' + months[dt.getMonth()] + ' ' + dt.getDate() + ', ' + dt.getFullYear();
        },
        getDateTime: function(){
          return dateTime;  
        },
        setSmfltnum: function(sm){
           smfltnum=sm.toUpperCase();
        },
        getSmfltnum: function(){
            return smfltnum;
        },
        setRow: function(api,row,callback){
            console.log(row);
            $http.patch('https://res-c9-smirciat2.c9users.io:8080/api/' + api + '/', row).success(function(d){
               return callback(d); 
            });

        },
        refreshFlights: function(){
            oldBody={};
            oldBody1={};
        },
        getPossibility: function(){
          //loop through tis array to try on routes.  If a route captures all present reservations, it is the final route, populate flight with times accordingly
          return [{count:1, routing:'HSH',includes:[1,12]},
                  {count:2, routing:'HPH',includes:[2,11]},
                  {count:3, routing:'HKH',includes:[3,10]},
                  {count:4, routing:'HSPH',includes:[1,5,11]},
                  {count:5, routing:'HSKH',includes:[1,4,10]},
                  {count:6, routing:'HPSH',includes:[2,8,12]},
                  {count:7, routing:'HKSH',includes:[3,9,12]},
                  {count:8, routing:'HKPH',includes:[3,6,11]},
                  {count:9, routing:'HPKH',includes:[2,7,10]},
                  {count:10, routing:'HSKSH',includes:[1,4,9,12]},
                  {count:11, routing:'HSPSH',includes:[1,5,8,12]},
                  {count:12, routing:'HPKPH',includes:[2,7,6,11]},
                  {count:13, routing:'HKPKH',includes:[3,6,7,10]},
                  {count:14, routing:'HSPKH',includes:[1,5,7,10]},
                  {count:15, routing:'HSKPH',includes:[1,4,6,11]},
                  {count:16, routing:'HPKSH',includes:[2,7,9,12]},
                  {count:17, routing:'HKPSH',includes:[3,6,8,12]},
                  {count:18, routing:'HSPKSH',includes:[1,5,7,9,12]},
                  {count:19, routing:'HSKPSH',includes:[1,4,6,8,12]},
                  {count:22, routing:'HSPKPH',includes:[1,5,7,6,11]},
                  {count:23, routing:'HSKPKH',includes:[1,4,6,7,10]},
                  {count:24, routing:'HPKPSH',includes:[2,7,6,8,12]},
                  {count:25, routing:'HKPKSH',includes:[3,6,7,9,12]},
                  {count:26, routing:'HSPKPSH',includes:[1,5,7,6,8,12]},
                  {count:27, routing:'HSKPKSH',includes:[1,4,6,7,9,12]}
          ];   
        },
        getCovered: function(){
          //find ref for each reservation and check if current possibility count is contained in 'covered', if not, flag false and move to next possibility
          return [{ref:1, start:0, end:15,covered:[1,4,5,10,11,14,15,18,19,26,27,22,23]},
                  {ref:2, start:0, end:20,covered:[2,4,6,8,9,11,12,13,14,15,18,19,26,27,16,17,22,23,24,25]},
                  {ref:3, start:0, end:20,covered:[3,5,7,8,9,10,12,13,14,15,18,19,26,27,16,17,22,23,25]},
                  {ref:4, start:15, end:25,covered:[5,10,14,15,18,19,26,27,22,23]},
                  {ref:5, start:15, end:25,covered:[4,11,14,15,18,19,26,27,22,23]},
                  {ref:6, start:30, end:35,covered:[8,12,13,15,19,26,27,17,22,23,24,25]},
                  {ref:7, start:30, end:35,covered:[9,12,13,14,18,26,27,16,22,23,24,25]},
                  {ref:8, start:35, end:45,covered:[6,11,18,19,26,27,16,17,24,25]},
                  {ref:9, start:35, end:45,covered:[7,10,18,19,26,27,16,17,24,25]},
                  {ref:10, start:39, end:59,covered:[3,5,7,8,9,10,12,13,14,15,18,19,26,27,16,17,22,23,24,25]},
                  {ref:11, start:39, end:59,covered:[2,4,6,8,9,11,12,13,14,15,18,19,26,27,16,17,22,23,24,25]},
                  {ref:12, start:44, end:59,covered:[1,6,7,10,11,18,19,26,27,16,17,24,25]}
          ];   
        }
    };
}]);
