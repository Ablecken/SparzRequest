const angular = require('angular');
angular.module('sparzrequest')
	.controller('loginController', function($rootScope, $scope, $window, $cookies, config, LoginService) {
		$scope.userName;
		$scope.password;
		$scope.hasError = false;

		$scope.login = function() {
			$scope.hasError = false;
			LoginService.login($scope.userName, $scope.password)
				.then(function(resp) {
					const auth = {
						userName: resp.userName,
						token: resp.token,
						isAdmin: resp.isAdmin,
						isAuthenticated: true
					};
					$cookies.remove(config.authCookie);
					$cookies.putObject(config.authCookie, auth);

					$window.location.href = `${config.routes.pages.request}`;
				}, function() {
					$scope.hasError = true;
				});
		};

		$rootScope.loading = false;
	});