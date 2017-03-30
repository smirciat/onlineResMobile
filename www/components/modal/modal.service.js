'use strict';

angular.module('workspaceApp')
 .factory('Modal', function ($rootScope, $uibModal) {
    /**
     * Opens a modal
     * @param  {Object} scope      - an object to be merged with modal's scope
     * @param  {String} modalClass - (optional) class(es) to be applied to the modal
     * @return {Object}            - the instance $uibModal.open() returns
     */
    function openModal(scope, modalClass) {
      var modalScope = $rootScope.$new();

      angular.extend(modalScope, scope);

      return $uibModal.open({
        templateUrl: 'components/modal/modal.html',
        windowClass: modalClass,
        scope: modalScope
      });
    }

    // Public API here
    return {

      /* Confirmation modals */
      confirm: {

        /**
         * Create a function to open a delete confirmation modal (ex. ng-click='myModalFn(name, arg1, arg2...)')
         * @param  {Function} del - callback, ran when delete is confirmed
         * @return {Function}     - the function to open the modal (ex. myModalFn)
         */
        check(del) {
          /**
           * Open a delete confirmation modal
           * @param  {String} name   - name or info to show on modal
           * @param  {All}           - any additional args are passed straight to del callback
           */
          return function() {
            var args = Array.prototype.slice.call(arguments);
            var name = args.shift();
            var reservation = args.shift();
            var theModal;

            theModal = openModal({
              modal: {
                dismissable: true,
                title: 'Confirm ' + name,
                html: '<p>Are you sure you want to <strong>' + name + '</strong> your reservation?</p><p>' + reservation + '</p>',
                buttons: [{
                  classes: 'btn-danger',
                  text: name,
                  click: function(e) {
                    theModal.close(e);
                  }
                }, {
                  classes: 'btn-default',
                  text: 'Cancel',
                  click: function(e) {
                    theModal.dismiss(e);
                  }
                }]
              }
            }, 'modal-danger');

            theModal.result.then(function(event) {
              del.apply(event, args);
            });
          };
        },
        enterData: function(cb) { //my new modal
          cb = cb || angular.noop;
          return function() {
            var args = Array.prototype.slice.call(arguments),
                name = args.shift(),
                formData = {},
                theModal;
            theModal = openModal({ //openModal is a function the modal service defines.  It is just a wrapper for $uibModal
              modal: {
                formData:formData,
                dismissable: true,
                title: 'Enter Required Information',
                html: '<p>' + name + '</p>', //set the modal message here, name is the parameter we passed in
                buttons: [ {//this is where you define you buttons and their appearances
                  classes: 'btn-primary',
                  text: 'Confirm',
                  click: function(event) {
                    theModal.close(event);
                  }
                },]
              }
            }, 'modal-success');
            theModal.result.then(function(event) {
              cb.apply(event, [formData]); //this is where all callback is actually called
            });
          };
        },
        quickMessage(del) {
          /**
           * Open a delete confirmation modal
           * @param  {String} name   - name or info to show on modal
           * @param  {All}           - any additional args are passed straight to del callback
           */
          var del=del||angular.noop;
          return function() {
            var args = Array.prototype.slice.call(arguments),
                name = args.shift(),
                quickModal;

            quickModal = openModal({
              modal: {
                dismissable: true,
                title: 'Important Message',
                html: '<p> <strong>' + name + '</strong> </p>',
                buttons: [ {
                  classes: 'btn-success',
                  text: 'OK',
                  click: function(event) {
                    quickModal.close(event);
                  }
                }]
              }
            }, 'modal-success');

            quickModal.result.then(function(event) {
              del.apply(event, args);
            });
          };
        } ,
        choice(del) {
          /**
           * Open a delete confirmation modal
           * @param  {String} name   - name or info to show on modal
           * @param  {All}           - any additional args are passed straight to del callback
           */
          return function() {
            var args = Array.prototype.slice.call(arguments),
                name = args.shift(),
                quickModal;

            quickModal = openModal({
              modal: {
                dismissable: true,
                title: 'Important Message',
                html: '<p> <strong>' + name + '</strong> </p>',
                buttons: [ {//this is where you define you buttons and their appearances
                  classes: 'btn-info',
                  text: 'OK',
                  click: function(event) {
                    quickModal.dismiss(event);
                  }
                },
                {
                  classes: 'btn-success',
                  text: 'Inspect',
                  click: function(event) {
                    quickModal.close(event);
                  }
                }]
              }
            }, 'modal-success');

            quickModal.result.then(function(event) {
              del.apply(event, args);
            });
          };
        }      
        
      }
    };
  });
