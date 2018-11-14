'use strict'

const app = angular.module('MyApp', ['ui.router', 'angular-loading-bar']);

app.value('APIHOST', window.location.protocol + '//' + window.location.host);

// configurações de rotas
app.config(function ($stateProvider, $urlRouterProvider) {


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

		.state('menu.frmProviders', {
			url: '/provider',
			templateUrl: '../partials/providers.html',
			controller: 'ProviderController',
			controllerAs: 'vm'
		})

		.state('menu.frmAccount', {
			url: '/account',
			templateUrl: '../partials/account.html',
			controller: 'AccountController',
			controllerAs: 'vm'
		})

		.state('menu.frmAccountPassword', {
			url: '/account/password',
			templateUrl: '../partials/alter-password.html',
			controller: 'AccountController',
			controllerAs: 'vm'
		})

		.state('menu.frmJobCandidate', {
			url: '/job-candidate/new',
			templateUrl: '../partials/frm-job-candidate.html',
			controller: 'JobCandidateController',
			controllerAs: 'vm'
		})

		.state('menu.cnsInventario', {
			url: '/inventarios',
			templateUrl: '../partials/cns-inventario.html',
			controller: 'InventarioController',
			controllerAs: 'vm'
		})

		.state('menu.frmInventario', {
			url: '/inventario',
			templateUrl: '../partials/frm-inventario.html',
			controller: 'InventarioController',
			controllerAs: 'vm'
		})

		.state('menu.frmInventarioEdit', {
			url: '/inventario/:_id',
			templateUrl: '../partials/frm-inventario.html',
			controller: 'InventarioController',
			controllerAs: 'vm'
		})
		

		$urlRouterProvider.otherwise('/signin')

});

// configuração da barra de latência
app.config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
	cfpLoadingBarProvider.latencyThreshold = 200;
	cfpLoadingBarProvider.includeBar = true;
	cfpLoadingBarProvider.includeSpinner = true;
}]);