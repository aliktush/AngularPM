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