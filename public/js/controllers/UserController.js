'use strict'

app.controller('UserController', function($http, $state, APIHOST){

  let vm = this

  if (localStorage.getItem('jsonwebtoken') == null) {
    $state.go('menu.signin')
  }

  vm.User = {}

  vm.SignUp = function() {
    $http({
      method: 'POST',
      url: APIHOST + '/api/v1/user/create',
      data: vm.User
    }).then(function(data){
      swal('Congratulations!', 'Your account has created!', 'success')
      vm.User = {}
      $state.go('signin')
    }, function(err){
      swal('Error', 'Contact App Administrator', 'error')
      console.log(err.data.errmsg)
    })
  }

  vm.SignIn = function() {
    $http({
      method: 'POST',
      url: APIHOST + '/api/v1/user/login',
      data: vm.User
    }).then(function(res){
      if (res.data.error == true) {
        swal('Ooops', 'Your username or password is invalid', 'warning')
        vm.User.password = ''
      } else {
        localStorage.setItem('jsonwebtoken', res.data.token);
        swal({
          title: 'Yes!',
          text: 'You logged in!',
          type: 'success',
          timer: 2000,
          showConfirmButton: false
        }).then(function(result){
          swal.close()
          $state.go('menu.cnsServer');
        });
      }
    }, function(err){
      swal('Error', 'Contact App Administrator', 'error')
      console.log(err.data.errmsg)
    })
  }

  vm.SignOut = function() {
    localStorage.clear()
    swal({
      title: 'Bye!',
      text: 'You logged out!',
      type: 'success',
      timer: 2000,
      showConfirmButton: false
    }).then(function(result){
      swal.close() 
      $state.go('signin')
    })
  }

})