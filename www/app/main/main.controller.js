'use strict';

angular.module('workspaceApp')
  .controller('MainController',function($http, $scope, Auth, Modal, $timeout, $location, $ionicPlatform,$cordovaKeyboard,email,tcFactory,moment) {
    this.$http = $http;
    this.object = {};
    this.object.checked="NO";
    this.email=email;
    this.Auth = Auth;
    this.$location = $location;
    this.awesomeThings = [];
    this.isloggedIn=false;
    this.user=Auth.getCurrentUser;
    this.isLoggedIn=Auth.isLoggedIn;
    this.newRes = {};
    this.resList=[];
    this.code={};
    this.smfltnum={};
    this.tcFactory=tcFactory;
    var d = moment(Date.now());
              var api = tcFactory.api;
    this.currDate = d.format('MM/DD/YYYY');
    this.endDate= d.add(7,'months');
    this.disabled = [moment("1/1/2018").format('MM/DD/YYYY'),
                     moment("12/25/2017").format('MM/DD/YYYY'),
                     moment("11/23/2017").format('MM/DD/YYYY'),
                     moment("1/1/2019").format('MM/DD/YYYY'),
                     moment("12/25/2018").format('MM/DD/YYYY'),
                     moment("11/22/2018").format('MM/DD/YYYY')];
    this.timeList = [];
    this.firstFlight = 9;
    this.lastFlight = 16;
    this.flightMatrix = [{flight:17, start:"2/3/2016", end:"11/4/2016"},
    {flight:18, start:"5/2/2016", end:"10/1/2016"},
    {flight:8, start:"5/2/2016", end:"9/15/2016"}
    ];
    var self=this;
              
    self.travelCodes = self.email.travelCodes;
    
    self.quickModal=Modal.confirm.quickMessage();
    
    self.delete = Modal.confirm.check(function(reservation){
      var user=self.user();
      reservation.Comment = user._id + ' ' + user.name;
      reservation.UPDATED = moment(Date.now());
      self.$http.post(api + '/api/dels',reservation);
      self.$http.put(api + '/api/reservations/mobile/delete/' + reservation._id,{user:user, reservation:reservation}).then(function(response){
        self.refresh();
      });
    });
    self.add = Modal.confirm.check(function(reservation) {
      if (reservation.FWeight>0) reservation.baggageWeightEnteredByCustomer=true; 
      self.$http.post(api + '/api/reservations/mobile', reservation).then(function(response) {
            self.sendEmail(self.resObj);
            self.cancelRes();
          });
    });
    self.update = Modal.confirm.check(function(reservation) {
      self.$http.put(api + '/api/reservations/mobile/' + reservation._id, {user:self.user(), reservation:reservation}).then(function(response) {
            self.sendEmail(self.resObj);
            self.cancelRes();
          });
    });
    self.getPhone = Modal.confirm.enterData(function(formData){
      self.$http.post(api + '/api/userAttributes/mobile', {uid:self.user()._id, phone: formData.data}).then(function(response) {
      });
    });
    self.getEmail = Modal.confirm.enterData(function(formData){
      if (formData.data) Auth.changeEmail(formData.data, function(response) {
        self.Auth.logout();
        self.$location.path('/');
      });
    });
    
    self.isLoggedIn(function(response) {
      if (response) {
        self.refresh();
        self.newRes.FIRST =  self.user().name.split(" ")[0];
        self.newRes.LAST =  self.user().name.split(" ")[1];
        if (self.user().name.split(" ").length > 2) self.newRes.LAST += " " + self.user().name.split(" ")[2];
        self.$http.get(api + '/api/userAttributes/mobile/user/' + self.user()._id).then(function(response) {
          if (!response.data[0]||!response.data[0].phone) {
            //user needs a phone number
            self.getPhone("Please enter a phone number for your account in settings.");
          }
        });
      }
    });
    

  self.setFlights = function() {
    self.flightMatrix.forEach(function(number){
      if (number.flight>self.lastFlight) {
        if (new Date(number.start)<=new Date(self.newRes['DATE TO FLY'])&&new Date(number.end)>=new Date(self.newRes['DATE TO FLY'])){
          self.lastFlight = number.flight;
        }
      }
      if (number.flight<self.firstFlight) {
        if (new Date(number.start)<=new Date(self.newRes['DATE TO FLY'])&&new Date(number.end)>=new Date(self.newRes['DATE TO FLY'])){
          self.firstFlight = number.flight;
        }
      }
    });
    
  };
  
  self.addRes = function() {
    //move pulldown list selection to newRes object
    self.newRes['Ref#']=undefined;
    self.newRes.smfltnum=undefined;
    if (self.code.selected) self.newRes['Ref#']=self.code.selected.ref;
    if (self.smfltnum.selected) self.newRes.smfltnum=self.smfltnum.selected.smfltnum;
    //if there are any entries here, go ahead and post it
    //if (Object.keys(self.newRes).length>0) {
    if (!self.isInt(self.newRes.WEIGHT)||!self.isInt(self.newRes.FWeight)) return self.quickModal("Weight values need to be an integer");
    if (self.newRes.FIRST&&self.newRes.LAST&&self.newRes.WEIGHT&&self.newRes.smfltnum&&self.newRes['Ref#']&&self.newRes['DATE TO FLY']) {
      var date = moment(self.newRes['DATE TO FLY']);
      self.newRes['DATE TO FLY']=date.format('MMM/D/YYYY');
      self.resObj = {
        FIRST: self.newRes.FIRST,
        LAST: self.newRes.LAST,
        TIME: self.smfltnum.selected.time,
        DATE: self.newRes['DATE TO FLY'],
        FROM: self.code.selected.name
      };
      self.resEntry = self.newRes.FIRST + ' ' + self.newRes.LAST + ' has a reservation at ' +  self.smfltnum.selected.time + ' on ' + self.newRes["DATE TO FLY"] + ' from ' + self.code.selected.name + '.';
      self.$http.get(api + '/api/userAttributes/mobile/user/' + self.user()._id).then(function(response) {
        if (!response.data[0]||!response.data[0].phone) {
          self.getPhone("Please enter a phone number for your account.");
          return;
        }
        if (!self.user().email) {
          self.getEmail("Please enter an email for your account.  You will need to login again after entering self.");
          return;
        }
        self.newRes.Phone = response.data[0].phone;
        //prepare for post
        self.newRes.email = self.user().email;
        if (self.newRes._id){
          // has an _id field, its an edited reservation
          self.resEntry = 'UPDATED RESERVATION: ' + self.resEntry;
          self.newRes['FLIGHT#']="1" + self.newRes.smfltnum;
          //put
          self.update("Update",self.resEntry,self.newRes);
        }
        else {
          //no _id field, its a new reservation
          self.newRes.FWeight= self.newRes.FWeight||0;
          self.newRes['FLIGHT#']="1" + self.newRes.smfltnum;
          self.newRes.uid=self.user()._id;
          self.newRes['DATE RESERVED']=moment(Date.now());
          //post
          self.add("Add",self.resEntry,self.newRes);
        }
        
      },function(response) {
        self.getPhone("Please enter a phone number for your account in settings.");
      });
      
      
    }
    else self.quickModal("Please enter the required fields marked with *");
  };

  self.remRes = function(res) {
    var date = new Date(res['DATE TO FLY']);
    var d = new Date(Date.now());
    var today = new Date(d.getFullYear(),d.getMonth(),d.getDate());
    var tomorrow = new Date(d.getFullYear(),d.getMonth(),d.getDate()+1);
    if (date<today) {
      self.quickModal("Sorry, you cannot edit a reservation from a past date.");
      return;
    }
    var hour = (d.getTime()-today.getTime())/3600000;
    var enough = (parseInt(res.smfltnum.substring(0,2),10)-hour);
    if (date>=today && date<tomorrow && enough<1) {
      self.quickModal("Sorry, you cannot edit a reservation self close to flight time. Please call our office at (907) 235-1511 or (888) 482-1511.");
      return;
    }
    self.delete("Delete", 'Reservation for ' + res.FIRST + ' ' + res.LAST + ' from ' + self.convert(res['Ref#']),res);
  };
  
  self.cancelRes = function(){
    self.newRes = {};
    self.code.selected=undefined;
    self.smfltnum.selected=undefined;
    self.refresh();
  };
  
  self.editRes = function(res){
    var date = new Date(res['DATE TO FLY']);
    var d = new Date(Date.now());
    var today = new Date(d.getFullYear(),d.getMonth(),d.getDate());
    var tomorrow = new Date(d.getFullYear(),d.getMonth(),d.getDate()+1);
    if (date<today) {
      self.quickModal("Sorry, you cannot edit a reservation from a past date.");
      return;
    }
    var hour = (d.getTime()-today.getTime())/3600000;
    var enough = (parseInt(res.smfltnum.substring(0,2),10)-hour);
    if (date>=today && date<tomorrow && enough<1) {
      self.quickModal("Sorry, you cannot edit a reservation self close to flight time. Please call our office at (907) 235-1511 or (888) 482-1511.");
      return;
    }
    var newRes = Object.assign({},res);
    self.newRes = newRes;
    self.newRes.UPDATED = moment(d);
    self.newRes['DATE TO FLY']=new Date(date);
    self.code.selected = self.email.travelCodes.filter(function ( tc ) {
      return tc.ref === newRes['Ref#'];
    })[0];
    self.makeList(self.newRes.smfltnum);
     
   };
   
   self.reverseRes = function(res){
     var date = new Date(res['DATE TO FLY']);
     var d = new Date(Date.now());
     var today = d;
     var newRes = Object.assign({},res);
     self.newRes = newRes;
     self.newRes._id=undefined;
     self.newRes['INVOICE#']=undefined;
     self.newRes['DATE TO FLY']=date;
     if (date<today) self.newRes['DATE TO FLY']=d;
     self.newRes['DATE RESERVED']=moment(d);
     self.newRes['Ref#'] = 13-res['Ref#'];
     self.code.selected = self.email.travelCodes.filter(function ( tc ) {
       return tc.ref === newRes['Ref#'];
     })[0];
     self.makeList(self.newRes.smfltnum);
     res['DATE TO FLY']=moment(res['DATE TO FLY']);
  };
  
  self.refresh = function(){
    //response.data is an array of objects representing reservations made by current user
      self.$http.get(api + '/api/reservations/mobile/user/' + self.user()._id).then(function(response) {
      self.resList=response.data.filter(function(res){
        var date = new Date(res['DATE TO FLY']);
        var d = new Date(Date.now());
        var day = d.getDate();
        var month = d.getMonth();
        var year = d.getFullYear();
        if (day<=5) {
          day += 28;
          if (month===0){
            month=11;
            year--;
          }
          else month--;
        }
        var today = new Date(year,month,day-5);
        return today<=date;
      });
      if (self.object.checked==="YES") self.resList=response.data;
      self.resList.forEach(function(res){
        self.timeConvert(res.smfltnum,res['Ref#'],res['DATE TO FLY']).then(function(response
                                                                                    ){
          res.time = response;
        });
      });
    });
  };
  
  self.convert = function(refnum){
    var obj = self.email.travelCodes.filter(function ( tc ) {
      return tc.ref === refnum;
    })[0];
    return obj.name;
  };
  
  self.hideKeyboard = function(){
    $ionicPlatform.ready(function(){
        $timeout(function(){
          $cordovaKeyboard.close();
        }
        ,300);
    });
  };
  
  self.timeConvert = function(smfltnum,ref,date){
    return self.$http.post(api + '/api/scheduledFlights/mobile',{date:date}).then(function(response) {
      var scheduledFlights=response.data;
      var fltArray = scheduledFlights.filter(function(flight){
        return parseInt(smfltnum.substring(0,2),10)===flight.smfltnum;
      });
      if (fltArray.length>0){
        var field = "begin";
        if (ref<6&ref>3) field = 'sovFront';
        if (ref<12&&ref>5) field = 'pgmKeb';
        if (ref===12) field = 'sovBack';
        return fltArray[0][field];
      }
      else {
        if (ref>12) return smfltnum.substring(0,2) + ':00';
      }
  
    });
  };
  
  self.sendEmail = function(res){
    self.email.sendEmail(res, self.resEntry,self.user());
  };
  
  self.showHelp = function(){
    self.quickModal("The first line contains input boxes for the details of your new reservation.  Below that are all the reservations associated with your account.  Click Add/Update to finalize your reservation, then you will see it below.  If you wish to make a change, the Remove and Edit buttons are available.  The orange button allows you to create a new reservation in the opposite direction of the original one. Click Edit to bring an existing reservation to the top row where you can edit it.  Click Undo if you change your mind and do not wish to make an edit. If your desired departure time does not appear in the pull-down list, please call us to make your reservation or choose another time.");
  };
  
  self.overWeight = function(){
    if (self.newRes.FWeight>50)
      self.quickModal("The first 50 pounds of baggage is included with your ticket.  Additional fees apply for overweight baggage.  Please be aware that we will make every effort to accomodate your baggage on the flight with you, but we may need to bring some of it at a later time.  If you need all of your baggage to stay with you, please consider whether a charter is a good option for you.  Please call us for details. (907) 235-1511 or (888) 481-1511");
  };
  
  self.isInt = function(value) {
    //not tradionally part of self, but workes for self application
    if (value===undefined) return true;
    var x;
    if (isNaN(value)) {
      return false;
    }
    x = parseFloat(value);
    return (x | 0) === x;
  };

  self.newDate = function(){
    var d = moment(self.newRes['DATE TO FLY']);
    var today = moment(self.currDate);
    if (d<today) {
       self.quickModal("This date is in the past, please try again");
       self.newRes['DATE TO FLY']=new Date(self.currDate);
       return;
    }
    else {
      if (self.disabled.includes(d.format("MM/DD/YYYY"))) {
        self.quickModal("Sorry, Smokey Bay will be closed on this date, please try again");
        self.newRes['DATE TO FLY']=new Date(self.currDate);
        return;
      }
      else {
        if (d.diff(today)>18408222000) {
              self.quickModal("Sorry, please pick a date within the next seven months");
              self.newRes['DATE TO FLY']=new Date(self.currDate);
              return;
        }
        else self.makeList();
      }
    }
    
  };
              
  self.makeList = function(sfn){
    //don't do this if one of the fields is blank
    if (!(self.newRes['DATE TO FLY']&&self.code.selected)) return;
    var endDate=new Date(self.endDate);
    var selfDate = new Date(self.newRes['DATE TO FLY']);
    if (selfDate>endDate) return;
    self.setFlights();
    self.smfltnum.selected=undefined;
    //month starts with 0 for Jan var tempDate="2/18/16";
    var query = "date=" + selfDate;
    self.$http.get(api + '/api/reservations/mobile?' + query).then(function(response) {
      var data=response.data.filter(function(res){
        return res['Ref#']<13;
      });
      var sm="";
      var sma="B";
      var letter="A";
      if (self.code.selected.ref>6) {
        letter="B";
        sma="A";
      }
      var date = new Date(self.newRes['DATE TO FLY']);
      var d = new Date(Date.now());
      var today = new Date(d.getFullYear(),d.getMonth(),d.getDate());
      var tomorrow = new Date(d.getFullYear(),d.getMonth(),d.getDate()+1);
      var hour = (d.getTime()-today.getTime())/3600000;
      var maxPax;
      var ref=self.code.selected.ref;
      self.$http.post(api + '/api/scheduledFlights/mobile',{date:self.newRes['DATE TO FLY']}).then(function(response) {
        var scheduledFlights=response.data;
        self.timeList=[];
        //iterate through list of available flights to see if full or still available
        for (var i=0;i<scheduledFlights.length;i++){
            //initiate the current smfltnum as sm
            sm=scheduledFlights[i].smfltnum+letter;
            sma=scheduledFlights[i].smfltnum+sma;
            if (scheduledFlights[i].smfltnum<10) sm="0"+sm;
            var resList=data.filter(function(res){
              return res.smfltnum.toUpperCase()===sm.toUpperCase();
            });
            var resListAlt = data.filter(function(res){
              return res.smfltnum.toUpperCase()===sma.toUpperCase();
            });
            //no more than 8 passengers on any smfltnum to avoid overbooking
            maxPax=8;
            if (scheduledFlights[i].smfltnum===9&&date.getDay()>0&&date.getDay()<6) {
              maxPax=8;
            }
            //keep them from being first pax on 8:00 flight
            var enough = (scheduledFlights[i].smfltnum-hour);
            if (enough<0) enough+=24;
            //8 am flight limitations
            if (scheduledFlights[i].smfltnum===8) maxPax=4;
            if (date>=today && date<=tomorrow && enough<13 && scheduledFlights[i].smfltnum===8) maxPax=0;
            
            if (resList.length<maxPax){
              if (date<today) {}
              else {
                enough = (scheduledFlights[i].smfltnum-hour);
                if (date>=today && date<tomorrow && enough<1) {}
                else {
                  //add a departure time to the array
                  var field = "begin";
                  if (ref<6&ref>3) field = 'sovFront';
                  if (ref<12&&ref>5) field = 'pgmKeb';
                  if (ref===12) field = 'sovBack';
                  var time = scheduledFlights[i][field];
                  self.timeList.push({time:time,smfltnum:sm});
                }
              }
            }
        }
        if (sfn){
          self.smfltnum.selected = self.timeList.filter(function ( tm ) {
            return tm.smfltnum === sfn;
          })[0];
        }
      });
    });
    
  };
});
