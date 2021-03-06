/**
 * @class angular_module.Dashboard
 * @memberOf angular_module
 * @description This Module defines the Dashboard
 *
 * @author Thomas Winkler <thomas.winkler@hof-university.de>
 */

angular.module("Dashboard", [])
    /**
     * @class angular_module.Dashboard.DashboardCtrl
     */
    .controller('DashboardCtrl', ['$scope', '$rootScope', '$resource', "breadcrumbs", "MeetingResourceHelper", 'TaskResourceHelper', 'CommonHelperMethods', 'CommonResourceHelper', 'ModalDialog',
        /**
         *
         * @param $scope
         * @param $rootScope
         * @param $http
         * @param breadcrumbs
         * @param MeetingResourceHelper
         * @param TaskResourceHelper
         * @param CommonHelperMethods
         * @param CommonResourceHelper
         * @param ModalDialog
         */
        function ($scope, $rootScope, $http, breadcrumbs, MeetingResourceHelper, TaskResourceHelper, CommonHelperMethods, CommonResourceHelper, ModalDialog) {
            console.log("Dashboard Controller loaded");

            //Init
            $scope.breadcrumbs = breadcrumbs;
            $scope.upcomingMeetings = [];

            $scope.events = [];
            /**
             * @memberOf angular_module.Dashboard.DashboardCtrl
             */
            $scope.personalInfos = CommonResourceHelper.getPersonalInfos().get(function () {
                $scope.currentUser = $scope.personalInfos.person.name.firstName;
            });

            /**
             * @memberOf angular_module.Dashboard.DashboardCtrl
             */
            $scope.meetingList = MeetingResourceHelper.getMeetingList().query(function () {
                angular.forEach($scope.meetingList, function (meeting) {
                    meeting.scheduledStartDate = CommonHelperMethods.getDateFromJSONString(meeting.scheduledStartDate);
                    $scope.events.push({
                        title: meeting.title,
                        start: new Date(meeting.scheduledStartDate),
                        __identity: meeting.__identity,
                        type: 'Meeting'
                    });

                });
                $scope.findUpcomingMeetings($scope.meetingList);

            }, function (err) {
                alert('request failed');
            });

            /**
             * @function
             * @memberOf angular_module.Dashboard.DashboardCtrl
             * @description Reload Tasks. Reloads all of the users Tasks. Opens a alert, if request fails.
             */
            $scope.reloadTasks = function () {
                $scope.needToBeDoneTasks = TaskResourceHelper.getTaskList(false).query(function (data) {
                    angular.forEach($scope.needToBeDoneTasks, function (task) {
                        $scope.events.push({
                            title: task.title,
                            start: new Date(task.dueDate),
                            __identity: task.__identity,
                            type: 'Task'
                        })
                    });
                }, function (err) {
                    alert('request failed');
                });
            };
            $scope.reloadTasks();

            /**
             * @function
             * @param {array} meetingList List fo Meetings
             * @memberOf angular_module.Dashboard.DashboardCtrl
             * @description Collect only new and upcoming meetings.
             */
            $scope.findUpcomingMeetings = function (meetingList) {
                //search for upcoming Meetings
                var now = new Date();
                angular.forEach(meetingList, function (meeting) {
                    if (now <= meeting.scheduledStartDate) {
                        $scope.upcomingMeetings.push(meeting);
                    }
                });
            };
            /**
             * @function
             * @memberOf angular_module.Dashboard.DashboardCtrl
             * @description Get all globally stored Notifications from $rootScope
             * @returns {array} $rootScope.notifications
             */
            $scope.getNotifications = function () {
                return $rootScope.notifications;
            };
            //$rootScope.changeToolBar("<div>IF NEEDED TOOLBAR</div>");
        }])

    /**
     * @description Controller especially for the Calendar in the Dashboard.
     * Due to a bug in the Library only meetings of the current view are shown in the Calendar
     * @class angular_module.Dashboard.DashboardCalendarCtrl
     *
     * @author Andreas Weber <andreas.weber@hof-university.de>
     * @memberOf angular_module.Dashboard
     */
     .controller('DashboardCalendarCtrl', ['$scope', '$compile', "uiCalendarConfig", '$location',
        function ($scope, $compile, uiCalendarConfig, $location) {
            var date = new Date();
            var d = date.getDate();
            var m = date.getMonth();
            var y = date.getFullYear();


            /**
             * @function
             * @memberOf angular_module.Dashboard.DashboardCalendarCtrl
             * @description Redirect to the detail page for the clicked event (in this case Meeting)
             * @param date {object}
             * @param jsEvent {object}
             * @param view {object}
             */
            $scope.alertOnEventClick = function (date, jsEvent, view) {
                if (date.type == 'Meeting') {
                    // Meeting anzeigen
                    $location.path('meeting/show/' + date.__identity).replace();
                } else if (date.type == 'Task') {
                    angular.forEach($scope.needToBeDoneTasks, function (task) {
                        if (task.__identity == date.__identity)
                            $scope.$parent.open("", task);
                    });
                } else {
                    // Fehler
                }
            };

            /**
             * @function
             * @memberOf angular_module.Dashboard.DashboardCalendarCtrl
             * @description Alert on Drop. A sample Function, not used in this Version
             * @param event {object}
             * @param delta {object}
             * @param revertFunc {object}
             * @param jsEvent {object}
             * @param ui {object}
             * @param view {object}
             */
            $scope.alertOnDrop = function (event, delta, revertFunc, jsEvent, ui, view) {
                $scope.alertMessage = ('Event Droped to make dayDelta ' + delta);
            };

            /**
             * @function
             * @memberOf angular_module.Dashboard.DashboardCalendarCtrl
             * @description Alert on Resize. A sample Function, not used in this Version
             * @param event {object}
             * @param delta {object}
             * @param revertFunc {object}
             * @param jsEvent {object}
             * @param ui {object}
             * @param view {object}
             */
            $scope.alertOnResize = function (event, delta, revertFunc, jsEvent, ui, view) {
                $scope.alertMessage = ('Event Resized to make dayDelta ' + delta);
            };
            /*  */
            /**
             * @function
             * @memberOf angular_module.Dashboard.DashboardCalendarCtrl
             * @description Add and removes an event source of choice
             * @param sources {object}
             * @param source {object}
             */
            $scope.addRemoveEventSource = function (sources, source) {
                var canAdd = 0;
                angular.forEach(sources, function (value, key) {
                    if (sources[key] === source) {
                        sources.splice(key, 1);
                        canAdd = 1;
                    }
                });
                if (canAdd === 0) {
                    sources.push(source);
                }
            };

            /**
             * @description Change View of Calendar
             * @memberOf angular_module.Dashboard.DashboardCalendarCtrl
             * @function
             * @param view {object}
             * @param calendar {object}
             */
            $scope.changeView = function (view, calendar) {
                uiCalendarConfig.calendars[calendar].fullCalendar('changeView', view);
            };

            /**
             * @description Render calender after view change
             * @memberOf angular_module.Dashboard.DashboardCalendarCtrl
             * @function
             * @param calendar {object}
             */
            $scope.renderCalender = function (calendar) {
                if (uiCalendarConfig.calendars[calendar]) {
                    uiCalendarConfig.calendars[calendar].fullCalendar('render');
                }
            };

            /**
             * @description Render tooltip if it is available for the event
             * @memberOf angular_module.Dashboard.DashboardCalendarCtrl
             * @function
             * @param event {object}
             * @param element {object}
             * @param view {object}
             */
            $scope.eventRender = function (event, element, view) {
                element.attr({
                    'tooltip': event.title,
                    'tooltip-append-to-body': true
                });
                $compile(element)($scope);
            };
            $scope.locale = "de";
            /* Config object */
            $scope.uiConfig = {
                calendar: {
                    height: 450,
                    editable: false,
                    firstDay: 1,
                    header: {
                        left: 'title',
                        center: '',
                        right: ''
                    },
                    eventClick: $scope.alertOnEventClick,
                    eventDrop: $scope.alertOnDrop,
                    eventResize: $scope.alertOnResize,
                    eventRender: $scope.eventRender
                }
            };

            /**
             * @function
             * @description Used to change the Language of the calendar
             * @memberOf angular_module.Dashboard.DashboardCalendarCtrl
             */
            $scope.changeLang = function () {
                $scope.uiConfig.calendar.dayNames = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
                $scope.uiConfig.calendar.dayNamesShort = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];

            };
            $scope.changeTo = "German";
            $scope.changeLang();

            $scope.eventSources = [$scope.events];
        }]);
