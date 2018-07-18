'use strict'

app.controller('ServerController', function ($http, $stateParams, $state, $scope) {

	let vm = this;

	// verifica se existe um token
	const jsonwebtoken = localStorage.getItem('jsonwebtoken');
	const userId = localStorage.getItem('userId');

	if (!jsonwebtoken || !userId) {
		$state.go('signin');
	}

	vm.servers = [];
	vm.providers = [];

	vm.server = {};
	vm.server.users = [];

	vm.serverfiles = [];

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
	vm.stateParams = $stateParams;

	// listar todos os servidores
	vm.ListAll = function () {
		$http({
			method: 'GET',
			url: '/api/v1/server',
			headers: {
				Authorization: jsonwebtoken
			}
		}).then(function (res) {
			res.data.forEach(function (v) {
				switch (v.instance_type) {
					case 'CM':
						v.instance_typeDescription = 'Comum';
						break;
					case 'DB':
						v.instance_typeDescription = 'Banco de Dados';
						break;
				}
			});
			vm.servers = res.data;
		});
	}

	// listar todos os arquivos do servidor
	vm.ListAllDocuments = function () {
		$http({
			method: 'GET',
			url: '/api/v1/file/byServerId/' + $stateParams._id,
			headers: {
				Authorization: jsonwebtoken
			}
		}).then(function (res) {
			vm.serverfiles = [];
			res.data.forEach(function (v) {
				v.fileurl = v.fileurl.substr(8);
				vm.serverfiles.push(v);
			});
		});
	}

	// caso estiver em um registro
	if ($stateParams._id) {
		vm.ListOne($stateParams._id);
		vm.ListAllDocuments();
	}


	// add usuário
	vm.AddUser = function (user) {
		vm.server.users.push(user);
	}

	// Grava o Formulário
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
				vm.ListOne($stateParams._id);
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
	vm.DeleteUser = function (user) {
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
				if (user._id) {
					let userIndex = vm.server.users.map(function (e) { return e._id }).indexOf(user._id);
					vm.server.users.splice(userIndex, 1);
					$scope.$apply();
				} else {
					let userIndex = vm.server.users.map(function (e) { return e.$$hashKey }).indexOf(user.$$hashKey);
					vm.server.users.splice(userIndex, 1);
					$scope.$apply();
				}
			}
		});
	}

	// remover um documento do servidor
	vm.RemoveServerDocument = function (idDocument) {
		swal({
			icon: 'info',
			title: 'Atenção',
			text: 'Deseja remover o registro?',
			buttons: {
				cancel: 'Não',
				confirm: 'Sim'
			},
		}).then(function (value) {
			$http({
				method: 'DELETE',
				url: '/api/v1/file/' + idDocument,
				headers: {
					Authorization: jsonwebtoken
				}
			}).then(function (res) {
				console.log(res.data)
				vm.ListAllDocuments();
			});
		});
	}

	$('#file_upload').change(function () {
		let file = $(this)[0].files[0];
		let reader = new FileReader();
		let filename = file.name.split(' ').join('-');

		reader.onload = function (fl) {
			let base64 = fl.target.result.split(';')[1].split(',')[1];

			$http({
				method: 'POST',
				url: '/api/v1/file',
				headers: {
					Authorization: jsonwebtoken
				},
				data: {
					_serverid: vm.server._id,
					filename: filename,
					base64: base64
				}
			}).then(function () {
				vm.ListAllDocuments();
			});
		}

		reader.readAsDataURL(file);
	});

})