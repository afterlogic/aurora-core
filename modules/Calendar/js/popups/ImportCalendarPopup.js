'use strict';

var
	ko = require('knockout'),
	_ = require('underscore'),
	$ = require('jquery'),
	
	Utils = require('core/js/utils/Common.js'),
	TextUtils = require('core/js/utils/Text.js'),
	App = require('core/js/App.js'),
	Screens = require('core/js/Screens.js'),
	UserSettings = require('core/js/Settings.js'),
	CJua = require('core/js/CJua.js'),
	CAbstractPopup = require('core/js/popups/CAbstractPopup.js')
;

/**
 * @constructor
 */
function CImportCalendarPopup()
{
	CAbstractPopup.call(this);
	
	this.fCallback = null;
	
	this.oJua = null;
	this.allowDragNDrop = ko.observable(false);
	
	this.importing = ko.observable(false);

	this.color	= ko.observable('');
	this.calendarId	= ko.observable('');
}

_.extendOwn(CImportCalendarPopup.prototype, CAbstractPopup.prototype);

CImportCalendarPopup.prototype.PopupTemplate = 'Calendar_ImportCalendarPopup';

/**
 * @param {Function} fCallback
 * @param {Object} oCalendar
 */
CImportCalendarPopup.prototype.onShow = function (fCallback, oCalendar)
{
	if ($.isFunction(fCallback))
	{
		this.fCallback = fCallback;
	}
	if (!Utils.isUnd(oCalendar))
	{
		this.color(oCalendar.color ? oCalendar.color() : '');
		this.calendarId(oCalendar.id ? oCalendar.id : '');
	}
};

/**
 * @param {Object} $oViewModel
 */
CImportCalendarPopup.prototype.onBind = function ($oViewModel)
{
	var self = this;
	this.oJua = new CJua({
		'action': '?/Upload/Calendars/',
		'name': 'jua-uploader',
		'queueSize': 1,
		'clickElement': $('#jue_import_button', $oViewModel),
		'hiddenElementsPosition': UserSettings.IsRTL ? 'right' : 'left',
		'disableAjaxUpload': false,
		'disableDragAndDrop': true,
		'disableMultiple': true,
		'hidden': {
			'Token': function () {
				return UserSettins.CsrfToken;
			},
			'AccountID': function () {
				return App.currentAccountId();
			},
			'AdditionalData':  function () {
				return JSON.stringify({
					'CalendarID': self.calendarId()
				});
			}
		}
	});

	this.oJua
		.on('onStart', _.bind(this.onFileUploadStart, this))
		.on('onComplete', _.bind(this.onFileUploadComplete, this))
	;
	
	this.allowDragNDrop(this.oJua.isDragAndDropSupported());
};

CImportCalendarPopup.prototype.onFileUploadStart = function ()
{
	this.importing(true);
};

/**
 * @param {string} sFileUid
 * @param {boolean} bResponseReceived
 * @param {Object} oResponse
 */
CImportCalendarPopup.prototype.onFileUploadComplete = function (sFileUid, bResponseReceived, oResponse)
{
	var bError = !bResponseReceived || !oResponse || oResponse.Error|| oResponse.Result.Error || false;

	if (!bError)
	{
		this.importing(false);
		this.fCallback();
		this.closePopup();
	}
	else
	{
		if (oResponse.ErrorCode && oResponse.ErrorCode === Enums.Errors.IncorrectFileExtension)
		{
			Screens.showError(TextUtils.i18n('CONTACTS/ERROR_INCORRECT_FILE_EXTENSION'));
		}
		else
		{
			Screens.showError(TextUtils.i18n('WARNING/ERROR_UPLOAD_FILE'));
		}
	}
};

module.exports = new CImportCalendarPopup();