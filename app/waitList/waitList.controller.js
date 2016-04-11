(function(){
  'use strict'

  angular
    .module('app.waitList')
    .controller('WaitListController', WaitListController);

    // Here we are adding a dependency to our WaitListController
    // This is the firebase dependency
    // The way we add it by using $inject
    // Inject requires an array of dependencies

    WaitListController.$inject = ['firebaseDataService', 'partyService'];


    // below we can use 'whatever' instead of $firebasearray because it is positional
    function WaitListController(firebaseDataService, partyService){
      // view model
      var vm = this;
      
      // controller method definitions
      vm.newParty = new partyService.Party();
      vm.parties = partyService.parties;
      vm.addParty = addParty;
      vm.removeParty = removeParty;
      vm.sendTextMessage = sendTextMessage;
      vm.toggleDone = toggleDone;

      // controller methods
      function addParty(){
        vm.parties.$add(vm.newParty)
        vm.newParty = new partyService.Party();

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

        firebaseDataService.textMessages.push(newTextMessage);
        party.notified = true;
        vm.parties.$save(party);
      };

    }


})();