/**
 * Created by Thomas on 02.12.14.
 */
/**
 * Created by Thomas on 27.11.14.
 */
angular.module("Meeting")
    .controller('MeetingEditCtrl', ['$scope', '$rootScope', '$routeParams', '$resource', "breadcrumbs", 'FileUploader', "MeetingDetail", 'CommonHelperMethods',
        function ($scope, $rootScope, $routeParams, $resource, breadcrumbs, FileUploader, MeetingDetail, CommonHelperMethods) {
            $scope.breadcrumbs = breadcrumbs;
            console.log("Create meeting Conroller loaded");
            $scope.headerTitle = "Meeting anlegen";

            $scope.meetingId = $routeParams.meetingId;
            $scope.uploaders = [];


            if (typeof $scope.meetingId != "undefined") {
                $scope.headerTitle = "Meeting bearbeiten";
                $scope.meeting = MeetingDetail($routeParams.meetingId).get(function (data) {
                    data.scheduledStartDate = CommonHelperMethods.getDateFromJSONString(data.scheduledStartDate);
                console.log('success, got data: ', data);

                    for(var i = 0; i<= $scope.meeting.agendaItems.length; i++)
                    {
                        if (typeof $scope.uploaders[i] === "undefined") {
                            $scope.uploaders.push(new FileUploader());
                        }
                    }
                }, function (err) {
                    alert('request failed');
                });
            }

            function agendaItem(sorting) {
                this.__identity = "38fa3590-9095-c080-da99-c15f1710cfed";
                this.title;
                this.description;
                this.creationDate;
                this.modificationDate;
                this.sorting = sorting;
                this.resources = [];

                $scope.uploaders.push(new FileUploader());
            };

            function meeting() {
                this.__identity = "66d16457-2ebf-9a70-4368-dc73a0fd9edb";
                this.creationDate = new Date();
                this.endDate = null;
                this.modificationDate = new Date();
                this.scheduledStartDate = new Date();
                this.startDate = "'2015-01-05T12:00:00+01:00'";
                this.status = 0;
                this.title = null;
                this.place = null;
                this.agendaItems = [new agendaItem(1)];
                this.invitations = [];
            };

            function invitation(mail) {
                this.id = "USERID";
                this.mail = mail;
            };

            if (typeof $scope.meeting === "undefined") {
                $scope.meeting = new meeting();
                console.log("Meeting ist undefinded");
            }

            $scope.addNewAgendaItem = function () {
                $scope.meeting.agendaItems.push(new agendaItem($scope.meeting.agendaItems.length + 1));
            };

            $scope.addNewInvitation = function (mail) {
                $scope.meeting.invitations.push(new invitation(mail))

            };
            $scope.deleteInvitation = function (idx) {
                $scope.meeting.invitations.splice(idx, 1);
            };

            $scope.$watchCollection('meeting', function (newValue, oldValue) {
                console.log(newValue);
            });

            $scope.sendMeetingData = function () {
                console.log( $scope.uploaders);
            };

            $scope.getUploader = function (idx) {
                return  $scope.uploaders[idx];
            }
        }]);
