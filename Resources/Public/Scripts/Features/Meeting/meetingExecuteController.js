/**
 * Created by Andi on 09.12.14.
 */

angular.module("Meeting")
    .controller('MeetingExecuteCtrl', ['$scope', '$rootScope', '$filter','$routeParams', '$resource', "breadcrumbs", "MeetingResourceHelper", "CommonHelperMethods",
    function ($scope, $rootScope, $filter, $routeParams, $resource, breadcrumbs, MeetingResourceHelper, CommonHelperMethods) {
        $scope.meetingId = $routeParams.meetingId;
        console.log($routeParams.meetingId);
        $scope.breadcrumbs = breadcrumbs;

        $scope.meeting = MeetingResourceHelper.getMeetingDetail($routeParams.meetingId).get(function (data) {
            console.log('Execute success, got data: ', data);
            console.log('datum', data.startDate);
            if (data.startDate)
            {
                data.startDate = CommonHelperMethods.getDateFromJSONString(data.startDate);
            }

            data.scheduledStartDate = CommonHelperMethods.getDateFromJSONString(data.scheduledStartDate);

        }, function (err) {
            alert('request failed');
        });

        $scope.task;

        $scope.getProtocolItem = function(sorting){
            var found = false;
            for (var i = 0; $scope.meeting.protocolItems.length; i++)
            {
                if ($scope.meeting.protocolItems[i].sorting == sorting)
                {
                    found = true;
                    return $scope.meeting.protocolItems[i];
                }
            }
            if(!found)
            {
                //add new Item
                var newProtocolItem = function ProtocollItem(sorting) {
                    this.__identity;
                    this.description=null;
                    this.creationDate = new Date();
                    this.modificationDate;
                    this.sorting = sorting;
                }
                $scope.meeting.protocolItems.push(newProtocolItem);
                return newProtocolItem;
            }
        };

        $scope.imgTask = {

        };

        $scope.invitedUsers = [
            {value: 1, text: 'tt@tt.de'},
            {value: 2, text: 'xx@tt.de'},
            {value: 3, text: 'txxt@tt.de'},
            {value: 4, text: 'tfggt@tt.de'}
        ];

        $scope.showStatus = function() {
            var selected = $filter('filter')($scope.invitedUsers, {value: $scope.imgTask.user});
            return ($scope.imgTask.user && selected.length) ? selected[0].text : 'Verantwortlichen wählen';
        };

        $scope.startMeetng = function(){
            if ($scope.meeting.status < 2)
            {
                $scope.meeting.startDate = new Date();
                $scope.meeting.status = 2;
            }

        };
        $scope.endMeetng = function(){
            if ($scope.meeting.status < 3)
            {
                $scope.meeting.endDate = new Date();
                $scope.meeting.status = 3;
            }
        };

    }]);