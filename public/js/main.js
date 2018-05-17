'use strict'

const app = angular.module('MyApp', ['ui.router'])

app.value('APIHOST', window.location.protocol + '//' + window.location.host )

app.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/signin')

  $stateProvider

  .state('signup', {
    url: '/signup',
    templateUrl: '../partials/signup.html',
    controller: 'UserController',
    controllerAs: 'vm'
  })

  .state('signin', {
    url: '/signin',
    templateUrl: '../partials/signin.html',
    controller: 'UserController',
    controllerAs: 'vm'
  })

  .state('menu', {
    templateUrl: '../partials/menu.html',
    controller: 'UserController',
    controllerAs: 'vm'
  })

  .state('menu.home', {
    url: '/home',
    templateUrl: '../partials/home.html'
  })

  .state('menu.cnsServer', {
    url: '/servers',
    templateUrl: '../partials/servers.html',
    controller: 'ServerController',
    controllerAs: 'vm'
  })
  

  .state('menu.frmServer', {
    url: '/server',
    templateUrl: '../partials/server.html',
    controller: 'ServerController',
    controllerAs: 'vm'
  })

  .state('menu.frmServerEdit', {
    url: '/server/:_id',
    templateUrl: '../partials/server.html',
    controller: 'ServerController',
    controllerAs: 'vm'
  })




})
