var ApplicationControllers = angular.module('ApplicationControllers', []);

ApplicationControllers.controller('MeetingDetailCtrl', ['$scope', '$routeParams', '$resource', "MeetingDetail",
    function($scope, $routeParams, $resource, MeetingDetail) {
        $scope.meetingId = $routeParams.meetingId;
        console.log($routeParams.meetingId);

        $scope.meeting = MeetingDetail($routeParams.meetingId).get(function (data) {
            console.log('success, got data: ', data);
        }, function (err) {
            alert('request failed');
        });

    }]);
/*ApplicationControllers.controller('MeetingDetailCtrl', ['$scope', '$resource' ,'$routeParams', "MeetingDetail",
    function($scope, $routeParams, $resource, MeetingDetail) {
        console.log("MeetingDetail Controller Loaded");

        $scope.meeting = MeetingDetail.query({meetingID: $routeParams.meetingId},function (data) {
            console.log('success, got data: ', data);
        }, function (err) {
            alert('request failed');
        });

    }]);
*/
ApplicationControllers.controller('TaskCtrl', ['$scope', '$http',
    function ($scope, $http) {
        $http.get('/openagenda.application/task/index.json').success(function(data) {
            $scope.meetings = data;
        });
        $scope.orderProp = 'dueDate';
    }]);

ApplicationControllers.controller('CalendarCtrl', ['$scope', '$http',
    function ($scope, $http) {
        $http.get('/openagenda.application/Calendar/index.json').success(function(data) {
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
        console.log("Settings Controller Loaded");
        $http.get('/openagenda.application/setting/index.json').success(function(data) {
            $scope.setting = data;
        });
    }]);

