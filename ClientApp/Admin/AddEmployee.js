'use strict';



myApp.controller('AddemployeeCtrl', ['$scope', function ($scope) {

    console.log("Add employee")
    $scope.options = [
        { id: '1', name: 'Mail', selected: false },
        { id: '2', name: 'Internet', selected: false },
        { id: '3', name: 'Share', selected: false },
        { id: '4', name: 'Remote', selected: false },
        { id: '5', name: 'Installation', selected: false }
    ];

    $scope.toggleAll = function () {
        var toggleStatus = !$scope.isAllSelected;
        angular.forEach($scope.options, function (itm) { itm.selected = toggleStatus; });

    }

    $scope.optionToggled = function () {
        $scope.isAllSelected = $scope.options.every(function (itm) { return itm.selected; })
    }
}])

