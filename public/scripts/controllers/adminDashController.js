myApp.controller('AdminDashController', ['$scope', 'PassportFactory', 'DataFactory', '$http', '$window', '$location',
    function($scope, PassportFactory, DataFactory, $http, $window, $location) {

    //Creates an object to store the info of a logged-in user
    $scope.loggedInUser = {};
    //Creates an array to store the list of lesson plans from the database
    $scope.lessonPlans = undefined;

    $scope.passportFactory = PassportFactory;
    $scope.dataFactory = DataFactory;

    $scope.loggedInUser = $scope.passportFactory.factoryLoggedInUser();

    //validateUser to make sure the role can be on this page then get all the lessons for the teacher
    validateUser();
    getLessonPlans();

    //Function to check the user and re-route them if they are not validated
    function validateUser() {
        if($scope.loggedInUser.role == 'admin') {

        } else {
            $location.path('/home');
        }
    }

    //Function to get all the lesson plans for this teacher
    function getLessonPlans () {
        $scope.dataFactory.factoryAdminRetrieveLessonPlans().then(function () {
            $scope.lessonPlans = $scope.dataFactory.factoryLessonPlans();
            console.log('Admin controller' + $scope.lessonPlans);
        });
    }

    //Function to reroute the user to the lesson plan controller
    $scope.editClickedLesson = function(index){
        $scope.dataFactory.factoryStoredLessonId = $scope.lessonPlans[index].lesson_id;
        $scope.dataFactory.factoryLessonViewState = true;
        $location.path('/lesson_plan');
    };

    console.log('Admin Dashboard Controller');
}]);