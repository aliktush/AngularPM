module.exports = function SignupController($scope,Backend,$timeout,$state){

    $scope.user = {};
    $scope.message = "";
    $scope.status = "";

    $scope.init = init;
    $scope.signUp = signUp;

    $scope.init();


    function init() {

    }

    function signUp() {
        if($scope.user['password'] && $scope.user['repassword'] && ($scope.user['password'] == $scope.user['repassword'])){
            Backend.SignUp($scope.user).then(function (response) {
                console.log(response);
                if(response.data){
                    if(response.data.status=="Success"){
                        $scope.message = response.data.msg;
                        $scope.status = "success";
                        $timeout(function () {
                            $scope.message = "";
                            $scope.status = "";
                            $scope.user = {};
                            $state.go('main.login');
                        }, 2000);

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
            $scope.message = "Password not same";
            $scope.status = "error";
            $timeout(function () {
                $scope.message = "";
                $scope.status = "";
            }, 3000);
        }
    }
    
};
module.exports.$inject = ['$scope', 'Backend','$timeout','$state'];