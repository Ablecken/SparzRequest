const angular = require('angular');
angular.module('sparzrequest')
	.factory('RequestService', function($http, $q, config) {
		const send = function(url, method, data) {			
			const deferred = $q.defer();
			$http({ url, method, data })
			.then(function success(ret) {
				deferred.resolve(ret.data);
			}, function error(err) {
				deferred.reject(err);
			});
			return deferred.promise;
		};
		return {
			get(includeClosed) {
				let url = config.routes.api.request;
				if (includeClosed) {
					url += '?includeClosed=yes';
				}
				return send(url, 'GET');
			},
			create(name, requestType, year, isOngoing) {
				return send(config.routes.api.request, 'POST', { name, requestType, year, isOngoing });
			},
			save(request, id) {
				return send(`${config.routes.api.request}/${id}`, 'PUT', request);
			},
			delete(id) {
				return send(`${config.routes.api.request}/${id}`, 'DELETE');
			}
		};
	})
	.factory('LoginService', function($http, $q, $rootScope, config) {
		const send = function(url, method, data) {			
			const deferred = $q.defer();
			$http({ url, method, data })
			.then(function success(ret) {
				deferred.resolve(ret.data);
			}, function error(err) {
				deferred.reject(err);
			});
			return deferred.promise;
		};
		return {
			login(userName, password) {
				return send(`${config.routes.api.auth}`, 'POST', { userName, password });
			}
		};
	});
