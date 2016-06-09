<?php

/* -AFTERLOGIC LICENSE HEADER- */

// remove the following line for real use
//exit('remove this line');

require_once dirname(__FILE__).'/../core/api.php';

/* Get WebMail Settings */
$oSettings =& \CApi::GetSettings();

$sDbPrefix = $oSettings->GetConf('DBPrefix');
/* Database */
$oPdo = \CApi::GetPDO();

$sCalendarSharesTableName = $sDbPrefix . \Afterlogic\DAV\Constants::T_CALENDARSHARES;

$stmt1 = $oPdo->prepare("SELECT * FROM " . $sDbPrefix . "adav_delegates");
$stmt1->execute();

while($aRow1 = $stmt1->fetch(\PDO::FETCH_ASSOC)) 
{ 
	$stmt2 = $oPdo->prepare("SELECT * FROM " . $sCalendarSharesTableName . " WHERE calendarid = ? and member = ?");
	$stmt2->execute(array($aRow1['calendarid'], $aRow1['principalid']));
	if (count($stmt2->fetchAll()) === 0)
	{
		$stmt3 = $oPdo->prepare("INSERT INTO " . $sCalendarSharesTableName . "(calendarid, member, readonly) VALUES (?, ?, ?)");
		$stmt3->execute(array($aRow1['calendarid'], $aRow1['principalid'], ((int)$aRow1['mode'] === \ECalendarPermission::Read)));
	}
}

