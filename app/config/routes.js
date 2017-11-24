module.exports = function ($stateProvider, $urlRouterProvider){

	$urlRouterProvider.otherwise('/404');

    $urlRouterProvider
        .when('','/');

    $stateProvider
        /*main state*/
        .state('main', {
            url: '',
            templateUrl: './app/views/main.html',
            controller: require('controllers/mainCtr.js')
            }                 
        )
        .state('main.login', {
                url: '/login',
                templateUrl: './app/views/user/login.html',
                controller: require('controllers/user/loginCtr.js'),
            }
        )
        .state('main.signup', {
                url: '/signup',
                templateUrl: './app/views/user/signup.html',
                controller: require('controllers/user/signupCtr.js'),
            }
        )
        .state('main.profile', {
                url: '/profile',
                templateUrl: './app/views/user/profile.html',
                controller: require('controllers/user/profileCtr.js'),
            }
        )
    
        .state('main.notfound', {
                url: '/404',
                templateUrl: './app/views/404.html',
                //controller: require('controllers/homeCtr.js'),
            }
        )
        
        .state('main.home', {
                url: '/',
                templateUrl: './app/views/home.html',
                controller: require('controllers/homeCtr.js'),
            }
        )
        
    ;
};
module.exports.$inject = ['$stateProvider','$urlRouterProvider'];