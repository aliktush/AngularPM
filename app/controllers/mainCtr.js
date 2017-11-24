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