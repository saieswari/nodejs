myApp.service('LoginService', function ($http) {
    var urlGet = '';
    this.post = function (apiRoute, Model) {
        var request = $http({
            method: "post",
            url: apiRoute,
            data: Model
        });
        return request;
    }
    this.put = function (apiRoute, Model) {
        var request = $http({
            method: "put",
            url: apiRoute,
            data: Model
        });
        return request;
    }
    this.getAll = function (apiRoute2, employeecode, pswd) {
        var urlGet = '';
        urlGet = apiRoute2 + '/' + employeecode + '/' + pswd;
        return $http.get(urlGet);

    }
    this.getbyID = function (apiRoute, customerID) {
        urlGet = apiRoute + '/' + customerID;
        return $http.get(urlGet);
    }
});