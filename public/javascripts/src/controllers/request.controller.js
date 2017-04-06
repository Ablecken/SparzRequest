const angular = require('angular');
angular.module('sparzrequest')
	.controller('requestController', function($rootScope, $scope, $window, config, RequestService) {
		$scope.requests = [];
		$scope.name;
		$scope.requestType;
		$scope.year;
		$scope.isOngoing = false;
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

		RequestService.get(true)
			.then(function(ret) {
				$scope.requests = ret;
			}, angular.noop);

		$scope.saveRequest = function(request, id) {
			RequestService.save(request, id)
				.then(function(ret) {

				}, function(err) {
					
				});
		};

		$scope.createRequest = function() {
			RequestService.create($scope.name, $scope.requestType, $scope.year, $scope.isOngoing)
				.then(function(ret) {
					$scope.requests.push(ret);
				}, angular.noop)
				.then($scope.clearRequest);
		};

		$scope.clearRequest = function() {
			$scope.name = '';
			$scope.requestType = '';
			$scope.year = '';
			$scope.isOngoing = false;
			$scope.requestedBy = '';
		};

		$scope.deleteRequest = function(request) {
			RequestService.delete(request._id)
				.then(function() {
					const item = $scope.requests.filter(function(element) {
						return (element._id === request._id);
					});
					$scope.requests.splice($scope.requests.indexOf(item), 1);
				}, angular.noop);
		};

		$rootScope.loading = false;
	});