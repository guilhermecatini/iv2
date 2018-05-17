'use strict'

app.controller('ServerController', function ($http, $stateParams, $state) {

	let vm = this;

	vm.servers = [];

	vm.server = {};


	if ($stateParams._id) {
		$http({
			method: 'GET',
			url: '/api/v1/server/' + $stateParams._id
		}).then(function (res) {
			vm.server = res.data;
		});
	}

	vm.ListAll = function () {
		$http({
			method: 'GET',
			url: '/api/v1/server'
		}).then(function (res) {
			vm.servers = res.data;
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
				data: vm.server
			}).then(function (res) {
				swal('Sucesso', 'Registro salvo.', 'success');
			});
		} else {
			$http({
				method: 'POST',
				url: '/api/v1/server',
				data: vm.server
			}).then(function (res) {
				swal('Sucesso', 'Registro salvo.', 'success');
				$state.go('menu.frmServerEdit', { _id: res.data._id })
			});
		}
	}

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
					url: '/api/v1/server/' + vm.server._id
				}).then(function (res) {
					if (res.data.n > 0) {
						swal('Sucesso', 'Registro removido.', 'success');
						$state.go('menu.cnsServer');
					}
				});
			}
		});
	}

})