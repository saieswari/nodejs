myApp.controller("Passwordctrl", ["$scope", 'EmployeeService', '$mdDialog', function ($scope, EmployeeService, $mdDialog) {
    var previous = '1234';
    $scope.details;
    $scope.id = "";
    $scope.new = "";
    $scope.old = "";
    $scope.confirm = "";
    console.log("Finally reached password");
    $scope.layout = "we're here on the password";
    $scope.check1 = function (value) {
        console.log("value" + value)
        if (value != undefined) {
            var result = /^\w{2}\d{4}$/.test(value);

            if (result == false) {
                $scope.msg = "invalid Employee Code";
                $scope.status = false

            }
            else {
                $scope.msg = '';
                $scope.status = true;
                console.log("status" + status)

            }

        }

    }

    /*var id = 2;
    var apiRoute = '/api/Employeedata/GetDetails';
    var details = EmployeeService.getbyID(apiRoute, id);
    details.then(function (response) {
        $scope.details = response.data;
        
        console.log("testing1"+previous)
 
        console.log("changepassword" + JSON.stringify($scope.details))
    }, function (error) {
        console.log("Error: " + JSON.stringify(error));
    });*/


    $scope.pswdcheck = function (value) {
        if (value == $scope.new) {
            $scope.status1 = true;
        }
        else {
            $scope.status1 = false;
        }

    }

    //console.log("new password" + JSON.stringify($scope.details))
    $scope.change = function () {
        if (previous == $scope.old) {
            var apiRoute = "api/Employeedata/UpdateDetails/";
            var param = {
                EmpID: 2,
                Password: $scope.new
            }
            var changed = EmployeeService.put(apiRoute, param);
            changed.then(function (response) {
                $scope.requests = response.data;
                console.log("requests" + JSON.stringify(response.data));
                $mdDialog.show(
                    $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#popupContainer')))
                        .clickOutsideToClose(true)
                        .title('Password Changed ')
                        .textContent('Your Password have changed successfully')
                        .ariaLabel('Change Password')
                        .ok('ok')

                );
            }, function (error) {
                console.log("Error: " + JSON.stringify(error));
            });
        }
        else {
            console.log("Password mismatch")
        }


    }

}]);