'use strict';

myApp.controller("EmployeelistCtrl",['$scope', function ($scope) {
    console.log("Reached Employee List")
    $scope.options = [
        { id: 'IS7064', name: 'Nermal kumar', du: 'SDU', desig: 'Programmer trainee', access: 'Internet, Share' },
        { id: 'IS7066', name: 'Harish kumar', du: 'SDU', desig: 'Programmer trainee', access: 'Internet, Share, Mail' },
        { id: 'IS7068', name: 'Saran', du: 'SDU', desig: 'Programmer trainee', access: 'Internet, Share, Remote' },
    ];
    }]);




