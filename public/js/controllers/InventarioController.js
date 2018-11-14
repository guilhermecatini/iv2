'use strict'

app.controller('InventarioController', function ($http, $stateParams, APIHOST, $scope) {

    let vm = this;

    vm.Inventarios = [];

    // verifica se existe um token
    const jsonwebtoken = localStorage.getItem('jsonwebtoken');
    const userId = localStorage.getItem('userId');

    if (!jsonwebtoken || !userId) {
        $state.go('signin');
    }

    vm.TIPOS_EQUIPAMENTO = [
        { id: 'Notebook', nome: 'Notebook' },
        { id: 'Celular', nome: 'Celular' },
        { id: 'Roteador', nome: 'Roteador' },
        { id: 'Antena Wireless', nome: 'Antena Wireless' },
        { id: 'Eletrodoméstico', nome: 'Eletrodoméstico' },
        { id: 'Servidor', nome: 'Servidor' },
        { id: 'Monitor', nome: 'Monitor' },
        { id: 'Móveis', nome: 'Móveis' },
        { id: 'Ar Condicionado', nome: 'Ar Condicionado' },
        { id: 'Telefone', nome: 'Telefone' },
        { id: 'Impressora', nome: 'Impressora' }
    ];

    vm.MARCAS = [
        { id: 'Epson', nome: 'Epson' },
        { id: 'Lenovo', nome: 'Lenovo' },
        { id: 'Asus', nome: 'Asus' },
        { id: 'Dell', nome: 'Dell' },
        { id: 'Toshiba', nome: 'Toshiba' },
        { id: 'Ubiquiti', nome: 'Ubiquiti' },
        { id: 'TP-Link', nome: 'TP-Link' },
        { id: 'Eletrolux', nome: 'Eletrolux' },
        { id: 'Consul', nome: 'Consul' },
        { id: 'AOC', nome: 'AOC' },
        { id: 'Samsung', nome: 'Samsung' },
        { id: 'FlexForm', nome: 'FlexForm' },
        { id: 'Intelbras', nome: 'Intelbras' },
        { id: 'HP', nome: 'HP' },
        { id: 'Arno', nome: 'Arno' },
        { id: 'BenQ', nome: 'BenQ' },
        { id: 'Elgin', nome: 'Elgin' },
        { id: 'Genérico', nome: 'Genérico' }
    ];

    vm.USUARIOS_FLUIG = [];

    

    $http({
        method: 'GET',
        url: '/fluig/ECMColleagueService/getColleagues',
        headers: {
            Authorization: jsonwebtoken
        }
    }).then(function (res) {
        vm.USUARIOS_FLUIG = res.data;
    });

    /**
     * Gravar
     */
    vm.Save = function () {
        if ($stateParams._id) {
            $http({
                method: 'PUT',
                url: '/inventario',
                data: vm.Inventario,
                headers: {
                    Authorization: jsonwebtoken
                }
            }).then(function (res) {
                console.log(res.data)
                swal('Sucesso', 'Registro salvo.', 'success');
                vm.ListOne($stateParams._id);
            });
        } else {
            $http({
                method: 'POST',
                url: '/inventario',
                data: vm.Inventario,
                headers: {
                    Authorization: jsonwebtoken
                }
            }).then(function (res) {
                swal('Sucesso', 'Registro salvo.', 'success');
                $state.go('menu.frmInventarioEdit', { _id: res.data._id })
            });
        }
    }

    /**
     * Listar
     */
    vm.ListAll = function () {
        $http({
            method: 'GET',
            url: '/inventario',
            headers: {
                Authorization: jsonwebtoken
            }
        }).then(function (res) {
            vm.Inventarios = res.data;
        })
    }

    /**
     * Listar um
     */
    vm.ListOne = function (_id) {
        $http({
            method: 'GET',
            url: '/inventario/' + _id,
            headers: {
                Authorization: jsonwebtoken
            }
        }).then(function (res) {
            vm.Inventario = res.data;
        });
    }

    if ($stateParams._id) {
        vm.ListOne($stateParams._id);
    }

});