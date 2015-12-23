'use strict';

module.exports = function (oSettings) {
	require('modules/Contacts/js/BaseTabExtMethods.js');
	
	var
		_ = require('underscore'),
		$ = require('jquery'),
		
		TextUtils = require('core/js/utils/Text.js'),
		Settings = require('modules/Contacts/js/Settings.js'),
		
		ManagerComponents = require('modules/Contacts/js/manager-components.js'),
		ComponentsMethods = ManagerComponents(),
		fComponentsStart = ComponentsMethods.start
	;

	Settings.init(oSettings);
	
	return _.extend(ComponentsMethods, {
		start: function (ModulesManager) {
			ModulesManager.run('Settings', 'registerSettingsTab', [function () { return require('modules/Contacts/js/views/ContactsSettingsTabView.js'); }, 'contacts', TextUtils.i18n('TITLE/CONTACTS')]);
			if ($.isFunction(fComponentsStart))
			{
				fComponentsStart(ModulesManager);
			}
		},
		screens: {
			'main': function () {
				return require('modules/Contacts/js/views/ContactsView.js');
			}
		},
		getHeaderItem: function () {
			return require('modules/Contacts/js/views/HeaderItemView.js');
		},
		isGlobalContactsAllowed: function () {
			return Settings.Storages.indexOf('global') !== -1;
		}
	});
};
