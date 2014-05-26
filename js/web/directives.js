// override the default input to update on blur
var myApp = angular.module('myApp');

myApp.directive('ngModelOnblur', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, elm, attr, ngModelCtrl) {
            if (attr.type === 'radio' || attr.type === 'checkbox')
                return;

            elm.unbind('input').unbind('keydown').unbind('change');
            elm.bind('blur', function() {
                scope.$apply(function() {
                    ngModelCtrl.$setViewValue(elm.val());
                });
            });
        }
    };
});

myApp.directive('compileData', function($compile) {
    return {
        scope: true,
        link: function(scope, element, attrs) {
            var elmnt;
            attrs.$observe('template', function(myTemplate) {
                if (angular.isDefined(myTemplate)) {
                    // compile the provided template against the current scope
                    elmnt = $compile(myTemplate)(scope);

                    element.html(""); // dummy "clear"

                    element.append(elmnt);
                }
            });
        }
    };
});