// According to John Papa style guide:
// Wrap Angular components in an Immediately Invoked Function Expression (IIFE).

(function(){
  'use strict';
  angular
    .module('app', [
      // Angular Modules
      'ngRoute',

      // Third Party Modules
      'firebase',

      // Custom Modules
      'app.landing',
      'app.waitList',
      'app.auth',
      'app.core'
      ])

})();