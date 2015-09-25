'use strict';

var
	ko = require('knockout'),
	
	Utils = require('core/js/utils/Common.js'),
			
	SendingUtils = require('modules/Mail/js/utils/Sending.js'),
	Accounts = require('modules/Mail/js/AccountList.js')
;

function CSenderSelector()
{
	this.senderList = ko.observableArray([]);
	
	this.senderAccountId = ko.observable(Accounts.currentId());
	this.selectedFetcherOrIdentity = ko.observable(null);
	this.lockSelectedSender = ko.observable(false);
	this.selectedSender = ko.observable('');
	this.selectedSender.subscribe(function () {
		if (!this.lockSelectedSender())
		{
			var
				oAccount = Accounts.getAccount(this.senderAccountId()),
				sId = this.selectedSender(),
				oFetcherOrIdentity = null
			;
			
			if (Utils.isNonEmptyString(sId))
			{
				if (sId.indexOf('fetcher') === 0)
				{
					if (oAccount.fetchers())
					{
						sId = sId.replace('fetcher', '');
						oFetcherOrIdentity = _.find(oAccount.fetchers().collection(), function (oFtchr) {
							return oFtchr.id() === Utils.pInt(sId);
						});
					}
				}
				else
				{
					oFetcherOrIdentity = _.find(oAccount.identities(), function (oIdnt) {
						return oIdnt.id() === Utils.pInt(sId);
					});
				}
			}
			
			if (oFetcherOrIdentity)
			{
				this.selectedFetcherOrIdentity(oFetcherOrIdentity);
			}
		}
	}, this);
}

CSenderSelector.prototype.changeSelectedSender = function (oFetcherOrIdentity)
{
	if (oFetcherOrIdentity)
	{
		var sSelectedSenderId = Utils.pString(oFetcherOrIdentity.id());

		if (oFetcherOrIdentity.FETCHER)
		{
			sSelectedSenderId = 'fetcher' + sSelectedSenderId;
		}

		if (_.find(this.senderList(), function (oItem) {return oItem.id === sSelectedSenderId;}))
		{
			this.lockSelectedSender(true);
			console.log(1, 'sSelectedSenderId', sSelectedSenderId);
			this.selectedSender(sSelectedSenderId);
			this.selectedFetcherOrIdentity(oFetcherOrIdentity);
			this.lockSelectedSender(false);
		}
	}
};

/**
 * @param {number} iId
 * @param {string=} oFetcherOrIdentity
 */
CSenderSelector.prototype.changeSenderAccountId = function (iId, oFetcherOrIdentity)
{
	var bChanged = false;
	if (this.senderAccountId() !== iId)
	{
		if (Accounts.hasAccountWithId(iId))
		{
			this.senderAccountId(iId);
			bChanged = true;
		}
		else if (!Accounts.hasAccountWithId(this.senderAccountId()))
		{
			this.senderAccountId(Accounts.currentId());
			bChanged = true;
		}
	}
	
	if (bChanged || this.senderList().length === 0)
	{
		this.fillSenderList(oFetcherOrIdentity);
		bChanged = true;
	}
		
	if (!bChanged && oFetcherOrIdentity)
	{
		this.changeSelectedSender(oFetcherOrIdentity);
	}
};

/**
 * @param {string=} oFetcherOrIdentity
 */
CSenderSelector.prototype.fillSenderList = function (oFetcherOrIdentity)
{
	var
		aSenderList = [],
		oAccount = Accounts.getAccount(this.senderAccountId())
	;

	if (oAccount)
	{
		if (_.isArray(oAccount.identities()))
		{
			_.each(oAccount.identities(), function (oIdentity) {
				if (oIdentity.enabled())
				{
					aSenderList.push({fullEmail: oIdentity.fullEmail(), id: Utils.pString(oIdentity.id())});
				}
			}, this);
		}

		if (!oAccount.identitiesSubscribtion)
		{
			oAccount.identitiesSubscribtion = oAccount.identities.subscribe(function (aIdentities) {
				this.fillSenderList(oFetcherOrIdentity);
				this.changeSelectedSender(oAccount.getDefaultIdentity());
			}, this);
		}

		if (oAccount.fetchers())
		{
			_.each(oAccount.fetchers().collection(), function (oFetcher) {
				var sFullEmail = oFetcher.fullEmail();
				if (oFetcher.isOutgoingEnabled() && sFullEmail.length > 0)
				{
					aSenderList.push({fullEmail: sFullEmail, id: 'fetcher' + oFetcher.id()});
				}
			}, this);
		}
		else if (!oAccount.fetchersSubscribtion)
		{
			oAccount.fetchersSubscribtion = oAccount.fetchers.subscribe(function () {
				this.fillSenderList(oFetcherOrIdentity);
			}, this);
		}
	}

	this.senderList(aSenderList);

	this.changeSelectedSender(oFetcherOrIdentity);
};

/**
 * @param {Object} oMessage
 */
CSenderSelector.prototype.setFetcherOrIdentityByReplyMessage = function (oMessage)
{
	var
		aRecipients = oMessage.oTo.aCollection.concat(oMessage.oCc.aCollection),
		oFetcherOrIdentity = SendingUtils.getFirstFetcherOrIdentityByRecipientsOrDefault(aRecipients, oMessage.accountId())
	;
	
	if (oFetcherOrIdentity)
	{
		this.changeSelectedSender(oFetcherOrIdentity);
	}
};

module.exports = new CSenderSelector();