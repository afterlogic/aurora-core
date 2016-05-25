'use strict';

var
	_ = require('underscore'),
	ko = require('knockout'),
	
	AddressUtils = require('modules/Core/js/utils/Address.js'),
	TextUtils = require('modules/Core/js/utils/Text.js'),
	Types = require('modules/Core/js/utils/Types.js'),
	
	Api = require('modules/Core/js/Api.js'),
	ModulesManager = require('modules/Core/js/ModulesManager.js'),
	Screens = require('modules/Core/js/Screens.js'),
	
	CAbstractSettingsFormView = ModulesManager.run('Settings', 'getAbstractSettingsFormViewClass'),
	
	Popups = require('modules/Core/js/Popups.js'),
	AlertPopup = require('modules/Core/js/popups/AlertPopup.js'),
	
	AccountList = require('modules/Mail/js/AccountList.js'),
	Ajax = require('modules/Mail/js/Ajax.js')
;

/**
 * @constructor
 */
function CAccountForwardPaneView()
{
	CAbstractSettingsFormView.call(this, 'Mail');
	
	this.enable = ko.observable(false);
	this.email = ko.observable('');
	this.emailFocus = ko.observable(false);

	AccountList.editedId.subscribe(function () {
		this.populate();
	}, this);
	this.populate();
}

_.extendOwn(CAccountForwardPaneView.prototype, CAbstractSettingsFormView.prototype);

CAccountForwardPaneView.prototype.ViewTemplate = 'Mail_Settings_AccountForwardPaneView';

CAccountForwardPaneView.prototype.getCurrentValues = function ()
{
	return [
		this.enable(),
		this.email()
	];
};

CAccountForwardPaneView.prototype.revert = function ()
{
	this.populate();
};

CAccountForwardPaneView.prototype.getParametersForSave = function ()
{
	var oAccount = AccountList.getEdited();
	return {
		'AccountID': oAccount.id(),
		'Enable': this.enable() ? '1' : '0',
		'Email': this.email()
	};
};

CAccountForwardPaneView.prototype.applySavedValues = function (oParameters)
{
	var
		oAccount = AccountList.getEdited(),
		oForward = oAccount.forward()
	;
	
	if (oForward)
	{
		oForward.enable = oParameters.Enable === '1';
		oForward.email = oParameters.Email;
	}
};

CAccountForwardPaneView.prototype.save = function ()
{
	var
		fSaveData = function() {
			this.isSaving(true);

			this.updateSavedState();

			Ajax.send('UpdateForward', this.getParametersForSave(), this.onResponse, this);
		}.bind(this)
	;

	if (this.enable() && this.email() === '')
	{
		this.emailFocus(true);
	}
	else if (this.enable() && this.email() !== '')
	{
		if (!AddressUtils.isCorrectEmail(this.email()))
		{
			Popups.showPopup(AlertPopup, [TextUtils.i18n('MAIL/ERROR_INPUT_CORRECT_EMAILS') + ' ' + this.email()]);
		}
		else
		{
			fSaveData();
		}
	}
	else
	{
		fSaveData();
	}
};

/**
 * @param {Object} oResponse
 * @param {Object} oRequest
 */
CAccountForwardPaneView.prototype.onResponse = function (oResponse, oRequest)
{
	this.isSaving(false);

	if (oResponse.Result === false)
	{
		Api.showErrorByCode(oResponse, TextUtils.i18n('CORE/ERROR_SAVING_SETTINGS_FAILED'));
	}
	else
	{
		var oParameters = JSON.parse(oRequest.Parameters);
		
		this.applySavedValues(oParameters);
		
		Screens.showReport(TextUtils.i18n('MAIL/REPORT_FORWARD_UPDATE_SUCCESS'));
	}
};

CAccountForwardPaneView.prototype.populate = function ()
{
	var oAccount = AccountList.getEdited();
	
	if (oAccount)
	{
		if (oAccount.forward() !== null)
		{
			this.enable(oAccount.forward().enable);
			this.email(oAccount.forward().email);
		}
		else
		{
			Ajax.send('GetForward', {'AccountID': oAccount.id()}, this.onGetForwardResponse, this);
		}
	}
	
	this.updateSavedState();
};

/**
 * @param {Object} oResponse
 * @param {Object} oRequest
 */
CAccountForwardPaneView.prototype.onGetForwardResponse = function (oResponse, oRequest)
{
	if (oResponse && oResponse.Result)
	{
		var
			oParameters = JSON.parse(oRequest.Parameters),
			iAccountId = Types.pInt(oParameters.AccountID),
			oAccount = AccountList.getAccount(iAccountId),
			oForward = new CForwardModel()
		;

		if (oAccount)
		{
			oForward.parse(iAccountId, oResponse.Result);
			oAccount.forward(oForward);

			if (iAccountId === AccountList.editedId())
			{
				this.populate();
			}
		}
	}
};

module.exports = new CAccountForwardPaneView();
