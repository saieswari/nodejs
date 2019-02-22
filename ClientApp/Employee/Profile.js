myApp.controller("ProfileCtrl", ["$scope", 'EmployeeService', function ($scope, EmployeeService) {
    $scope.title = "Profile"
    console.log("hit")
    $scope.testing = "hell01";
    console.log("testing succee")
    console.log("Finally reached");
    $scope.layout = "we're here on the profile";
    $scope.check1 = function (value) {
        var regex = '/^\w{2}\d{4}$/';
        var result = regex.test(value);
        if (result == false) {
            $scope.msg = "invalid Employee Code";
        }
        else {
            $scope.msg = "";
        }
    }

    $scope.GetStudents = function () {
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
    $scope.GetStudents();

    //console.log("aahan"+$scope.accesses.length)


}]);