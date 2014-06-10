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

myApp.directive('focusMe', function($timeout, $parse) {
    return {
        //scope: true,   // optionally create a child scope
        link: function(scope, element, attrs) {
            var model = $parse(attrs.focusMe);
            scope.$watch(model, function(value) {
//                console.log('value=', value);
                if (value === true) {
                    $timeout(function() {
                        element[0].focus();
                    });
                }
            });
            // to address @blesh's comment, set attribute value to 'false'
            // on blur event:
            element.bind('blur', function() {
                console.log('blur');
                scope.$apply(model.assign(scope, false));
            });
        }
    };
});