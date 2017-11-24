module.exports.view_restriction = ViewRestriction;
module.exports.view_restriction.$inject = ['$http', '$state', '$rootScope', '$cookies', 'Backend'];

function ViewRestriction($http, $state, $rootScope, $cookies, Backend) {

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

            var token = $cookies.getObject('user')?$cookies.getObject('user').token:"";
            
            /*if (token) {
                if (toState['name'] == 'main.login' || toState['name'] == 'main.signup'){
                    $state.go('main.home');
                    event.preventDefault();
                }
                Backend.CheckToken($cookies.getObject('user')).then(function (response) {
                    if(response.data){
                        if (response.data.status == "Success") {
                            $rootScope.userStatus = true;
                        }else{
                            $cookies.remove('user');
                            $state.go('main.login');
                            event.preventDefault();
                        }
                    }
                });
            }else{
                if (toState['name'] != 'main.login'){
                    if(toState['name'] != 'main.signup'){
                        $state.go('main.login');
                        event.preventDefault();
                    }
                }
            }*/
            
            

            if (toState['name'] == 'main.profile') {
                if (!token) {
                    $state.go('main.login');
                    event.preventDefault();
                }
            }
        
            if (toState['name'] == 'main.login') {
                if (token) {
                    $state.go('main.profile');
                    event.preventDefault();
                }
            }
            
        }
    )
    
}
