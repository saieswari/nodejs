myApp.controller("Layoutctrl", ["$scope", 'EmployeeService', '$interval', function ($scope, EmployeeService, $interval) {

    console.log("Finally reached");
    $scope.layout = "we're here on the layout";
    //$scope.count;
    var count = 1;
    var id = 2;
    var apiRoute = '/api/Employeedata/GetResponse';
    var access = EmployeeService.getbyID(apiRoute, id);
    access.then(function (response) {
        $scope.responses = response.data;
        for (var i = 0; i < response.data.length; i++) {
            if (response.data[i].Readtype == false) {
                $scope.displayMsg = count++;
                console.log("number of false" + count)
            }
        }

        $scope.number = response.data.length;

    }, function (error) {
        console.log("Error: " + JSON.stringify(error));
    });

    var auto = $interval(function () {
        var id = 2;
        count = 1;
        var apiRoute = '/api/Employeedata/GetResponse';
        var access = EmployeeService.getbyID(apiRoute, id);
        access.then(function (response) {
            $scope.responses = response.data;
            for (var i = 0; i < response.data.length; i++) {
                if (response.data[i].Readtype == false) {
                    $scope.displayMsg = count++;
                    console.log("number of false" + count)
                }
                else {
                    $scope.displayMsg = 0;
                }
            }
            $scope.number = response.data.length;

        }, function (error) {
            console.log("Error: " + JSON.stringify(error));
        });

        //count++;
    }, 9000);

    $scope.clear = function () {
        $scope.displayMsg = 0;
        var apiRoute = "api/Employeedata/UpdateResponse/";
        var param = {
            Senderid: 2,
            Readtype: true
        }
        var changed = EmployeeService.put(apiRoute, param);
        changed.then(function (response) {
            $scope.requests = response.data;
            console.log("saved data" + JSON.stringify(response.data));

        }, function (error) {
            console.log("Error: " + JSON.stringify(error));
        });
    }

        ;


}]);