myApp.controller("Cancelctrl", ["$scope", 'EmployeeService', function ($scope, EmployeeService) {

    console.log("Finally reached");
    $scope.layout = "we're here on the profile";
    $scope.requests = [];

    /* $scope.GetStudents = function () {
         var id = 2;
         var apiRoute = '/api/Employeedata/GetAccessID';
         var access = EmployeeService.getbyID(apiRoute, id);
         access.then(function (response) {
             $scope.accesses = response.data;
             console.log("output" + JSON.stringify($scope.accesses));
         }, function (error) {
             console.log("Error: " + JSON.stringify(error));
         });
     }
     $scope.GetStudents();*/

    //console.log("aahan"+$scope.accesses.length)


}]);