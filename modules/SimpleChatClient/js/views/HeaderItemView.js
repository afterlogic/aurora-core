'use strict';

var
	TextUtils = require('modules/Core/js/utils/Text.js'),
	
	CHeaderItemView = require('modules/Core/js/views/CHeaderItemView.js'),
	HeaderItemView = new CHeaderItemView(TextUtils.i18n('SIMPLECHAT/ACTION_SHOW_CHAT'))
;

module.exports = HeaderItemView;