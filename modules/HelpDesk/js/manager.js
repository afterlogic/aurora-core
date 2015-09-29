'use strict';

require('modules/Helpdesk/js/enums.js');

var
	HeaderItemView = require('modules/Helpdesk/js/views/HeaderItemView.js'),
	Settings = require('modules/Helpdesk/js/Settings.js')
;

module.exports = function (oSettings) {
	Settings.init(oSettings);
	
	return {
		screens: {
			'main': require('modules/Helpdesk/js/views/CHelpdeskView.js')
		},
		headerItem: HeaderItemView
	};
};