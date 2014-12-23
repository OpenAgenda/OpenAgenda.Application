/**
 * This Module defines custom Factories to use in the whole application
 *
 * @author Thomas Winkler <thomas.winkler@hof-university.de>
 */

angular.module("CommonFactories", [])
    .factory('CommonHelperMethods', function () {
        return {
            // @deprecated Not used anymore
            getDateFromJSONString: function (string) {
                return new Date(string);
            }
        };
    })
    .factory('CommonResourceHelper', ['$resource', function ($resource) {
        return {
            getPersonalInfos: function () {
                return $resource('dashboard/index.json', {}, {
                    get: {method: 'GET'}
                });
            }
        };

    }])
    .factory('MeetingResourceHelper', ['$resource', function ($resource) {
        return {
            getMeetingList: function () {
                return $resource('meeting/list.json', {}, {
                    query: {method: 'GET', isArray: true}
                });
            },
            getMeetingDetail: function (id) {
                return $resource('meeting/:meetingId/show.json', {meetingId: id}, {
                    get: {method: 'GET'}
                });
            }
        };

    }])
    .factory('TaskResourceHelper', ['$resource', function ($resource) {
        return {
            getTaskList: function (all) {
                if(all)
                    return $resource('task/listothers.json', {}, {
                        query: {method: 'GET', isArray: true}
                });
                else
                    return $resource('task/listmine.json', {}, {
                        query: {method: 'GET', isArray: true}
                    });
            },
            getMyTaskList: function () {
                return $resource('task/listmine.json', {}, {
                    query: {method: 'GET', isArray: true}
                });
            },
            getOthresTaskList: function () {
                return $resource('task/listothres.json', {}, {
                    query: {method: 'GET', isArray: true}
                });
            },
            getTaskDetail: function (id) {
                return $resource('task/:taskId/show.json', {taskId: id}, {
                    get: {method: 'GET'}
                });
            }
        };
    }])
    /*
     * This Method is used to indicate the Help feature in this version of OpenAgenda.
     */
    .factory('Help', ['$location','ModalDialog', function ($location, ModalDialog) {
        return {
            show: function (){
                var path = $location.path();
                var url = '/template/modaldialog/generichelp.html';

                if("/dashboard" == path)
                    url = '/template/modaldialog/generichelp.html';
                if("/meeting" == path)
                    url = '/template/modaldialog/generichelp.html';

                var modalDefaults = {
                        templateUrl: url
                };
                ModalDialog.showModal(modalDefaults, {});
            }
        };
    }]);

