var myApp;
(function () {
    myApp = angular.module("myApp", ['ui.router']);
})();

/*myApp.config(["$routeProvider", '$locationProvider', function ($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider.when('\employee', {
        templateUrl: 'Employee.html',
        controller: 'Employeectrl'
    });*/

myApp.config(["$stateProvider", "$urlRouterProvider", "$locationProvider", function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
    .state('Employee', {
        url:'/Employee1',
        templateUrl: '/Projects/Employee/Employee.html',
        Controller:"Employeectrl"
    })
    .state('List', {
        url:'/Employee2',
        templateUrl: '/Projects/Login/Login.html',
        Controller:"Loginctrl"
       
    })
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
}]);