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
			{ value: 'NotFound', text: 'NotFound' },
			{ value: 'OnHold', text: 'OnHold' },
			{ value: 'AlreadyAvailable', text: 'AlreadyAvailable' }
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

		};

		$rootScope.loading = false;
	});