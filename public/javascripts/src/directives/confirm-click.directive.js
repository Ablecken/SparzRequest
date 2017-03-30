const angular = require('angular');

angular.module('sparzrequest')
	.directive('confirmClick', function() {
		return {
			link(scope, element, attr) {
				const msg = attr.confirmClick || 'Are you sure?';
				const clickAction = attr.confirmedClick;
				element.bind('click', function() {
					if (window.confirm(msg)) {
						scope.$eval(clickAction);
					}
				});
			}
		};
	});