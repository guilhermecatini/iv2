'use strict'

app.controller('ProviderController', function ($http, $state, APIHOST) {

	let vm = this

	// verifica se existe um token
	const jsonwebtoken = localStorage.getItem('jsonwebtoken');
	if (!jsonwebtoken) {
		$state.go('signin');
	}

	vm.providers = [];

	// listar todos os provedores
	vm.ListAll = function () {
		$http({
			method: 'GET',
			url: '/api/v1/provider',
			headers: {
				Authorization: jsonwebtoken
			}
		}).then(function (res) {
			vm.providers = res.data;
		})
	}
	vm.ListAll();

	// gravar um novo
	vm.Create = function (name) {
		$http({
			method: 'POST',
			url: '/api/v1/provider',
			headers: {
				Authorization: jsonwebtoken
			},
			data: {
				name: name
			}
		}).then(function (res) {
			vm.ListAll();
		})
	}

	// atualizar um registro
	vm.Update = function (provider) {
		$http({
			method: 'PUT',
			url: '/api/v1/provider',
			headers: {
				Authorization: jsonwebtoken
			},
			data: provider
		}).then(function (res) {
			vm.ListAll();
		})
	}

	// remover um registro
	vm.Delete = function (id) {
		swal({
			icon: 'info',
			title: 'Atenção',
			text: 'Deseja remover o registro?',
			buttons: {
				cancel: 'Não',
				confirm: 'Sim'
			},
		}).then(function (value) {
			if (value === true) {
				$http({
					method: 'DELETE',
					url: '/api/v1/provider/' + id,
					headers: {
						Authorization: jsonwebtoken
					},
					data: {
						name: name
					}
				}).then(function (res) {
					vm.ListAll();
				})
			}
		})
	}


});