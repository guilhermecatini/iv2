'use strict'

app.controller('EntidadeController', function ($http, $state, $stateParams) {

    let vm = this
    vm.entidade = {}


    if ($stateParams._id != '' && $stateParams._id != undefined) {
        $http({
            method: 'GET',
            url: '/api/v1/entidade/' + $stateParams._id
        }).then(function (response) {
            vm.entidade = response.data
            vm.data_cadastro = new Date(vm.entidade.data_cadastro).toLocaleDateString('pt-BR')
            vm.data_cadastro += ' ' + new Date(vm.entidade.data_cadastro).toLocaleTimeString('pt-BR')
        })
    }

    vm.Gravar = function () {
        if(vm.entidade._id) {
            $http({
                method: 'PUT',
                url: '/api/v1/entidade/' + vm.entidade._id,
                data: vm.entidade
            }).then(function (response) {
                swal('Sucesso', 'Registro Salvo', 'success')
            })
        } else {
            $http({
                method: 'POST',
                url: '/api/v1/entidade',
                data: vm.entidade
            }).then(function (response) {
                swal('Sucesso', 'Registro Salvo', 'success')
                $state.go('menu.frm-entidade', {_id: response.data._id})
            })
        }
    }

    vm.Listar = function() {
        $http({
            method: 'GET',
            url: '/api/v1/entidade'
        }).then(function (response) {
            vm.entidades = response.data
        })
    }

    vm.BuscarCEP = function(cep) {
        $http({
            method: 'GET',
            url: 'https://viacep.com.br/ws/'+cep+'/json/'
        }).then(function(response){
            vm.endereco = response.data
        })
    }

    vm.GravarEndereco = function() {
        $http({
            method: 'POST',
            url: '/api/v1/entidade/' + vm.entidade._id + '/endereco',
            data: vm.endereco
        }).then(function (response) {
            console.log(response.data)
            swal('Sucesso', 'Registro Salvo', 'success')
        })
    }


})