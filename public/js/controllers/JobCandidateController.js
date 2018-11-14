'use strict'

app.controller('JobCandidateController', function ($http, $state, APIHOST, $scope) {

    let vm = this

    vm.JobCandidate = {};

    vm.Create = function () {
        console.log(vm.JobCandidate);
    }

    $('#curriculum').change(function () {
        let file = $('input[type=file]')[0].files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            vm.JobCandidate.curriculum = reader.result.split(',')[1];
            $scope.$apply();
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    })



});