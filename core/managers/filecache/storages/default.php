<?php

/* -AFTERLOGIC LICENSE HEADER- */

/**
 * @package Filecache
 * @subpackage Storages
 */
class CApiFilecacheStorage extends AApiManagerStorage
{
	/**
	 * @param CApiGlobalManager &$oManager
	 */
	public function __construct($sStorageName, AApiManager &$oManager)
	{
		parent::__construct('filecache', $sStorageName, $oManager);
	}
}