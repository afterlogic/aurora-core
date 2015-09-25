'use strict';

var
	_ = require('underscore'),
	ko = require('knockout'),
	
	Utils = require('core/js/utils/Common.js'),
	TextUtils = require('core/js/utils/Text.js'),
	UserSettings = require('core/js/Settings.js'),
	Screens = require('core/js/Screens.js'),
	
	ErrorsUtils = require('modules/OpenPgp/js/utils/Errors.js'),
	OpenPgp = require('modules/OpenPgp/js/OpenPgp.js'),
	Enums = require('modules/OpenPgp/js/Enums.js')
;

/**
 * @constructor
 */
function CEncryptPopup()
{
	this.data = ko.observable('');
	this.fromEmail = ko.observable('');
	this.emails = ko.observableArray([]);
	this.okCallback = null;
	this.cancelCallback = null;
	this.sign = ko.observable(true);
	this.password = ko.observable('');
	this.passwordFocused = ko.observable(false);
	this.encrypt = ko.observable(true);
	this.signEncryptButtonText = ko.computed(function () {
		var sText = TextUtils.i18n('OPENPGP/BUTTON_SIGN_ENCRYPT');
		if (this.sign() && !this.encrypt())
		{
			sText = TextUtils.i18n('OPENPGP/BUTTON_SIGN');
		}
		if (!this.sign() && this.encrypt())
		{
			sText = TextUtils.i18n('OPENPGP/BUTTON_ENCRYPT');
		}
		return sText;
	}, this);
	this.isEnableSignEncrypt = ko.computed(function () {
		return this.sign() || this.encrypt();
	}, this);
	this.signEncryptCommand = Utils.createCommand(this, this.executeSignEncrypt, this.isEnableSignEncrypt);
	this.signAndSend = ko.observable(false);
}

CEncryptPopup.prototype.PopupTemplate = 'OpenPgp_EncryptPopup';

/**
 * @param {string} sData
 * @param {string} sFromEmail
 * @param {Array} aEmails
 * @param {boolean} bSignAndSend
 * @param {Function} fOkCallback
 * @param {Function} fCancelCallback
 */
CEncryptPopup.prototype.onShow = function (sData, sFromEmail, aEmails, bSignAndSend, fOkCallback, fCancelCallback)
{
	this.data(sData);
	this.fromEmail(sFromEmail);
	this.emails(aEmails);
	this.okCallback = fOkCallback;
	this.cancelCallback = fCancelCallback;
	this.sign(true);
	this.password('');
	this.encrypt(!bSignAndSend);
	this.signAndSend(bSignAndSend);
};

CEncryptPopup.prototype.executeSignEncrypt = function ()
{
	var
		sData = this.data(),
		sPrivateEmail = this.sign() ? this.fromEmail() : '',
		aPrincipalsEmail = this.emails(),
		sPrivateKeyPassword = this.sign() ? this.password() : '',
		oRes = null,
		sOkReport = '',
		sPgpAction = ''
	;
	
	if (this.encrypt())
	{
		if (aPrincipalsEmail.length === 0)
		{
			Screens.showError(TextUtils.i18n('OPENPGP/ERROR_TO_ENCRYPT_SPECIFY_RECIPIENTS'));
		}
		else
		{
			if (this.sign())
			{
				sPgpAction = Enums.PgpAction.EncryptSign;
				sOkReport = TextUtils.i18n('OPENPGP/REPORT_MESSAGE_SIGNED_ENCRYPTED_SUCCSESSFULLY');
				oRes = OpenPgp.signAndEncrypt(sData, sPrivateEmail, aPrincipalsEmail, sPrivateKeyPassword);
			}
			else
			{
				sPgpAction = Enums.PgpAction.Encrypt;
				sOkReport = TextUtils.i18n('OPENPGP/REPORT_MESSAGE_ENCRYPTED_SUCCSESSFULLY');
				oRes = OpenPgp.encrypt(sData, aPrincipalsEmail);
			}
		}
	}
	else if (this.sign())
	{
		sPgpAction = Enums.PgpAction.Sign;
		sOkReport = TextUtils.i18n('OPENPGP/REPORT_MESSAGE_SIGNED_SUCCSESSFULLY');
		oRes = OpenPgp.sign(sData, sPrivateEmail, sPrivateKeyPassword);
	}
	
	if (oRes)
	{
		if (oRes.result)
		{
			this.closeCommand();
			if (this.okCallback)
			{
				if (!this.signAndSend())
				{
					Screens.showReport(sOkReport);
				}
				this.okCallback(oRes.result, this.encrypt());
			}
		}
		else
		{
			ErrorsUtils.showPgpErrorByCode(oRes, sPgpAction);
		}
	}
};

CEncryptPopup.prototype.cancel = function ()
{
	if (this.cancelCallback)
	{
		this.cancelCallback();
	}
	this.closeCommand();
};

CEncryptPopup.prototype.onEscHandler = function ()
{
	this.cancel();
};

module.exports = new CEncryptPopup();