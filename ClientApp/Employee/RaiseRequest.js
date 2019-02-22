myApp.controller("Requestctrl", ["$scope", 'EmployeeService', '$state', '$mdDialog', function ($scope, EmployeeService, $state, $mdDialog) {

    $scope.class = "form-group has-success"

    $scope.reason = undefined;
    $scope.active = false;


    $scope.value1 = true;
    $scope.AccessID = 1;
    $scope.Empid = 2;
    $scope.i = 0;
    $scope.date = new Date();
    console.log("Date" + $scope.date)
    console.log("Finally reached");
    $scope.layout = "we're here on the request";
    $scope.GetAccesses = function () {
        var id = 2;
        var apiRoute = '/api/Employeedata/GetAllAccess';
        var access = EmployeeService.getAll(apiRoute);
        access.then(function (response) {
            $scope.accesses = response.data;
            console.log("access" + JSON.stringify($scope.accesses))
        }, function (error) {
            console.log("Error: " + JSON.stringify(error));
        });
    }
    $scope.GetAccesses();
    $scope.GetRequests = function () {
        var id = 2;
        var apiRoute = '/api/Employeedata/GetRequest';
        var access = EmployeeService.getbyID(apiRoute, $scope.Empid);
        access.then(function (response) {
            $scope.requests = response.data;
            console.log("requests" + JSON.stringify(response.data))
        }, function (error) {
            console.log("Error: " + JSON.stringify(error));
        });

    }
    $scope.GetRequests();

    $scope.submit = function () {
        var apiRoute = '/api/Employeedata/PostRequest';

        var param = {
            Empid: $scope.Empid,
            Accessid: $scope.Id,
            Reason: $scope.reason,
            Requesteddate: $scope.date,

        };
        var access = EmployeeService.post(apiRoute, param);
        access.then(function (response) {
            $scope.accesses = response.data;
            console.log("output of request" + JSON.stringify(response.data))
            $mdDialog.show(
                $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Success!')
                    .textContent('Your Request have sent successfully')
                    .ariaLabel('Submit request')
                    .ok('ok')

            );


            $state.reload();
        }, function (error) {
            console.log("Error: " + JSON.stringify(error));
        });
    }

}]);


