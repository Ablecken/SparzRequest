const angular = require('angular');
angular.module('sparzrequest', ['xeditable', 'ngCookies'])
	.constant('config', {
		routes: {
			authCookie: 'auth',
			api: {
				request: '/api/requests/',
				auth: '/api/auth'
			},
			pages: {
				login: '/',
				request: '/request'
			}
		}
	})
	.run(function($rootScope, $cookies, config, editableOptions) {
		editableOptions.theme = 'bs3';
		$rootScope.version = '0.1.0';
		$rootScope.madeWith = '';
		$rootScope.loading = true;

		const auth = $cookies.getObject(config.authCookie);
		$rootScope.auth = auth;
	});