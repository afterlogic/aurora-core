'use strict';

var
	ko = require('knockout'),
	$ = require('jquery')
;

/**
 * @constructor
 */
function CRenamePopup()
{
	this.fCallback = null;
	this.item = null;
	this.name = ko.observable('');
	this.name.focus = ko.observable(false);
	this.name.error = ko.observable('');

	this.name.subscribe(function () {
		this.name.error('');
	}, this);
}

CRenamePopup.prototype.PopupTemplate = 'Files_RenamePopup';

/**
 * @param {Object} oItem
 * @param {Function} fCallback
 */
CRenamePopup.prototype.onShow = function (oItem, fCallback)
{

	this.item = oItem;
	this.item.nameForEdit(this.item.fileName());

	this.name(this.item.nameForEdit());
	this.name.focus(true);
	this.name.error('');
	
	if ($.isFunction(fCallback))
	{
		this.fCallback = fCallback;
	}
};

CRenamePopup.prototype.onOKClick = function ()
{
	this.name.error('');
	if (this.fCallback)
	{
		this.item.nameForEdit(this.name());
		var sError = this.fCallback(this.item);
		if (sError)
		{
			this.name.error('' + sError);
		}
		else
		{
			this.closeCommand();
		}
	}
	else
	{
		this.closeCommand();
	}
};

CRenamePopup.prototype.onCancelClick = function ()
{
	this.closeCommand();
};

module.exports = new CRenamePopup();