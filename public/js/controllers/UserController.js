'use strict'

app.controller('UserController', function ($http, $state, APIHOST) {

	let vm = this

	vm.year = new Date().getUTCFullYear();

	// verifica se existe um token
	const jsonwebtoken = localStorage.getItem('jsonwebtoken');
	const userId = localStorage.getItem('userId');

	if (!jsonwebtoken || !userId) {
		$state.go('signin');
	}

	vm.User = {}

	vm.SignUp = function () {
		$http({
			method: 'POST',
			url: APIHOST + '/api/v1/user',
			data: vm.User
		}).then(function (data) {
			swal('OK', 'Sua conta foi criada', 'success');
			vm.User = {};
			$state.go('signin');
		});
	}

	vm.SignIn = function () {
		$http({
			method: 'POST',
			url: APIHOST + '/api/v1/login',
			data: vm.User
		}).then(function (res) {
			if (res.data.error == true) {
				swal('Ooops', 'Your username or password is invalid', 'warning')
				vm.User.password = ''
			} else {
				localStorage.setItem('jsonwebtoken', res.data.token);
				localStorage.setItem('userId', res.data.userId);
				swal({
					title: 'Sucesso',
					text: 'Você será redirecionado',
					icon: 'success',
					timer: 2000,
					showConfirmButton: false
				}).then(function (result) {
					swal.close()
					$state.go('menu.cnsServer');
				});
			}
		}, function (err) {
			swal('Error', 'Contact App Administrator', 'error')
			console.log(err.data.errmsg)
		})
	}

	vm.SignOut = function () {
		localStorage.clear()
		swal({
			title: 'Saindo...',
			text: 'Você será redirecionado',
			icon: 'success',
			timer: 2000,
			showConfirmButton: false
		}).then(function (result) {
			swal.close()
			$state.go('signin')
		})
	}

})