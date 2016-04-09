(function(){
  'use strict'

  angular
    .module('app.waitList')
    .controller('WaitListController', WaitListController);

    // Here we are adding a dependency to our WaitListController
    // This is the firebase dependency
    // The way we add it by using $inject
    // Inject requires an array of dependencies

    WaitListController.$inject = ['$firebaseArray'];


    // below we can use 'whatever' instead of $firebasearray because it is positional
    function WaitListController($firebaseArray){
      // view model
      var vm = this;
      
      var fireParties = new Firebase('https://ng-partyoftwo.firebaseio.com/parties');
      var fireTextMessages = new Firebase('https://ng-partyoftwo.firebaseio.com/textmessages');

      function Party(){
        this.name = '',
        this.phone = '',
        this.size = '',
        this.done = false,
        this.notified = false
      }

      // controller method definitions
      vm.newParty = new Party();
      vm.parties = $firebaseArray(fireParties);
      vm.addParty = addParty;
      vm.removeParty = removeParty;
      vm.sendTextMessage = sendTextMessage;
      vm.toggleDone = toggleDone;

      // controller methods
      function addParty(){
        vm.parties.$add(vm.newParty)
        vm.newParty = new Party();

      };

      function removeParty(party){
        vm.parties.$remove(party);
      };

      function toggleDone(party){
        vm.parties.$save(party);
      };

      function sendTextMessage(party){
        var newTextMessage = {
          phoneNumber: party.phone,
          size: party.size,
          name: party.name
        }

        fireTextMessages.push(newTextMessage);
        party.notified = true;
        vm.parties.$save(party);
      };

    }


})();