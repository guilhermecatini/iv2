'use strict'

app.controller('AccountController', function ($http, $state, APIHOST) {

	let vm = this

	// verifica se existe um token
	const jsonwebtoken = localStorage.getItem('jsonwebtoken');
	const userId = localStorage.getItem('userId');

	if (!jsonwebtoken || !userId) {
		$state.go('signin');
	}

	vm.ListOne = function () {
		$http({
			method: 'GET',
			url: '/api/v1/user/' + userId,
			headers: {
				Authorization: jsonwebtoken
			}
		}).then(function (res) {
			vm.User = res.data;
		});
	}
	vm.ListOne();


	// Gerar Código de Barras
	vm.Get2Fa = function () {
		$http({
			method: 'POST',
			url: '/api/v1/2fa',
			headers: {
				Authorization: jsonwebtoken
			},
			data: {
				name: vm.User.name.split(' ')[0] + ' ' + vm.User.name.split(' ')[1]
			}
		}).then(function (res) {
			vm.QRCODE = res.data.qrcode;
			vm.secret = res.data.secret;
		});
	}

	vm.ValidarToken = function () {
		$http({
			method: 'POST',
			url: '/api/v1/2fa/validate',
			headers: {
				Authorization: jsonwebtoken
			},
			data: {
				secret: vm.secret,
				token: vm.verifyToken
			}
		}).then(function (res) {
			if (res.data.isValid === true) {
				vm.User.secret_google_auth = vm.secret;
				vm.User.two_fact_auth = true;
				$http({
					method: 'PUT',
					url: '/api/v1/2fa/updateUser',
					headers: {
						Authorization: jsonwebtoken
					},
					data: vm.User
				}).then(function (res2) {
					vm.QRCODE = null;
					localStorage.clear();
					$state.go('signin');
				});
			} else {
				// CANCELAR TODAS AS ALTERACOES
			}
		});
	}

	// alterar senha
	vm.AlterPassword = function(passwd) {
		$http.put('/api/v1/user/alterPassword/' + userId, passwd)
		.then(function (r) {
			if (r.data.error) {
				swal('Erro', 'A senha atual não confere', 'error');
			} else {
				swal('Sucesso', 'Senha alterada', 'success');
				vm.QRCODE = null;
				localStorage.clear();
				$state.go('signin');
			}
		});
	}


});