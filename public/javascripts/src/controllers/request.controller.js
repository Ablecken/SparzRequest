const angular = require('angular');
angular.module('sparzrequest')
	.controller('requestController', function($rootScope, $scope, $window, $cookies, config, RequestService) {
		$scope.requests = [];
		$scope.name;
		$scope.requestType;
		$scope.year;
		$scope.isOngoing = false;
		$scope.showClosed = false;
		$scope.requestTypes = [
			{ value: 'Unknown', text: 'Unknown' },
			{ value: 'Movie', text: 'Movie' },
			{ value: 'Series', text: 'Series' },
			{ value: 'Documentary', text: 'Documentary' },
			{ value: 'Anime', text: 'Anime' },
			{ value: 'Other', text: 'Other' }
		];
		$scope.statusTypes = [
			{ value: 'Requested', text: 'Requested' },
			{ value: 'Downloading', text: 'Downloading' },
			{ value: 'Completed', text: 'Completed' },
			{ value: 'NotFound', text: 'Not Found' },
			{ value: 'OnHold', text: 'On Hold' },
			{ value: 'AlreadyAvailable', text: 'Already Available' }
		];

		$scope.refresh = function() {
			RequestService.get($scope.showClosed)
				.then(function(ret) {
					$scope.requests = ret;
				}, angular.noop);			
		};

		$scope.saveRequest = function(request, id) {
			RequestService.save(request, id)
				.then(angular.noop(), angular.noop());
		};

		$scope.createRequest = function() {
			RequestService.create($scope.name, $scope.requestType, $scope.year, $scope.isOngoing)
				.then(function(ret) {
					$scope.requests.push(ret);
				}, angular.noop)
				.then($scope.clearRequest);
		};

		$scope.complete = function(request) {
			request.statusType = 'Completed';
			$scope.saveRequest(request, request._id);
		};

		$scope.clearRequest = function() {
			$scope.name = '';
			$scope.requestType = '';
			$scope.year = '';
			$scope.isOngoing = false;
			$scope.requestedBy = '';
		};

		$scope.isMarkedComplete = function(request) {
			return request.statusType === 'Completed' || request.statusType === 'NotFound' || request.statusType === 'AlreadyAvailable';
		};

		$scope.deleteRequest = function(request) {
			RequestService.delete(request._id)
				.then(function() {
					RequestService.get(true)
						.then(function(ret) {
							$scope.requests = ret;
						}, angular.noop);
				}, angular.noop);
		};

		$scope.isAdmin = function() {
			const auth = JSON.parse($cookies.get(config.authCookie));
			return auth.isAdmin;
		};

		$rootScope.loading = false;
		$scope.refresh();
	});