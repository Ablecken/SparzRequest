require('../../stylesheets/site.css');

//const $ = global.$ = global.jQuery = require('jquery'); // eslint-disable-line no-unused-vars
require('angular');
require('angular-cookies');
require('angular-xeditable');


require('./main.js');

require('./services.js');
require('./directives/confirm-click.directive.js');

require('./controllers/login.controller.js');
require('./controllers/request.controller.js');

