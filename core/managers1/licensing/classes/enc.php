<?php class ��������������� { const �������������� = -1; const �������������� = 0; const ��������������� = 1; const �������������� = 2; const �������������� = 3; const ��������������� = 10; const �������������� = 11; const �������������� = 13; const AFT_LICENSE_KEY_TYPE_VERSION_EXPIRED = 14; const ��������������� = -1; const ��������������� = 0; const ��������������� = 1; const ��������������� = 2; const ��������������� = 3; public $���������������; public $���������������; public $Version; public $���������������; public $���������������; protected $Aurore; public function __construct($���������������, $bAurore = false) { $this->��������������� = $���������������; $this->��������������� = ���������������::��������������; $this->Version = ���������������::���������������; $this->��������������� = 0; $this->��������������� = null; $this->��������������� = null; $this->Aurore = !!$bAurore; $this->���������������(); } private function ���������������() { switch (false) { case $this->���������������(): break; case $this->���������������(): break; case $this->���������������(): break; default: $this->���������������(); return true; } return false; } private function ���������������($���������������) { if (���������������::��������������� === $��������������� || ���������������::��������������� === $��������������� || ���������������::��������������� === $���������������) { $��������������� = ���������������::���������������($���������������, $this->���������������{39}); if (in_array($���������������, array( ���������������::��������������, ���������������::���������������, ���������������::��������������, ���������������::�������������� ))) { $this->��������������� = (int) $���������������; if ($��������������� !== ���������������::��������������) { $��������������� = ���������������::���������������($���������������, $this->���������������{40}); $��������������� = ���������������::���������������($���������������, $this->���������������{41}); $��������������� = ���������������::���������������($���������������, $this->���������������{42}); if (is_numeric($���������������) && is_numeric($���������������) && is_numeric($���������������)) { $this->��������������� = ($��������������� * 10 + $���������������) * pow(10, $���������������); } if ($��������������� === ���������������::��������������) { $this->��������������� = ���������������::��������������; $this->��������������� = ���������������::���������������($���������������, $this->���������������); $this->��������������� = $this->��������������� - time(); if (0 < $this->���������������) { $this->��������������� = ���������������::��������������; } } } else { $this->��������������� = (int) $���������������; $this->��������������� = 0; } } } if (���������������::��������������� !== $��������������� && ���������������::��������������� !== $��������������� && ���������������::�������������� !== $this->���������������) { $this->��������������� = ���������������::AFT_LICENSE_KEY_TYPE_VERSION_EXPIRED; } } private function ���������������() { $��������������� = ���������������::���������������($this->���������������); $��������������� = ���������������::���������������($���������������, $this->���������������); if (false !== $��������������� && ���������������::��������������� !== $���������������) { $this->Version = $���������������; if ((bool) (���������������::���������������($���������������, $this->���������������{33}) % 2)) { $this->���������������($���������������); } else { $��������������� = time(); $this->��������������� = ���������������::��������������; $this->��������������� = $���������������; $this->��������������� = $this->��������������� - $���������������; if (0 < $this->���������������) { $this->��������������� = ���������������::���������������; } } } } private function ���������������() { return ���������������::��������������� !== ���������������::���������������($this->���������������); } private function ���������������() { $��������������� = ���������������::���������������($this->���������������); if ($this->Aurore) { return 44 === strlen($this->���������������) && ���������������::��������������� === ���������������::���������������($this->���������������); } else { return 44 === strlen($this->���������������) && ( ���������������::��������������� === $��������������� || ���������������::��������������� === $��������������� ); } } private function ���������������() { $��������������� = ($this->���������������{35} * 7 + 7) % 10; return !($this->���������������{36} != $��������������� && $this->���������������{37} != $��������������� && $this->���������������{38} != $���������������); } } function ���������������() { return rand(0, 9); } class ALInfo extends ��������������� { public function IsValid($��������������� = false) { if ($���������������) { return false; } else { if (false !== $this->IsValid(true)) { return false; } } $��������������� = (���������������::�������������� !== $this->��������������� && ���������������::�������������� !== $this->��������������� && ���������������::�������������� !== $this->��������������� && ���������������::AFT_LICENSE_KEY_TYPE_VERSION_EXPIRED !== $this->��������������� ); return $���������������; } public function IsValidLimit($���������������, $��������������� = false) { if ($���������������) { return false; } else { if (false !== $this->IsValidLimit($���������������, true)) { return false; } } $��������������� = $this->IsValid(); if ($��������������� && ���������������::��������������� === $this->��������������� || ���������������::�������������� === $this->���������������) { $��������������� = $this->��������������� >= $���������������; } return $���������������; } public function IsAboutToExpire(&$���������������) { $��������������� = ( (���������������::��������������� === $this->��������������� && 86400 > $this->���������������) || (���������������::�������������� === $this->��������������� && 5184000 > $this->���������������) ); if ($���������������) { $��������������� = $this->���������������; } return $���������������; } public function ObjValues() { return array($this->���������������, $this->���������������, $this->���������������, $this->���������������, $this->���������������, $this->Version); } public function Generate() { return $this->Aurore ? '' :���������������::���������������(���������������::���������������); } public function IsAU() { return !!$this->Aurore; } } function ���������������($���������������) { return base64_decode($���������������); } class ��������������� { const ��������������� = 14; public static function ���������������($���������������, $���������������) { $��������������� = strpos(���������������::���������������($���������������), $���������������); return (false !== $���������������) ? (int) floor($��������������� / 4) : false; } public static function ���������������($��������������� = ���������������::���������������) { $��������������� = ���������������::���������������(date(���������������('aVlzbWRI'), time() + 3600 * 24 * 30), true); $��������������� = ''; for ($��������������� = 0, $��������������� = strlen($���������������); $��������������� < $���������������; $���������������++) { $��������������� .= ���������������::���������������($���������������, $���������������[$���������������]); } $��������������� = array('', '', '', '', '', '', '', '', '', '', '', '', ''); $��������������� = array(���������������('QQ=='), ���������������('Vw=='), ���������������('TQ=='), ���������������('Qw==')); for ($��������������� = 0; $��������������� <= 3; $���������������++) { $��������������� = rand(0, 12); while ($���������������[$���������������] != '') { $��������������� = $��������������� + 1; $��������������� = ($��������������� > 12) ? 0 : $���������������; } $���������������[$���������������] = $���������������[$���������������]; } for ($��������������� = 0; $��������������� <= 12; $���������������++) { $��������������� .= ($���������������[$���������������] != '') ? $���������������[$���������������] : ���������������::���������������($���������������, ���������������()); } $��������������� .= ���������������::���������������($���������������, rand(0, 4) * 2); $��������������� = ���������������::���������������($���������������, 0). ���������������::���������������($���������������, ���������������()). ���������������::���������������($���������������, ���������������()). ���������������::���������������($���������������, ���������������()); $��������������� = ���������������(); $��������������� = ($��������������� * 7 + 7) % 10; $��������������� = rand(0, 2); $��������������� = (string) $���������������; for ($��������������� = 0; $��������������� <= 2; $���������������++) { $��������������� .= ($��������������� == $���������������) ? $��������������� : ���������������(); } return ���������������::���������������($���������������).$���������������.���������������('LQ==').$���������������.$���������������.���������������('QQ=='); } public static function ���������������($���������������, $���������������) { $��������������� = false; $��������������� = substr($���������������, 6, ���������������::���������������); $��������������� = ���������������::���������������(); $��������������� = ''; for ($��������������� = 0; $��������������� < ���������������::���������������; $���������������++) { $��������������� = (int) ���������������::���������������($���������������, $���������������[$���������������]); $��������������� = $��������������� - $���������������[$���������������]; $��������������� = ($��������������� < 0) ? $��������������� + 10 : $���������������; $��������������� = ($��������������� >= 10) ? $��������������� - 10 : $���������������; $��������������� .= (string) $���������������; } if (strlen($���������������) === ���������������::���������������) { $��������������� = (int) substr($���������������, 12, 2); $��������������� = (int) substr($���������������, 0, 2); $��������������� = (int) substr($���������������, 6, 2); $��������������� = (int) substr($���������������, 8, 2); $��������������� = (int) substr($���������������, 10, 2); $��������������� = (int) substr($���������������, 2, 4); $��������������� = gmmktime($���������������, $���������������, $���������������, $���������������, $���������������, $���������������); } return $���������������; } public static function ���������������($���������������) { $��������������� = ���������������::���������������; $��������������� = substr($���������������, 0, 6); if (���������������('V003MDAt') === $���������������) { $��������������� = ���������������::���������������; } else if (���������������('QVU3MDAt') === $���������������) { $��������������� = ���������������::���������������; } else if (���������������('V001MTAt') === $���������������) { $��������������� = ���������������::���������������; } else if (���������������('V001MDAt') === $���������������) { $��������������� = ���������������::���������������; } return $���������������; } public static function ���������������($���������������) { $��������������� = ���������������('V001MTAt'); if (���������������::��������������� === $���������������) { $��������������� = ���������������('V003MDAt'); } else if (���������������::��������������� === $���������������) { $��������������� = ���������������('QVU3MDAt'); } return $���������������; } protected static function ���������������($���������������) { $��������������� = ���������������('NEpVVjNIU1dJVDU1R1I2UjJGUVhaQkxaRVA3NzFETllDTThNQUs5OQ=='); if (���������������::��������������� === $���������������) { $��������������� = ���������������('MkZRWDNIU1c0SlVWSVQ1NUdSNlJBSzk5WkJMWkVQNzcxRE5ZQ004TQ=='); } else if (���������������::��������������� === $���������������) { $��������������� = ���������������('M0hTVzJGUVhaQkxaQ004TUFLOTlJVDU1RVA3NzFETllHUjZSNEpVVg=='); } return $���������������; } protected static function ���������������($���������������, $���������������) { $��������������� = (0 < $��������������� && $��������������� < 10) ? $��������������� : 0; $��������������� = (int) (($��������������� * 4) + rand(0, 3)); $s��������������� = ���������������::���������������($���������������); return $s���������������{$���������������}; } protected static function ���������������($���������������, $���������������) { $��������������� = self::���������������(); $��������������� = ''; for ($��������������� = 0, $��������������� = strlen($���������������); $��������������� < $���������������; $���������������++) { $��������������� = $���������������{$���������������}; if (true === $���������������) { $��������������� += $���������������[$���������������]; } else { $��������������� -= $���������������[$���������������]; } $��������������� = ($��������������� < 0) ? $��������������� + 10 : $���������������; $��������������� = ($��������������� >= 10) ? $��������������� - 10 : $���������������; $��������������� .= (string) $���������������; } return $���������������; } protected static function ���������������() { $��������������� = array(); for ($��������������� = 0; $��������������� < ���������������::���������������; $���������������++) { $��������������� = (string) round($��������������� * 897); $��������������� = (int) $���������������{strlen($���������������) - 1}; $��������������� = (string) $���������������; $��������������� = (int) $���������������{strlen($���������������) - 1}; $��������������� = (($��������������� <= $���������������) || $��������������� === 0) ? $��������������� : ���������������('LQ==').$���������������; $���������������[] = (int) $���������������; } return $���������������; } } 