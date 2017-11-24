(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{"controllers/homeCtr.js":2,"controllers/mainCtr.js":3,"controllers/user/loginCtr.js":4,"controllers/user/profileCtr.js":5,"controllers/user/signupCtr.js":6}],2:[function(require,module,exports){
module.exports = function HomeController($scope,Backend){

    $scope.groupsList = "";
    $scope.lessonsList = "";
    $scope.roomsList = "";
    $scope.subjectList = "";
    $scope.errormsg = "";
    $scope.successmsg = "";
    $scope.startTime = "08:30:00";
    $scope.lessonTime = 90;
    $scope.breake = 10;
    $scope.maxlessons = 6;
    
    $scope.currentgroup = "";
    
    $scope.editMode = false;
    $scope.addNewForm = false;
    $scope.groupLessons = [];
    $scope.weekDays = [
        {'lessonslist_day':1,'name':'Monday','short':'mon'},
        {'lessonslist_day':2,'name':'Tuesday','short':'tue'},
        {'lessonslist_day':3,'name':'Wednesday','short':'wed'},
        {'lessonslist_day':4,'name':'Thursday','short':'thu'},
        {'lessonslist_day':5,'name':'Friday','short':'fri'},
        {'lessonslist_day':6,'name':'Saturday','short':'sat'}
    ];
    
    
    $scope.init = init;
    $scope.consoleLog = consoleLog;
    $scope.GetLessonsList = GetLessonsList;
    $scope.createInitials = createInitials;
    $scope.editModeOn = editModeOn;
    $scope.checkMode = checkMode;
    $scope.addLesson = addLesson;
    $scope.GetRoomsList = GetRoomsList;
    $scope.GetSubjectsList = GetSubjectsList;
    $scope.GetLessonTime = GetLessonTime;
    $scope.CleanLesson = CleanLesson;
    $scope.EditLesson = EditLesson;

    $scope.init();

    function init() {        
        Backend.GroupsList().then(function (response) {
            //console.log(response.data.data);
            if(response.data){
                if(response.data.status == "Success"){
                    $scope.groupsList = response.data.data;
                    GetLessonsList($scope.groupsList[0].group_ID);
                }
            }
        })
    }

    function GetLessonsList(group_ID) {
        $scope.errormsg = "";
        $scope.addNewForm = false;
        Backend.LessonsList(group_ID).then(function (response) {
            //console.log(response.data.data);
            if(response.data){
                if(response.data.status == "Success"){
                    $scope.currentgroup = group_ID;
                    $scope.lessonsList = response.data.data;
                    $scope.lessonsList.forEach(function (elem) {
                        //console.log(elem);
                        //$scope.groupLessons.put
                    })
                }
            }
            if(response.statusText == "No Content"){
                $scope.errormsg = "For this group any data";
                $scope.lessonsList = "";
                $scope.currentgroup = group_ID;
            }
        })
    }
    
    function GetRoomsList() {
        Backend.RoomsList().then(function (response) {
            //console.log(response);
            if(response.data){
                if(response.data.status == "Success"){
                    $scope.roomsList = response.data.data;
                }
            }
        })
    }
    
    function GetSubjectsList() {
        Backend.SubjectList().then(function (response) {
            //console.log(response);
            if(response.data){
                if(response.data.status == "Success"){
                    $scope.subjectList = response.data.data;
                }
            }
        })
    }

    function createInitials(last, name, second) {
        var FIO = "";
        if(last && name && second){
            FIO = last+" "+name.slice(0, 1)+". "+second.slice(0, 1)+".";
        }
        return FIO;
    }

    function GetLessonTime(current) {
        var time = {
            1:"8:30 10:00",
            2:"10:10 11:40",
            3:"12:00 13:30",
            4:"13:40 15:10",
            5:"15:30 17:00",
            6:"17:10 18:40"
        };
        return time[current];
    }

    function checkMode(flag){
        if(flag == 'data' && ($scope.lessonsList || $scope.editMode)){
            return true;
        }else{
            return false;
        }
    }
    
    function editModeOn() {
        $scope.editMode = true;
    }

    function addLesson(week) {
        var weekday = week;
        $scope.addNewForm = true;
        GetSubjectsList();
        GetRoomsList();
        
        $scope.closeAdd = function () {
            $scope.addNewForm = false;
        };

        $scope.createNew = function () {
            if(weekday && $scope.currentgroup){
                var data ={};
                data['lessonslist_day'] = weekday;
                data['lessonslist_lesson_ID'] = $scope.subjectType;
                data['lessonslist_room_ID'] = $scope.roomValue;
                data['lessonslist_group_ID'] = $scope.currentgroup;
                
                Backend.AddNewInList(data).then(function (response) {
                    console.log(response);
                    if(response.data) {
                        if (response.data.status == "Success") {
                            GetLessonsList($scope.currentgroup);
                            $scope.addNewForm = false;
                        }
                    }
                })
            }else{
                $scope.errormsg = "Not all data set";
            }
        };
    }

    function EditLesson(ID,day,room,lesson_ID) {
        $scope.addNewForm = true;
        GetSubjectsList();
        GetRoomsList();
        
        $scope.roomValue = room;
        $scope.subjectType = lesson_ID;

        $scope.closeAdd = function () {
            $scope.addNewForm = false;
        };
        $scope.createNew = function () {
            //debugger;
            if(ID && day ){
                var data = {};
                data['lessonslist_ID'] = ID;
                data['lessonslist_day'] = day;
                data['lessonslist_lesson_ID'] = $scope.subjectType;
                data['lessonslist_room_ID'] = $scope.roomValue;
                data['lessonslist_group_ID'] = $scope.currentgroup;
                
                Backend.EditLessonIn(data).then(function (response) {
                    console.log(response);
                    if(response.data) {
                        if (response.data.status == "Success") {
                            GetLessonsList($scope.currentgroup);
                            $scope.addNewForm = false;
                        }
                    }
                })
            }else{
                $scope.errormsg = "Not all data set";
            }
        }
    }

    function CleanLesson(lessonslist_ID) {
        var data ={};
        data['lessonslist_ID'] = lessonslist_ID;
        Backend.CleanLessonIn(data).then(function (response) {
            if(response.data) {
                if (response.data.status == "Success") {
                    GetLessonsList($scope.currentgroup);

                }
            }
        })
    }

    function consoleLog(item) {
        console.log(item);
    }
};
module.exports.$inject = ['$scope', 'Backend'];
},{}],3:[function(require,module,exports){
module.exports = function MainController($scope,$state,$cookies, $rootScope){
	
	$scope.menu = "";
	$scope.current = "";
	$scope.sitename = "Aleksey Tushkov";
	$scope.copiright ="© Kiev - 2017";
	
	$scope.init = init;
	$scope.signOut = signOut;

	$scope.init();
	
	function init() {
		$scope.menu = [
			{'name':"Home",'state':'main.home','elements':[
				{'name':"View",'state':'main.home','elements':[]}
			]},
			/*{'name':"Lessons",'state':'main.lessons','elements':[
			 {'name':"View",'state':'main.lessons','elements':[]},
			 {'name':"Edit",'state':'main.lessons.edit','elements':[]},
			 {'name':"Add",'state':'main.lessons','elements':[]}
			 ]},
			 {'name':"Lectures",'state':'main.lectures','elements':[]},
			 {'name':"Groups",'state':'main.groups','elements':[]},
			 {'name':"Rooms",'state':'main.rooms','elements':[]},
			 {'name':"Settings",'state':'main.settings','elements':[]},
			 {'name':"Users",'state':'main.users','elements':[]}*/
		];

	}

	function signOut() {
		$cookies.remove('user');
		
		$state.go('main.login');
	}

};
module.exports.$inject = ['$scope', '$state',  '$cookies', '$rootScope'];
},{}],4:[function(require,module,exports){
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
},{}],5:[function(require,module,exports){
module.exports = function LoginController($scope,Backend,$timeout,$cookies,$state){
    console.log("Profile");


};
module.exports.$inject = ['$scope', 'Backend','$timeout','$cookies','$state'];
},{}],6:[function(require,module,exports){
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
},{}],7:[function(require,module,exports){
angular.module('aliktush', ['ui.router','ngCookies','ngAnimate','ui.bootstrap'])

    /**config*/
    .config(require('./config/routes.js'))
    

    /**services*/
    .service('Backend', require('./services/Backend.js'))

    /**factories*/
        
    /**directives*/

    /**filters*/



    .run(require('./run/Authentication.js')['view_restriction'])
;
},{"./config/routes.js":1,"./run/Authentication.js":8,"./services/Backend.js":9}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
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
},{}]},{},[1,2,3,4,5,6,7,8,9])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvY29uZmlnL3JvdXRlcy5qcyIsImFwcC9jb250cm9sbGVycy9ob21lQ3RyLmpzIiwiYXBwL2NvbnRyb2xsZXJzL21haW5DdHIuanMiLCJhcHAvY29udHJvbGxlcnMvdXNlci9sb2dpbkN0ci5qcyIsImFwcC9jb250cm9sbGVycy91c2VyL3Byb2ZpbGVDdHIuanMiLCJhcHAvY29udHJvbGxlcnMvdXNlci9zaWdudXBDdHIuanMiLCJhcHAvZW50cnkuanMiLCJhcHAvcnVuL0F1dGhlbnRpY2F0aW9uLmpzIiwiYXBwL3NlcnZpY2VzL0JhY2tlbmQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcil7XHJcblxyXG5cdCR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy80MDQnKTtcclxuXHJcbiAgICAkdXJsUm91dGVyUHJvdmlkZXJcclxuICAgICAgICAud2hlbignJywnLycpO1xyXG5cclxuICAgICRzdGF0ZVByb3ZpZGVyXHJcbiAgICAgICAgLyptYWluIHN0YXRlKi9cclxuICAgICAgICAuc3RhdGUoJ21haW4nLCB7XHJcbiAgICAgICAgICAgIHVybDogJycsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi9hcHAvdmlld3MvbWFpbi5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogcmVxdWlyZSgnY29udHJvbGxlcnMvbWFpbkN0ci5qcycpXHJcbiAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIClcclxuICAgICAgICAuc3RhdGUoJ21haW4ubG9naW4nLCB7XHJcbiAgICAgICAgICAgICAgICB1cmw6ICcvbG9naW4nLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuL2FwcC92aWV3cy91c2VyL2xvZ2luLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogcmVxdWlyZSgnY29udHJvbGxlcnMvdXNlci9sb2dpbkN0ci5qcycpLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgICAgIC5zdGF0ZSgnbWFpbi5zaWdudXAnLCB7XHJcbiAgICAgICAgICAgICAgICB1cmw6ICcvc2lnbnVwJyxcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi9hcHAvdmlld3MvdXNlci9zaWdudXAuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiByZXF1aXJlKCdjb250cm9sbGVycy91c2VyL3NpZ251cEN0ci5qcycpLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgICAgIC5zdGF0ZSgnbWFpbi5wcm9maWxlJywge1xyXG4gICAgICAgICAgICAgICAgdXJsOiAnL3Byb2ZpbGUnLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuL2FwcC92aWV3cy91c2VyL3Byb2ZpbGUuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiByZXF1aXJlKCdjb250cm9sbGVycy91c2VyL3Byb2ZpbGVDdHIuanMnKSxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIClcclxuICAgIFxyXG4gICAgICAgIC5zdGF0ZSgnbWFpbi5ub3Rmb3VuZCcsIHtcclxuICAgICAgICAgICAgICAgIHVybDogJy80MDQnLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuL2FwcC92aWV3cy80MDQuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICAvL2NvbnRyb2xsZXI6IHJlcXVpcmUoJ2NvbnRyb2xsZXJzL2hvbWVDdHIuanMnKSxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIClcclxuICAgICAgICBcclxuICAgICAgICAuc3RhdGUoJ21haW4uaG9tZScsIHtcclxuICAgICAgICAgICAgICAgIHVybDogJy8nLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuL2FwcC92aWV3cy9ob21lLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogcmVxdWlyZSgnY29udHJvbGxlcnMvaG9tZUN0ci5qcycpLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgICAgIFxyXG4gICAgO1xyXG59O1xyXG5tb2R1bGUuZXhwb3J0cy4kaW5qZWN0ID0gWyckc3RhdGVQcm92aWRlcicsJyR1cmxSb3V0ZXJQcm92aWRlciddOyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gSG9tZUNvbnRyb2xsZXIoJHNjb3BlLEJhY2tlbmQpe1xyXG5cclxuICAgICRzY29wZS5ncm91cHNMaXN0ID0gXCJcIjtcclxuICAgICRzY29wZS5sZXNzb25zTGlzdCA9IFwiXCI7XHJcbiAgICAkc2NvcGUucm9vbXNMaXN0ID0gXCJcIjtcclxuICAgICRzY29wZS5zdWJqZWN0TGlzdCA9IFwiXCI7XHJcbiAgICAkc2NvcGUuZXJyb3Jtc2cgPSBcIlwiO1xyXG4gICAgJHNjb3BlLnN1Y2Nlc3Ntc2cgPSBcIlwiO1xyXG4gICAgJHNjb3BlLnN0YXJ0VGltZSA9IFwiMDg6MzA6MDBcIjtcclxuICAgICRzY29wZS5sZXNzb25UaW1lID0gOTA7XHJcbiAgICAkc2NvcGUuYnJlYWtlID0gMTA7XHJcbiAgICAkc2NvcGUubWF4bGVzc29ucyA9IDY7XHJcbiAgICBcclxuICAgICRzY29wZS5jdXJyZW50Z3JvdXAgPSBcIlwiO1xyXG4gICAgXHJcbiAgICAkc2NvcGUuZWRpdE1vZGUgPSBmYWxzZTtcclxuICAgICRzY29wZS5hZGROZXdGb3JtID0gZmFsc2U7XHJcbiAgICAkc2NvcGUuZ3JvdXBMZXNzb25zID0gW107XHJcbiAgICAkc2NvcGUud2Vla0RheXMgPSBbXHJcbiAgICAgICAgeydsZXNzb25zbGlzdF9kYXknOjEsJ25hbWUnOidNb25kYXknLCdzaG9ydCc6J21vbid9LFxyXG4gICAgICAgIHsnbGVzc29uc2xpc3RfZGF5JzoyLCduYW1lJzonVHVlc2RheScsJ3Nob3J0JzondHVlJ30sXHJcbiAgICAgICAgeydsZXNzb25zbGlzdF9kYXknOjMsJ25hbWUnOidXZWRuZXNkYXknLCdzaG9ydCc6J3dlZCd9LFxyXG4gICAgICAgIHsnbGVzc29uc2xpc3RfZGF5Jzo0LCduYW1lJzonVGh1cnNkYXknLCdzaG9ydCc6J3RodSd9LFxyXG4gICAgICAgIHsnbGVzc29uc2xpc3RfZGF5Jzo1LCduYW1lJzonRnJpZGF5Jywnc2hvcnQnOidmcmknfSxcclxuICAgICAgICB7J2xlc3NvbnNsaXN0X2RheSc6NiwnbmFtZSc6J1NhdHVyZGF5Jywnc2hvcnQnOidzYXQnfVxyXG4gICAgXTtcclxuICAgIFxyXG4gICAgXHJcbiAgICAkc2NvcGUuaW5pdCA9IGluaXQ7XHJcbiAgICAkc2NvcGUuY29uc29sZUxvZyA9IGNvbnNvbGVMb2c7XHJcbiAgICAkc2NvcGUuR2V0TGVzc29uc0xpc3QgPSBHZXRMZXNzb25zTGlzdDtcclxuICAgICRzY29wZS5jcmVhdGVJbml0aWFscyA9IGNyZWF0ZUluaXRpYWxzO1xyXG4gICAgJHNjb3BlLmVkaXRNb2RlT24gPSBlZGl0TW9kZU9uO1xyXG4gICAgJHNjb3BlLmNoZWNrTW9kZSA9IGNoZWNrTW9kZTtcclxuICAgICRzY29wZS5hZGRMZXNzb24gPSBhZGRMZXNzb247XHJcbiAgICAkc2NvcGUuR2V0Um9vbXNMaXN0ID0gR2V0Um9vbXNMaXN0O1xyXG4gICAgJHNjb3BlLkdldFN1YmplY3RzTGlzdCA9IEdldFN1YmplY3RzTGlzdDtcclxuICAgICRzY29wZS5HZXRMZXNzb25UaW1lID0gR2V0TGVzc29uVGltZTtcclxuICAgICRzY29wZS5DbGVhbkxlc3NvbiA9IENsZWFuTGVzc29uO1xyXG4gICAgJHNjb3BlLkVkaXRMZXNzb24gPSBFZGl0TGVzc29uO1xyXG5cclxuICAgICRzY29wZS5pbml0KCk7XHJcblxyXG4gICAgZnVuY3Rpb24gaW5pdCgpIHsgICAgICAgIFxyXG4gICAgICAgIEJhY2tlbmQuR3JvdXBzTGlzdCgpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2cocmVzcG9uc2UuZGF0YS5kYXRhKTtcclxuICAgICAgICAgICAgaWYocmVzcG9uc2UuZGF0YSl7XHJcbiAgICAgICAgICAgICAgICBpZihyZXNwb25zZS5kYXRhLnN0YXR1cyA9PSBcIlN1Y2Nlc3NcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmdyb3Vwc0xpc3QgPSByZXNwb25zZS5kYXRhLmRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgR2V0TGVzc29uc0xpc3QoJHNjb3BlLmdyb3Vwc0xpc3RbMF0uZ3JvdXBfSUQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBHZXRMZXNzb25zTGlzdChncm91cF9JRCkge1xyXG4gICAgICAgICRzY29wZS5lcnJvcm1zZyA9IFwiXCI7XHJcbiAgICAgICAgJHNjb3BlLmFkZE5ld0Zvcm0gPSBmYWxzZTtcclxuICAgICAgICBCYWNrZW5kLkxlc3NvbnNMaXN0KGdyb3VwX0lEKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKHJlc3BvbnNlLmRhdGEuZGF0YSk7XHJcbiAgICAgICAgICAgIGlmKHJlc3BvbnNlLmRhdGEpe1xyXG4gICAgICAgICAgICAgICAgaWYocmVzcG9uc2UuZGF0YS5zdGF0dXMgPT0gXCJTdWNjZXNzXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5jdXJyZW50Z3JvdXAgPSBncm91cF9JRDtcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUubGVzc29uc0xpc3QgPSByZXNwb25zZS5kYXRhLmRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmxlc3NvbnNMaXN0LmZvckVhY2goZnVuY3Rpb24gKGVsZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhlbGVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8kc2NvcGUuZ3JvdXBMZXNzb25zLnB1dFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYocmVzcG9uc2Uuc3RhdHVzVGV4dCA9PSBcIk5vIENvbnRlbnRcIil7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuZXJyb3Jtc2cgPSBcIkZvciB0aGlzIGdyb3VwIGFueSBkYXRhXCI7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUubGVzc29uc0xpc3QgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLmN1cnJlbnRncm91cCA9IGdyb3VwX0lEO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIFxyXG4gICAgZnVuY3Rpb24gR2V0Um9vbXNMaXN0KCkge1xyXG4gICAgICAgIEJhY2tlbmQuUm9vbXNMaXN0KCkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhyZXNwb25zZSk7XHJcbiAgICAgICAgICAgIGlmKHJlc3BvbnNlLmRhdGEpe1xyXG4gICAgICAgICAgICAgICAgaWYocmVzcG9uc2UuZGF0YS5zdGF0dXMgPT0gXCJTdWNjZXNzXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5yb29tc0xpc3QgPSByZXNwb25zZS5kYXRhLmRhdGE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBmdW5jdGlvbiBHZXRTdWJqZWN0c0xpc3QoKSB7XHJcbiAgICAgICAgQmFja2VuZC5TdWJqZWN0TGlzdCgpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2cocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICBpZihyZXNwb25zZS5kYXRhKXtcclxuICAgICAgICAgICAgICAgIGlmKHJlc3BvbnNlLmRhdGEuc3RhdHVzID09IFwiU3VjY2Vzc1wiKXtcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuc3ViamVjdExpc3QgPSByZXNwb25zZS5kYXRhLmRhdGE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZUluaXRpYWxzKGxhc3QsIG5hbWUsIHNlY29uZCkge1xyXG4gICAgICAgIHZhciBGSU8gPSBcIlwiO1xyXG4gICAgICAgIGlmKGxhc3QgJiYgbmFtZSAmJiBzZWNvbmQpe1xyXG4gICAgICAgICAgICBGSU8gPSBsYXN0K1wiIFwiK25hbWUuc2xpY2UoMCwgMSkrXCIuIFwiK3NlY29uZC5zbGljZSgwLCAxKStcIi5cIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIEZJTztcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBHZXRMZXNzb25UaW1lKGN1cnJlbnQpIHtcclxuICAgICAgICB2YXIgdGltZSA9IHtcclxuICAgICAgICAgICAgMTpcIjg6MzAgMTA6MDBcIixcclxuICAgICAgICAgICAgMjpcIjEwOjEwIDExOjQwXCIsXHJcbiAgICAgICAgICAgIDM6XCIxMjowMCAxMzozMFwiLFxyXG4gICAgICAgICAgICA0OlwiMTM6NDAgMTU6MTBcIixcclxuICAgICAgICAgICAgNTpcIjE1OjMwIDE3OjAwXCIsXHJcbiAgICAgICAgICAgIDY6XCIxNzoxMCAxODo0MFwiXHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gdGltZVtjdXJyZW50XTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjaGVja01vZGUoZmxhZyl7XHJcbiAgICAgICAgaWYoZmxhZyA9PSAnZGF0YScgJiYgKCRzY29wZS5sZXNzb25zTGlzdCB8fCAkc2NvcGUuZWRpdE1vZGUpKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGZ1bmN0aW9uIGVkaXRNb2RlT24oKSB7XHJcbiAgICAgICAgJHNjb3BlLmVkaXRNb2RlID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhZGRMZXNzb24od2Vlaykge1xyXG4gICAgICAgIHZhciB3ZWVrZGF5ID0gd2VlaztcclxuICAgICAgICAkc2NvcGUuYWRkTmV3Rm9ybSA9IHRydWU7XHJcbiAgICAgICAgR2V0U3ViamVjdHNMaXN0KCk7XHJcbiAgICAgICAgR2V0Um9vbXNMaXN0KCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgJHNjb3BlLmNsb3NlQWRkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuYWRkTmV3Rm9ybSA9IGZhbHNlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5jcmVhdGVOZXcgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmKHdlZWtkYXkgJiYgJHNjb3BlLmN1cnJlbnRncm91cCl7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9e307XHJcbiAgICAgICAgICAgICAgICBkYXRhWydsZXNzb25zbGlzdF9kYXknXSA9IHdlZWtkYXk7XHJcbiAgICAgICAgICAgICAgICBkYXRhWydsZXNzb25zbGlzdF9sZXNzb25fSUQnXSA9ICRzY29wZS5zdWJqZWN0VHlwZTtcclxuICAgICAgICAgICAgICAgIGRhdGFbJ2xlc3NvbnNsaXN0X3Jvb21fSUQnXSA9ICRzY29wZS5yb29tVmFsdWU7XHJcbiAgICAgICAgICAgICAgICBkYXRhWydsZXNzb25zbGlzdF9ncm91cF9JRCddID0gJHNjb3BlLmN1cnJlbnRncm91cDtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgQmFja2VuZC5BZGROZXdJbkxpc3QoZGF0YSkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYocmVzcG9uc2UuZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UuZGF0YS5zdGF0dXMgPT0gXCJTdWNjZXNzXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdldExlc3NvbnNMaXN0KCRzY29wZS5jdXJyZW50Z3JvdXApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmFkZE5ld0Zvcm0gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLmVycm9ybXNnID0gXCJOb3QgYWxsIGRhdGEgc2V0XCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIEVkaXRMZXNzb24oSUQsZGF5LHJvb20sbGVzc29uX0lEKSB7XHJcbiAgICAgICAgJHNjb3BlLmFkZE5ld0Zvcm0gPSB0cnVlO1xyXG4gICAgICAgIEdldFN1YmplY3RzTGlzdCgpO1xyXG4gICAgICAgIEdldFJvb21zTGlzdCgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgICRzY29wZS5yb29tVmFsdWUgPSByb29tO1xyXG4gICAgICAgICRzY29wZS5zdWJqZWN0VHlwZSA9IGxlc3Nvbl9JRDtcclxuXHJcbiAgICAgICAgJHNjb3BlLmNsb3NlQWRkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuYWRkTmV3Rm9ybSA9IGZhbHNlO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgJHNjb3BlLmNyZWF0ZU5ldyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgLy9kZWJ1Z2dlcjtcclxuICAgICAgICAgICAgaWYoSUQgJiYgZGF5ICl7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgZGF0YVsnbGVzc29uc2xpc3RfSUQnXSA9IElEO1xyXG4gICAgICAgICAgICAgICAgZGF0YVsnbGVzc29uc2xpc3RfZGF5J10gPSBkYXk7XHJcbiAgICAgICAgICAgICAgICBkYXRhWydsZXNzb25zbGlzdF9sZXNzb25fSUQnXSA9ICRzY29wZS5zdWJqZWN0VHlwZTtcclxuICAgICAgICAgICAgICAgIGRhdGFbJ2xlc3NvbnNsaXN0X3Jvb21fSUQnXSA9ICRzY29wZS5yb29tVmFsdWU7XHJcbiAgICAgICAgICAgICAgICBkYXRhWydsZXNzb25zbGlzdF9ncm91cF9JRCddID0gJHNjb3BlLmN1cnJlbnRncm91cDtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgQmFja2VuZC5FZGl0TGVzc29uSW4oZGF0YSkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYocmVzcG9uc2UuZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UuZGF0YS5zdGF0dXMgPT0gXCJTdWNjZXNzXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdldExlc3NvbnNMaXN0KCRzY29wZS5jdXJyZW50Z3JvdXApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmFkZE5ld0Zvcm0gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLmVycm9ybXNnID0gXCJOb3QgYWxsIGRhdGEgc2V0XCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gQ2xlYW5MZXNzb24obGVzc29uc2xpc3RfSUQpIHtcclxuICAgICAgICB2YXIgZGF0YSA9e307XHJcbiAgICAgICAgZGF0YVsnbGVzc29uc2xpc3RfSUQnXSA9IGxlc3NvbnNsaXN0X0lEO1xyXG4gICAgICAgIEJhY2tlbmQuQ2xlYW5MZXNzb25JbihkYXRhKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICBpZihyZXNwb25zZS5kYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UuZGF0YS5zdGF0dXMgPT0gXCJTdWNjZXNzXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBHZXRMZXNzb25zTGlzdCgkc2NvcGUuY3VycmVudGdyb3VwKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNvbnNvbGVMb2coaXRlbSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGl0ZW0pO1xyXG4gICAgfVxyXG59O1xyXG5tb2R1bGUuZXhwb3J0cy4kaW5qZWN0ID0gWyckc2NvcGUnLCAnQmFja2VuZCddOyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gTWFpbkNvbnRyb2xsZXIoJHNjb3BlLCRzdGF0ZSwkY29va2llcywgJHJvb3RTY29wZSl7XHJcblx0XHJcblx0JHNjb3BlLm1lbnUgPSBcIlwiO1xyXG5cdCRzY29wZS5jdXJyZW50ID0gXCJcIjtcclxuXHQkc2NvcGUuc2l0ZW5hbWUgPSBcIkFsZWtzZXkgVHVzaGtvdlwiO1xyXG5cdCRzY29wZS5jb3BpcmlnaHQgPVwiwqkgS2lldiAtIDIwMTdcIjtcclxuXHRcclxuXHQkc2NvcGUuaW5pdCA9IGluaXQ7XHJcblx0JHNjb3BlLnNpZ25PdXQgPSBzaWduT3V0O1xyXG5cclxuXHQkc2NvcGUuaW5pdCgpO1xyXG5cdFxyXG5cdGZ1bmN0aW9uIGluaXQoKSB7XHJcblx0XHQkc2NvcGUubWVudSA9IFtcclxuXHRcdFx0eyduYW1lJzpcIkhvbWVcIiwnc3RhdGUnOidtYWluLmhvbWUnLCdlbGVtZW50cyc6W1xyXG5cdFx0XHRcdHsnbmFtZSc6XCJWaWV3XCIsJ3N0YXRlJzonbWFpbi5ob21lJywnZWxlbWVudHMnOltdfVxyXG5cdFx0XHRdfSxcclxuXHRcdFx0Lyp7J25hbWUnOlwiTGVzc29uc1wiLCdzdGF0ZSc6J21haW4ubGVzc29ucycsJ2VsZW1lbnRzJzpbXHJcblx0XHRcdCB7J25hbWUnOlwiVmlld1wiLCdzdGF0ZSc6J21haW4ubGVzc29ucycsJ2VsZW1lbnRzJzpbXX0sXHJcblx0XHRcdCB7J25hbWUnOlwiRWRpdFwiLCdzdGF0ZSc6J21haW4ubGVzc29ucy5lZGl0JywnZWxlbWVudHMnOltdfSxcclxuXHRcdFx0IHsnbmFtZSc6XCJBZGRcIiwnc3RhdGUnOidtYWluLmxlc3NvbnMnLCdlbGVtZW50cyc6W119XHJcblx0XHRcdCBdfSxcclxuXHRcdFx0IHsnbmFtZSc6XCJMZWN0dXJlc1wiLCdzdGF0ZSc6J21haW4ubGVjdHVyZXMnLCdlbGVtZW50cyc6W119LFxyXG5cdFx0XHQgeyduYW1lJzpcIkdyb3Vwc1wiLCdzdGF0ZSc6J21haW4uZ3JvdXBzJywnZWxlbWVudHMnOltdfSxcclxuXHRcdFx0IHsnbmFtZSc6XCJSb29tc1wiLCdzdGF0ZSc6J21haW4ucm9vbXMnLCdlbGVtZW50cyc6W119LFxyXG5cdFx0XHQgeyduYW1lJzpcIlNldHRpbmdzXCIsJ3N0YXRlJzonbWFpbi5zZXR0aW5ncycsJ2VsZW1lbnRzJzpbXX0sXHJcblx0XHRcdCB7J25hbWUnOlwiVXNlcnNcIiwnc3RhdGUnOidtYWluLnVzZXJzJywnZWxlbWVudHMnOltdfSovXHJcblx0XHRdO1xyXG5cclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIHNpZ25PdXQoKSB7XHJcblx0XHQkY29va2llcy5yZW1vdmUoJ3VzZXInKTtcclxuXHRcdFxyXG5cdFx0JHN0YXRlLmdvKCdtYWluLmxvZ2luJyk7XHJcblx0fVxyXG5cclxufTtcclxubW9kdWxlLmV4cG9ydHMuJGluamVjdCA9IFsnJHNjb3BlJywgJyRzdGF0ZScsICAnJGNvb2tpZXMnLCAnJHJvb3RTY29wZSddOyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gTG9naW5Db250cm9sbGVyKCRzY29wZSxCYWNrZW5kLCR0aW1lb3V0LCRjb29raWVzLCRzdGF0ZSl7XHJcbiAgICBjb25zb2xlLmxvZyhcIkxvZ2luXCIpO1xyXG5cclxuICAgICRzY29wZS51c2VyID0ge307XHJcbiAgICAkc2NvcGUubWVzc2FnZSA9IFwiXCI7XHJcbiAgICAkc2NvcGUuc3RhdHVzID0gXCJcIjtcclxuICAgIFxyXG4gICAgXHJcbiAgICAkc2NvcGUubG9naW4gPSBsb2dpbjtcclxuICAgIFxyXG4gICAgXHJcbiAgICBmdW5jdGlvbiBsb2dpbigpIHtcclxuICAgICAgICBpZigkc2NvcGUudXNlclsnZW1haWwnXSAmJiAkc2NvcGUudXNlclsncGFzc3dvcmQnXSl7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBCYWNrZW5kLkxvZ2luKCRzY29wZS51c2VyKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAgICAgaWYocmVzcG9uc2UuZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5kYXRhLnN0YXR1cyA9PSBcIlN1Y2Nlc3NcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkY29va2llcy5wdXRPYmplY3QoJ3VzZXInLHJlc3BvbnNlLmRhdGEuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS4kcm9vdC51c2VyU3RhdHVzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdtYWluLmhvbWUnKTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm1lc3NhZ2UgPSByZXNwb25zZS5kYXRhLm1zZztcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnN0YXR1cyA9IFwiZXJyb3JcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm1lc3NhZ2UgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnN0YXR1cyA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDIwMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUudXNlclsncGFzc3dvcmQnXT0gJHNjb3BlLnVzZXJbJ3JlcGFzc3dvcmQnXSA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgJHNjb3BlLm1lc3NhZ2UgPSBcIkVtYWlsIG9yIFBhc3N3b3JkIG5vdCBzZXRcIjtcclxuICAgICAgICAgICAgJHNjb3BlLnN0YXR1cyA9IFwiZXJyb3JcIjtcclxuICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLm1lc3NhZ2UgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLnN0YXR1cyA9IFwiXCI7XHJcbiAgICAgICAgICAgIH0sIDMwMDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn07XHJcbm1vZHVsZS5leHBvcnRzLiRpbmplY3QgPSBbJyRzY29wZScsICdCYWNrZW5kJywnJHRpbWVvdXQnLCckY29va2llcycsJyRzdGF0ZSddOyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gTG9naW5Db250cm9sbGVyKCRzY29wZSxCYWNrZW5kLCR0aW1lb3V0LCRjb29raWVzLCRzdGF0ZSl7XHJcbiAgICBjb25zb2xlLmxvZyhcIlByb2ZpbGVcIik7XHJcblxyXG5cclxufTtcclxubW9kdWxlLmV4cG9ydHMuJGluamVjdCA9IFsnJHNjb3BlJywgJ0JhY2tlbmQnLCckdGltZW91dCcsJyRjb29raWVzJywnJHN0YXRlJ107IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBTaWdudXBDb250cm9sbGVyKCRzY29wZSxCYWNrZW5kLCR0aW1lb3V0LCRzdGF0ZSl7XHJcblxyXG4gICAgJHNjb3BlLnVzZXIgPSB7fTtcclxuICAgICRzY29wZS5tZXNzYWdlID0gXCJcIjtcclxuICAgICRzY29wZS5zdGF0dXMgPSBcIlwiO1xyXG5cclxuICAgICRzY29wZS5pbml0ID0gaW5pdDtcclxuICAgICRzY29wZS5zaWduVXAgPSBzaWduVXA7XHJcblxyXG4gICAgJHNjb3BlLmluaXQoKTtcclxuXHJcblxyXG4gICAgZnVuY3Rpb24gaW5pdCgpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2lnblVwKCkge1xyXG4gICAgICAgIGlmKCRzY29wZS51c2VyWydwYXNzd29yZCddICYmICRzY29wZS51c2VyWydyZXBhc3N3b3JkJ10gJiYgKCRzY29wZS51c2VyWydwYXNzd29yZCddID09ICRzY29wZS51c2VyWydyZXBhc3N3b3JkJ10pKXtcclxuICAgICAgICAgICAgQmFja2VuZC5TaWduVXAoJHNjb3BlLnVzZXIpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICBpZihyZXNwb25zZS5kYXRhKXtcclxuICAgICAgICAgICAgICAgICAgICBpZihyZXNwb25zZS5kYXRhLnN0YXR1cz09XCJTdWNjZXNzXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUubWVzc2FnZSA9IHJlc3BvbnNlLmRhdGEubXNnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuc3RhdHVzID0gXCJzdWNjZXNzXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5tZXNzYWdlID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5zdGF0dXMgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnVzZXIgPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnbWFpbi5sb2dpbicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAyMDAwKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5tZXNzYWdlID0gcmVzcG9uc2UuZGF0YS5tc2c7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5zdGF0dXMgPSBcImVycm9yXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5tZXNzYWdlID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5zdGF0dXMgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAyMDAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnVzZXJbJ3Bhc3N3b3JkJ109ICRzY29wZS51c2VyWydyZXBhc3N3b3JkJ10gPSAnJztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICRzY29wZS5tZXNzYWdlID0gXCJQYXNzd29yZCBub3Qgc2FtZVwiO1xyXG4gICAgICAgICAgICAkc2NvcGUuc3RhdHVzID0gXCJlcnJvclwiO1xyXG4gICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUubWVzc2FnZSA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuc3RhdHVzID0gXCJcIjtcclxuICAgICAgICAgICAgfSwgMzAwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbn07XHJcbm1vZHVsZS5leHBvcnRzLiRpbmplY3QgPSBbJyRzY29wZScsICdCYWNrZW5kJywnJHRpbWVvdXQnLCckc3RhdGUnXTsiLCJhbmd1bGFyLm1vZHVsZSgnYWxpa3R1c2gnLCBbJ3VpLnJvdXRlcicsJ25nQ29va2llcycsJ25nQW5pbWF0ZScsJ3VpLmJvb3RzdHJhcCddKVxyXG5cclxuICAgIC8qKmNvbmZpZyovXHJcbiAgICAuY29uZmlnKHJlcXVpcmUoJy4vY29uZmlnL3JvdXRlcy5qcycpKVxyXG4gICAgXHJcblxyXG4gICAgLyoqc2VydmljZXMqL1xyXG4gICAgLnNlcnZpY2UoJ0JhY2tlbmQnLCByZXF1aXJlKCcuL3NlcnZpY2VzL0JhY2tlbmQuanMnKSlcclxuXHJcbiAgICAvKipmYWN0b3JpZXMqL1xyXG4gICAgICAgIFxyXG4gICAgLyoqZGlyZWN0aXZlcyovXHJcblxyXG4gICAgLyoqZmlsdGVycyovXHJcblxyXG5cclxuXHJcbiAgICAucnVuKHJlcXVpcmUoJy4vcnVuL0F1dGhlbnRpY2F0aW9uLmpzJylbJ3ZpZXdfcmVzdHJpY3Rpb24nXSlcclxuOyIsIm1vZHVsZS5leHBvcnRzLnZpZXdfcmVzdHJpY3Rpb24gPSBWaWV3UmVzdHJpY3Rpb247XHJcbm1vZHVsZS5leHBvcnRzLnZpZXdfcmVzdHJpY3Rpb24uJGluamVjdCA9IFsnJGh0dHAnLCAnJHN0YXRlJywgJyRyb290U2NvcGUnLCAnJGNvb2tpZXMnLCAnQmFja2VuZCddO1xyXG5cclxuZnVuY3Rpb24gVmlld1Jlc3RyaWN0aW9uKCRodHRwLCAkc3RhdGUsICRyb290U2NvcGUsICRjb29raWVzLCBCYWNrZW5kKSB7XHJcblxyXG4gICAgJHJvb3RTY29wZS4kb24oJyRzdGF0ZUNoYW5nZVN0YXJ0JywgZnVuY3Rpb24gKGV2ZW50LCB0b1N0YXRlLCB0b1BhcmFtcywgZnJvbVN0YXRlLCBmcm9tUGFyYW1zKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgdG9rZW4gPSAkY29va2llcy5nZXRPYmplY3QoJ3VzZXInKT8kY29va2llcy5nZXRPYmplY3QoJ3VzZXInKS50b2tlbjpcIlwiO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLyppZiAodG9rZW4pIHtcclxuICAgICAgICAgICAgICAgIGlmICh0b1N0YXRlWyduYW1lJ10gPT0gJ21haW4ubG9naW4nIHx8IHRvU3RhdGVbJ25hbWUnXSA9PSAnbWFpbi5zaWdudXAnKXtcclxuICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ21haW4uaG9tZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBCYWNrZW5kLkNoZWNrVG9rZW4oJGNvb2tpZXMuZ2V0T2JqZWN0KCd1c2VyJykpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYocmVzcG9uc2UuZGF0YSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5kYXRhLnN0YXR1cyA9PSBcIlN1Y2Nlc3NcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS51c2VyU3RhdHVzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkY29va2llcy5yZW1vdmUoJ3VzZXInKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnbWFpbi5sb2dpbicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGlmICh0b1N0YXRlWyduYW1lJ10gIT0gJ21haW4ubG9naW4nKXtcclxuICAgICAgICAgICAgICAgICAgICBpZih0b1N0YXRlWyduYW1lJ10gIT0gJ21haW4uc2lnbnVwJyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnbWFpbi5sb2dpbicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSovXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIGlmICh0b1N0YXRlWyduYW1lJ10gPT0gJ21haW4ucHJvZmlsZScpIHtcclxuICAgICAgICAgICAgICAgIGlmICghdG9rZW4pIHtcclxuICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ21haW4ubG9naW4nKTtcclxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgIGlmICh0b1N0YXRlWyduYW1lJ10gPT0gJ21haW4ubG9naW4nKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodG9rZW4pIHtcclxuICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ21haW4ucHJvZmlsZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgKVxyXG4gICAgXHJcbn1cclxuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoJGh0dHApe1xyXG4gICAgXHJcblx0dmFyIHNlcnZpY2VCYXNlID0gJ2FwaS8nO1xyXG4gICAgLy92YXIgb2JqID0ge307XHJcblxyXG4gICAgLyoqIC0gVXNlciAtICovXHJcbiAgICAvL2xvZ2luXHJcbiAgICB0aGlzLkxvZ2luID0gZnVuY3Rpb24oZGF0YSl7XHJcbiAgICAgICAgcmV0dXJuICRodHRwLnBvc3Qoc2VydmljZUJhc2UgKyAndXNlci9sb2dpbi8nLGRhdGEpO1xyXG4gICAgfTtcclxuICAgIC8vc2lnbnVwXHJcbiAgICB0aGlzLlNpZ25VcCA9IGZ1bmN0aW9uKGRhdGEpe1xyXG4gICAgICAgIHJldHVybiAkaHR0cC5wdXQoc2VydmljZUJhc2UgKyAndXNlci9zaWdudXAnLGRhdGEpO1xyXG4gICAgfTtcclxuICAgIC8vbG9nb3V0XHJcbiAgICB0aGlzLkxvZ091dCA9IGZ1bmN0aW9uKGRhdGEpe1xyXG4gICAgICAgIHJldHVybiAkaHR0cC5wb3N0KHNlcnZpY2VCYXNlICsgJ3VzZXIvbG9nb3V0JyxkYXRhKTtcclxuICAgIH07XHJcbiAgICAvL2NoYW5nZSB1c2VyIGRhdGFcclxuICAgIHRoaXMuRWRpdFVzZXJEYXRhID0gZnVuY3Rpb24oZGF0YSl7XHJcbiAgICAgICAgcmV0dXJuICRodHRwLnBvc3Qoc2VydmljZUJhc2UgKyAndXNlci91cGRhdGUnLGRhdGEpO1xyXG4gICAgfTtcclxuICAgIC8vY2hlY2sgdG9rZW5cclxuICAgIHRoaXMuQ2hlY2tUb2tlbiA9IGZ1bmN0aW9uKGRhdGEpe1xyXG4gICAgICAgIHJldHVybiAkaHR0cC5wb3N0KHNlcnZpY2VCYXNlICsgJ3VzZXIvY2hlY2t0b2tlbicsZGF0YSk7XHJcbiAgICB9O1xyXG4gICAgLyoqIC0gRW5kIHVzZXIgYmxvY2sgLSAqL1xyXG5cclxuICAgIFxyXG4gICAgLy9yZXR1cm4gb2JqO1xyXG59O1xyXG5tb2R1bGUuZXhwb3J0cy4kaW5qZWN0ID0gWyckaHR0cCddOyJdfQ==
