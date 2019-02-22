myApp.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/profile');
    $stateProvider
             .state('profile', {
                 url: '/profile',
                 templateUrl: 'ClientApp/Employee/Profile.html',
                 controller: 'ProfileCtrl'
             })
             .state('request', {
                 url: '/request',
                 templateUrl: 'ClientApp/Employee/RaiseRequest.html',
                 controller: 'Requestctrl'
             })
             .state('cancel', {
                 url: '/cancel',
                 templateUrl: 'ClientApp/Employee/Cancel.html',
                 controller: 'Cancelctrl'
             })
             .state('dashboard', {
                 url: '/dashboard',
                 templateUrl: 'ClientApp/Admin/Dashboard.html',
                 controller: 'DashboardCtrl'
             })
             .state('addemployee', {
                 url: '/addemployee',
                 templateUrl: 'ClientApp/Admin/AddEmployee.html',
                 controller: 'AddemployeeCtrl'
             })
             .state('employeelist', {
                 url: '/employeelist',
                 templateUrl: 'ClientApp/Admin/EmployeeList.html',
                 controller: 'EmployeelistCtrl'
             })
             .state('access', {
                 url: '/access',
                 templateUrl: 'ClientApp/Admin/Access.html',
                 controller: 'AccessCtrl'
             })
         .state('login', {
             url: '/login',
             templateUrl: '../../Views/Login/Login.cshtml',
             controller: 'LoginCtrl'
         });
});