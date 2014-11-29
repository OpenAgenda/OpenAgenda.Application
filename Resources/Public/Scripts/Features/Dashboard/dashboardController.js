/**
 * Created by Thomas on 27.11.14.
 */
angular.module("Dashboard", [])
    .controller('DashboardCtrl', ['$scope', '$rootScope', '$resource', "breadcrumbs", "Meetinglist",
        function ($scope, $rootScope, $http, breadcrumbs, Meetinglist) {
            console.log("Dashboard Controller Loaded");
            $scope.breadcrumbs = breadcrumbs;
            /*$http.get('/openagenda.application/dashboard/index.json').success(function(data) {
             $scope.data = data;
             });*/
            $scope.upcomingMeetings = [];
            $scope.needToBeDoneTasks = [1, 2, 3];

            $scope.currentUser = "Thomas"; // From where?

            $scope.events = [];

            $scope.meetingList = Meetinglist.query(function (data) {
                console.log('success, got data: ', data);
                $scope.findUpcomingMeetings(data);
                angular.forEach( $scope.upcomingMeetings, function (meeting) {
                    var tag = $scope.getDateFromJSONString(meeting.startDate);
                    console.log(tag);
                    tag.setMonth(10);       // Test zu Meetings anzeigen
                    tag.setFullYear(2014);
                    console.log(tag);
                    console.log(new Date());
                    $scope.events.push( {title: meeting.title, start: new Date(tag) });

                });
            }, function (err) {
                alert('request failed');
            });

            $scope.getDateFromJSONString = function (string) {
                return new Date(string.substr(1, string.length - 2));
            };
            $scope.findUpcomingMeetings = function (meetingList) {
                //search for upcoming Meetings
                $scope.upcomingMeetings = meetingList;
            };

            $scope.getNotifications = function () {
                return $rootScope.notifications;
            };
            //$rootScope.changeToolBar("<div>IF NEEDED TOOLBAR</div>");

        }])
    .controller('DashboardCalendarCtrl', ['$scope', '$compile', "uiCalendarConfig",
        function ($scope, $compile, uiCalendarConfig) {
            var date = new Date();
            var d = date.getDate();
            var m = date.getMonth();
            var y = date.getFullYear();



            /* event source that contains custom events on the scope */



            /* event source that calls a function on every view switch */
            $scope.eventsF = function (start, end, timezone, callback) {
                var s = new Date(start).getTime() / 1000;
                var e = new Date(end).getTime() / 1000;
                var m = new Date(start).getMonth();
                var events = [{
                    title: 'Feed Me ' + m,
                    start: s + (50000),
                    end: s + (100000),
                    allDay: false,
                    className: ['customFeed']
                }];
                callback(events);
            };

            $scope.calEventsExt = {
                color: '#f00',
                textColor: 'yellow',
                events: [
                    {
                        type: 'party',
                        title: 'Lunch',
                        start: new Date(y, m, d, 12, 0),
                        end: new Date(y, m, d, 14, 0),
                        allDay: false
                    },
                    {
                        type: 'party',
                        title: 'Lunch 2',
                        start: new Date(y, m, d, 12, 0),
                        end: new Date(y, m, d, 14, 0),
                        allDay: false
                    },
                    {
                        type: 'party',
                        title: 'Click for Google',
                        start: new Date(y, m, 28),
                        end: new Date(y, m, 29),
                        url: 'http://google.com/'
                    }
                ]
            };
            /* alert on eventClick */
            $scope.alertOnEventClick = function (date, jsEvent, view) {
                $scope.alertMessage = (date.title + ' was clicked ');
            };
            /* alert on Drop */
            $scope.alertOnDrop = function (event, delta, revertFunc, jsEvent, ui, view) {
                $scope.alertMessage = ('Event Droped to make dayDelta ' + delta);
            };
            /* alert on Resize */
            $scope.alertOnResize = function (event, delta, revertFunc, jsEvent, ui, view) {
                $scope.alertMessage = ('Event Resized to make dayDelta ' + delta);
            };
            /* add and removes an event source of choice */
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
            /* add custom event*/
            $scope.addEvent = function () {
                $scope.events.push({
                    title: 'Open Sesame',
                    start: new Date(y, m, 28),
                    end: new Date(y, m, 29),
                    className: ['openSesame']
                });
            };

            /* Change View */
            $scope.changeView = function (view, calendar) {
                uiCalendarConfig.calendars[calendar].fullCalendar('changeView', view);
            };
            /* Change View */
            $scope.renderCalender = function (calendar) {
                if (uiCalendarConfig.calendars[calendar]) {
                    uiCalendarConfig.calendars[calendar].fullCalendar('render');
                }
            };
            /* Render Tooltip */
            $scope.eventRender = function (event, element, view) {
                element.attr({
                    'tooltip': event.title,
                    'tooltip-append-to-body': true
                });
                $compile(element)($scope);
            };
            $scope.locale = "de";
            /* config object */
            $scope.uiConfig = {
                calendar: {
                    height: 450,
                    editable: false,
                    firstDay: 1,
                    header: {
                        left: 'title',
                        center: '',
                        right: 'today prev,next'
                    },
                    eventClick: $scope.alertOnEventClick,
                    eventDrop: $scope.alertOnDrop,
                    eventResize: $scope.alertOnResize,
                    eventRender: $scope.eventRender
                }
            };

            $scope.changeLang = function () {
                if ($scope.changeTo === 'Hungarian') {
                    $scope.uiConfig.calendar.dayNames = ["Vasárnap", "Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat"];
                    $scope.uiConfig.calendar.dayNamesShort = ["Vas", "Hét", "Kedd", "Sze", "Csüt", "Pén", "Szo"];

                } else {
                    $scope.uiConfig.calendar.dayNames = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
                    $scope.uiConfig.calendar.dayNamesShort = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];

                }
            };
            $scope.changeTo = "German";
            $scope.changeLang();

            /* event sources array*/
            $scope.eventSources = [$scope.events, $scope.eventsF];
            $scope.eventSources2 = [$scope.calEventsExt, $scope.eventsF, $scope.events];
        }]);