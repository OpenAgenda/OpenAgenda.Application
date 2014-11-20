var ApplicationControllers = angular.module('ApplicationControllers', []);

ApplicationControllers.controller('DashboardCtrl', ['$scope', '$http',
    function ($scope, $http) {
        $http.get('dashboard/data.json').success(function(data) {
            $scope.data = data;
        });
        $scope.orderProp = 'userPriority';
    }]);

ApplicationControllers.controller('MeetingCtrl', ['$scope', '$http',
    function ($scope, $http) {
        $http.get('meetings/MeetingList.json').success(function(data) {
            $scope.meetings = data;
        });
        $scope.orderProp = 'startDateTime';
    }]);
ApplicationControllers.controller('MeetingDetailCtrl', ['$scope', '$routeParams',
    function($scope, $routeParams) {
        $scope.meeting = $routeParams.meetingId;
    }]);

ApplicationControllers.controller('TaskCtrl', ['$scope', '$http',
    function ($scope, $http) {
        $http.get('Tasks/TaskList.json').success(function(data) {
            $scope.meetings = data;
        });
        $scope.orderProp = 'dueDate';
    }]);

ApplicationControllers.controller('CalendarCtrl', ['$scope', '$http',
    function ($scope, $http) {
        $http.get('Calendar/EventList.json').success(function(data) {
            $scope.events = data;
        });
        $scope.orderProp = 'startDateTime';
    }]);
ApplicationControllers.controller('CalendarDetailCtrl', ['$scope', '$routeParams',
    function($scope, $routeParams) {
        $scope.event = $routeParams.eventId;
    }]);

ApplicationControllers.controller('SettingCtrl', ['$scope', '$http',
    function ($scope, $http) {
        $http.get('Settings/Setting.json').success(function(data) {
            $scope.setting = data;
        });
    }]);