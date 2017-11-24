module.exports = function ($http){
    
	var serviceBase = 'api/';
    //var obj = {};

    /** - User - */
    //login
    this.Login = function(data){
        return $http.post(serviceBase + 'user/login/',data);
    };
    //signup
    this.SignUp = function(data){
        return $http.put(serviceBase + 'user/signup',data);
    };
    //logout
    this.LogOut = function(data){
        return $http.post(serviceBase + 'user/logout',data);
    };
    //change user data
    this.EditUserData = function(data){
        return $http.post(serviceBase + 'user/update',data);
    };
    //check token
    this.CheckToken = function(data){
        return $http.post(serviceBase + 'user/checktoken',data);
    };
    /** - End user block - */

    
    //return obj;
};
module.exports.$inject = ['$http'];