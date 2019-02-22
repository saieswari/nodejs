'use strict';


myApp.controller('AccessCtrl', ['$scope', function ($scope) {

    console.log("request response");
    $scope.options = [
        { id: '1', name: 'Mail', cat: 'Communication' },
        { id: '2', name: 'Internet', cat: 'Communication' },
        { id: '3', name: 'Share', cat: 'Database' },
        { id: '4', name: 'Remote', cat: 'Network' },
        { id: '5', name: 'Installation', cat: 'Application' }
    ];
    $scope.category = [
        { name: 'Network' },
        { name: 'Database' },
        { name: 'Third party' },
        { name: 'Communication' },
        { name: 'Application' },
        { name: 'Others' },
    ];
}])
