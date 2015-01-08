/**
 * @module CommonDirectives
 *
 * @description This Module defines Directives for changing the HTML Output
 *
 * Use it as HTML-Tags
 * Examples:
 * <td task-status="true"></td>
 *
 * Note: Specify a value the attributes to fulfill the XHTML Standard
 *
 * @author Thomas Winkler <thomas.winkler@hof-university.de>
 */


angular.module("CommonDirectives", [])

    /**
     * Retrieves JSON person data from by given entity identifier.
     *
     * @example
     *        <div oa-person-resolver="someScopeVariable.identity as person">
     *          {{person.name.firstName}} {{person.name.lastName}}
     *        </div>
     * @author Oliver Hader <oliver@typo3.org>
     * @function directive
     * @param  {string} "oaPersonResolver" Identifier
     * @param {function} function($parse,$http)
     * @note Scoping in AngularJS' modal windows is tricky and won't work out of the box!
     */
    .directive('oaPersonResolver', function($parse, $http) {
        function resolveScope(scope, attr) {
            var resolvedScope = null;

            if (attr.oaScope) {
                resolvedScope = $parse(attr.oaScope)(scope);
            }
            if (!resolvedScope) {
                resolvedScope = scope;
            }

            return resolvedScope;
        }

        function parseComponents(expression) {
            var matches = expression.match(/^(.+) as (.+)$/i);
            if (matches !== null) {
                return {
                    source: matches[1],
                    target: matches[2]
                };
            }
            if (console) {
                console.error('oaPersonResolver expression "' + expression +'" did not match expected format "<source> as <target>');
                return null;
            }
        }

        return {
            link: function(scope, element, attr) {
                var $scope = resolveScope(scope, attr);
                var components = parseComponents(attr.oaPersonResolver);
                if (components === null) {
                    return;
                }
                $http.get('person/' + $parse(components.source)($scope) + '/show.json')
                    .success(function(person) {
                        $scope[components.target] = person;
                    });
            }
        };
    })
    /**
     * @description Changes the output for the Task Status.
     * @author Thomas Winkler <thomas.winkler@hof-university.de>
     * @function directive
     * @param  {string} "taskStatus" Identifier
     * @param {function} function()
     *
     * @example <td task-status="true"></td>
     */
    .directive('taskStatus', function () {

        return {
            template: '<span ng-switch="task.status"> ' +
            '<span ng-switch-when="0">Laufend</span> ' +
            '<span ng-switch-when="1">Abgeschlossen</span> ' +
            '<span ng-switch-when="2">Abgebrochen</span> ' +
            '<span ng-switch-default>Unbekannt</span> ' +
            '</span>'
        };
    })
    /**
     * @description Changes the output for the Meeting Status.
     * @author Andreas Weber <andreas.weber@hof-university.de>
     * @function directive
     * @param  {string} "meetingStatus" Identifier
     * @param {function} function()
     *
     * @example <td meeting-status="true"></td>
     */
    .directive('meetingStatus', function () {

        return {
            template: '<span ng-switch="meeting.status"> ' +
            '<span ng-switch-when="0">Vorgeplant</span> ' +
            '<span ng-switch-when="1">Geplant</span> ' +
            '<span ng-switch-when="2">Läuft</span> ' +
            '<span ng-switch-when="3">Abgeschlossen</span> ' +
            '<span ng-switch-when="4">Abgesagt</span> ' +
            '<span ng-switch-default>Unbekannt</span> ' +
            '</span>'
        };
    })
    /**
     * @description Changes the HTML-Output for the Invitation Status.
     * @author Thomas Winkler <thomas.winkler@hof-university.de>
     * @function directive
     * @param  {string} "invitationStatus" Identifier
     * @param {function} function()
     *
     * @example <td invitation-status="true"></td>
     */
    .directive('invitationStatus', function () {

        return {
            template: '<span ng-switch="invitation.status"> ' +
            '<span ng-switch-when="0">Ausstehend</span> ' +
            '<span ng-switch-when="1">Zugesagt</span> ' +
            '<span ng-switch-when="2">Abgesagt</span> ' +
            '</span>'
        };
    })
    /**
     * @description Changes the mouse pointer to a little hand, if a HTML-element triggers an action.
     * @author Thomas Winkler <thomas.winkler@hof-university.de>
     * @function directive
     * @param  {string} "pointMe" Identifier
     * @param {function} function()
     *
     * @example <td point-me="true"></td>
     */
    .directive("pointMe", function () {
        return {
            restrict: "AC",
            link: function (scope, element, attrs) {

                element.css("cursor", "pointer");

            }
        };
    })
    /**
     * @description This directive is used, to add optimize the double-click/tap-behavior
     * @author Thomas Winkler <thomas.winkler@hof-university.de>
     * @function directive
     * @param  {string} "timedClick" Identifier
     * @param {function} function()
     *
     * @example <td timed-click="true"></td>
    */
    .directive('timedClick', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                var fn = $parse(attr['timedClick']);
                var delay = 200, clicks = 0, timer = null;
                element.on('click', function (event) {
                    clicks++;  //count clicks
                    if (clicks === 1) {
                        timer = setTimeout(function () {
                            scope.$apply(function () {
                                fn(scope, {$event: event});
                            });
                            clicks = 0;
                        }, delay);
                    } else {
                        clearTimeout(timer);
                        clicks = 0;
                    }
                });
            }
        };
    }]);

