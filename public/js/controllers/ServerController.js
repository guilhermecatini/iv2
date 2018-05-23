'use strict'

app.controller('ServerController', function ($http, $stateParams, $state) {

	let vm = this;

	// verifica se existe um token
	const jsonwebtoken = localStorage.getItem('jsonwebtoken');
	if (!jsonwebtoken) {
		$state.go('signin');
	}

	vm.servers = [];
	vm.providers = [];

	vm.server = {};

	// getProviders
	$http({
		method: 'GET',
		url: '/api/v1/provider',
		headers: {
			Authorization: jsonwebtoken
		}
	}).then(function (res) {
		vm.providers = res.data;
	});

	vm.ListOne = function (_id) {
		$http({
			method: 'GET',
			url: '/api/v1/server/' + _id,
			headers: {
				Authorization: jsonwebtoken
			}
		}).then(function (res) {
			vm.server = res.data;
		});
	}
	if ($stateParams._id) {
		vm.ListOne($stateParams._id);
	}

	// listar todos os servidores
	vm.ListAll = function () {
		$http({
			method: 'GET',
			url: '/api/v1/server',
			headers: {
				Authorization: jsonwebtoken
			}
		}).then(function (res) {
			vm.servers = res.data;
		});
	}

	// add usuário
	vm.AddUser = function (user) {
		$http({
			method: 'POST',
			url: '/api/v1/server/' + $stateParams._id + '/user',
			data: user,
			headers: {
				Authorization: jsonwebtoken
			}
		}).then(function (res) {
			vm.servers = res.data;
			vm.ListOne($stateParams._id);
		});
	}

	vm.Open = function (data) {
		console.log(data);
	}

	vm.Save = function () {
		if ($stateParams._id) {
			$http({
				method: 'PUT',
				url: '/api/v1/server',
				data: vm.server,
				headers: {
					Authorization: jsonwebtoken
				}
			}).then(function (res) {
				swal('Sucesso', 'Registro salvo.', 'success');
			});
		} else {
			$http({
				method: 'POST',
				url: '/api/v1/server',
				data: vm.server,
				headers: {
					Authorization: jsonwebtoken
				}
			}).then(function (res) {
				swal('Sucesso', 'Registro salvo.', 'success');
				$state.go('menu.frmServerEdit', { _id: res.data._id })
			});
		}
	}

	// remover um servidor
	vm.Delete = function () {

		swal({
			icon: 'info',
			title: 'Atenção',
			text: 'Deseja remover o registro?',
			buttons: {
				cancel: 'Não',
				confirm: 'Sim'
			},
		}).then(function (value) {
			if (value == true) {
				$http({
					method: 'DELETE',
					url: '/api/v1/server/' + vm.server._id,
					headers: {
						Authorization: jsonwebtoken
					}
				}).then(function (res) {
					if (res.data.n > 0) {
						swal('Sucesso', 'Registro removido.', 'success');
						$state.go('menu.cnsServer');
					}
				});
			}
		});
	}

	// remover um usuário do servidor
	vm.DeleteUser = function (idUser) {

		swal({
			icon: 'info',
			title: 'Atenção',
			text: 'Deseja remover o registro?',
			buttons: {
				cancel: 'Não',
				confirm: 'Sim'
			},
		}).then(function (value) {
			if (value == true) {
				$http({
					method: 'DELETE',
					url: '/api/v1/server/' + vm.server._id + '/user/' + idUser,
					headers: {
						Authorization: jsonwebtoken
					}
				}).then(function (res) {
					vm.ListOne($stateParams._id);
				});
			}
		});
	}
})