'use strict';


myApp.controller("DashboardCtrl", ['$scope','AdminService','$cookies', function ($scope, AdminService,$cookies) {
    console.log('Dashboard reached')

    //user request

    $scope.chartData = {
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        series: ['Granted', 'Request', 'Rejected'],
        data: [
            [65, 59, 80, 81, 56, 55, 40],
            [28, 48, 40, 19, 86, 27, 90],
            [42, 17, 28, 73, 50, 12, 68]
        ]
    };

    $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
    $scope.series = ['Requested', 'Granted'];
    $scope.data = [
        [300, 500, 800, 600, 500, 200, 800],
        [400, 600, 900, 700, 600, 300, 900]
    ];

    // doesn't work 
    $scope.colours = [{
        fillColor: "rgba(128,0,128,1)",
        strokeColor: "rgba(151,187,205,1)",
        pointColor: "rgba(151,187,205,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(151,187,205,0.8)"
    }];

    $scope.onClick = function (points, evt) {
        console.log(points, evt);
    };

    var RoleId = $cookies.get('RoleId');
    console.log("cookies" + RoleId)

    $scope.GetStudents = function () {
        console.log('dashboardservice');
        var id = 2;
        var apiRoute = 'Api/Admindata/GetDashBoard/';
        var access = AdminService.getAll(apiRoute);
        access.then(function (response) {
            $scope.accesses = response.data;
            $scope.calculate = response.data.length;
            console.log("output" + JSON.stringify($scope.accesses));
        }, function (error) {
            console.log('error')
            console.log("Error: " + JSON.stringify(error));
        });
    }
    $scope.GetStudents();
}]);




