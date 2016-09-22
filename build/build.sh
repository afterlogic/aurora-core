#!/bin/bash

read -p "Tenant name: " response

tenant=""
if [ "$response" != "" ]; 
then
	tenant=" --tenant $response";
fi

#Build static data
cd ../modules

Modules=();
for dir in *;
do
	if [ -d "$dir" ];then
		Modules=("${Modules[@]}" "$dir");
	fi
done

gulp styles --modules $(IFS=, ; echo "${Modules[*]}") $(echo "$tenant") --themes Default,Funny --tenant $response
gulp langs --modules $(IFS=, ; echo "${Modules[*]}") $(echo "$tenant") --langs Arabic,Bulgarian,Chinese-Simplified,Chinese-Traditional,Czech,Danish,Dutch,English,Estonian,Finnish,French,German,Greek,Hebrew,Hungarian,Italian,Japanese,Korean,Latvian,Lithuanian,Norwegian,Persian,Polish,Portuguese-Brazil,Portuguese-Portuguese,Romanian,Russian,Serbian,Slovenian,Spanish,Swedish,Thai,Turkish,Ukrainian,Vietnamese
gulp js1:build --output app $(echo "$tenant") --modules $(IFS=, ; echo "${Modules[*]}")