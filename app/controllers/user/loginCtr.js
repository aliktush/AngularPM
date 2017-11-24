module.exports = function LoginController($scope,Backend,$timeout,$cookies,$state){
    console.log("Login");

    $scope.user = {};
    $scope.message = "";
    $scope.status = "";
    
    
    $scope.login = login;
    
    
    function login() {
        if($scope.user['email'] && $scope.user['password']){
            
            Backend.Login($scope.user).then(function (response) {
                console.log(response);
                if(response.data) {
                    if (response.data.status == "Success") {
                        $cookies.putObject('user',response.data.data);
                        $scope.$root.userStatus = true;
                        $state.go('main.home');
                    }else{
                        $scope.message = response.data.msg;
                        $scope.status = "error";
                        $timeout(function () {
                            $scope.message = "";
                            $scope.status = "";
                        }, 2000);
                        $scope.user['password']= $scope.user['repassword'] = '';
                    }
                }
            })
        }else{
            $scope.message = "Email or Password not set";
            $scope.status = "error";
            $timeout(function () {
                $scope.message = "";
                $scope.status = "";
            }, 3000);
        }
    }

};
module.exports.$inject = ['$scope', 'Backend','$timeout','$cookies','$state'];