(function(){
  'use strict'

  angular
    .module('app.auth')
    .controller('AuthController', AuthController);

    AuthController.$inject = ['$location', '$firebaseAuth'];


    function AuthController($location, $firebaseAuth){
      // recommendation from Angular Style Guide - John Papa
      var vm = this;
      var firebaseReference = new Firebase('https://ng-partyoftwo.firebaseio.com/textmessages');
      var firebaseAuthObject = $firebaseAuth(firebaseReference);
      
      vm.user = {
        email: '',
        password: ''
      };
      vm.register = register;
      vm.login = login;
      vm.logout = logout;

      function register(user){
        return firebaseAuthObject.$createUser(user)
        .then(function(){
          vm.login(user);
        })
        .catch(function(error){
          console.log(error);
        });
        // returns a promise
        // 1- Success: Firebase creates the new user
        // Run a success function

        // 2- Error: Firebase cant create a user because username already exists
        // Run error function
      };

      function login(user){
        return firebaseAuthObject.$authWithPassword(user)
        .then(function(loggedInUser){
          console.log(loggedInUser);
          $location.path('/waitlist');
        })
        .catch(function(error){
          console.log(error);
        });
      }

      function logout(){
          console.log('Logging Out');
          firebaseAuthObject.$unauth();
          $location.path('/');

      }
    }



})();