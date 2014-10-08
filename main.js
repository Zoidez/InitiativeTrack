
var chars = [];

document.addEventListener("DOMContentLoaded", function(event){whenLoaded();});

function whenLoaded(){
	//catching the tools and options
	window.toolsStandardRulesRadio = document.getElementById("standardRulesRadio");
	window.toolsAlternativeRulesRadio = document.getElementById("alternativeRulesRadio");

	//catching the charAdd form elements
	window.charAddName = document.getElementById("charNameInput");
	window.charAddNpc = document.getElementById("CharNPCSelect");
	window.charAddNpcInitContainer = document.getElementById("charAddNpcInitMaster");
	window.charAddNpcInitBase = document.getElementById("charNpcInitBaseInput");
	window.charAddNpcInitD6 = document.getElementById("charNpcInitD6Input");
	window.charAddRand = document.getElementById("charRandInit");
	
	//catching the scene and cookies processing functions
	window.sceneAddName = document.getElementById("sceneNameInput");
	window.sceneAddSelect = document.getElementById("sceneSelect");
	window.sceneToTextInput = document.getElementById("sceneToTextInput");
	window.sceneToTextGenerateButton = document.getElementById("sceneToTextGenerateButton");
	window.sceneToTextLoadButton = document.getElementById("sceneToTextLoadButton");
	
	toolsLoad();
	sceneOptionsLoad();
	whatsNew();
	//Fill the sample content in half a second
	setTimeout(function(){fillContent()}, 500);
}

function fillContent(){
	addChar("Alvaro", false);
	addChar("Ohm", true, 14, 2);
	addChar("#1", true, 8, 1);
	addChar("#2", true, 16, 5);
	addChar("#3", false);
	
	chars[0].initiative.value = "12";
	//chars[1].initiative.value = "16";
	//chars[2].initiative.value = "32";
	//chars[3].initiative.value = "30";
	chars[4].initiative.value = "31";
}

function checkForm() {
	var npc = document.getElementById("CharNPCSelect");
	var npcSelected = (window.charAddNpc.selectedIndex == 1);
	var isInputGood = true;
	if(!isInputUnique(chars, "nameString", window.charAddName.value.trim(), true, window.charAddName, "name")){
		isInputGood = false;
	}
	if(npcSelected){
		if(!checkInputText(window.charAddNpcInitBase.value, false, false)){
			animateBorder(window.charAddNpcInitBase, 'borderColor');
			isInputGood = false;
		}
		if(!checkInputText(window.charAddNpcInitD6.value, false, false)){
			animateBorder(window.charAddNpcInitD6, 'borderColor');
			isInputGood = false;
		}
	}
	if(isInputGood){
		addChar(window.charAddName.value.trim(), npcSelected, window.charAddNpcInitBase.value, window.charAddNpcInitD6.value);
		window.charAddName.value = "";
		window.charAddNpcInitBase.value = "";
		window.charAddNpcInitD6.value = "";
	}
}

function checkInputText(object, mustBeText, voidAllowed){
	var regexp = (mustBeText) ? /^\w(\w|\s)*$/ : /^\d+$/
	if(!voidAllowed && (object == "" || object == null)){ console.log("checkInputText: void is not allowed and is now.");
	return false;
	}
	if(!(regexp.test(object) || (object == ""))){
		//Apparently , the function launches before the init field value is altered. Isn't that crazy?
		//animateBorder(object, "borderColor");
		return false;
	}
	return true;
}

function isInputUnique(array, postfix, compare, mustBeText, animate1, animate2Postfix){
	var isUnique = true;
	var match = "";
	if(!checkInputText(compare, mustBeText, false)){
		animateBorder(animate1, 'borderColor');
		return false;
	}
	else{
		for(var i=0; i<array.length; i++){
			if(array[i][postfix] == compare){
				isUnique = false;
				animateBorder(animate1, 'borderColor');
				animateBorder(array[i][animate2Postfix], "color");
			}
		}
	}
	return isUnique;
}

function initInputChanged(index){
	currentSceneSave();
	return checkInitInput(index);
}

function checkInitInput(index){
	setTimeout(function(){
		if(!checkInputText(chars[index].initiative.value, false, true)){
			animateBorder(chars[index].initiative, "borderColor");
			return false;
		}
	}, 1);
	return true;
}

function addChar(charName, npcSelected, baseInit, D6Init, initInput){
	var newChar = new character(charName, npcSelected, baseInit, D6Init, initInput, chars.length);
	chars.push(newChar);
	currentSceneSave();
	if(npcSelected) animate(window.charAddRand, 'width', 0, 78, 3);
}

function animate(obj, property, start, end, increment){
	var unroll;
	if(start < end) unroll = true;
	else unroll = false;
	if(end == parseInt(obj.style[property])) console.log("animate(): redundant action");
	else{
		var interval = window.setInterval(function(){
			obj.style[property] = (start + "px");
			if(unroll) start += increment;
			else start -= increment;
			if(((start >= end) && unroll) || ((start <= end) && !(unroll))){
				window.clearInterval(interval);
				obj.style[property] = (end + "px");
			}
		}, 1);
	}
}

function rollNPCInitContainer(){
	if(window.charAddNpc.selectedIndex == 1) animate(window.charAddNpcInitContainer, 'width', 0, 146, 5);
	else animate(window.charAddNpcInitContainer, 'width', 146, 0, 5);
}

function animateBorder(element, property){
	var isRed = false;
	var animate = setInterval(function(){
		if(isRed === true){
			element.style[property] = "#88A8B7";
			isRed = false;
		}
		else{
			element.style[property] = "#FF8888";
			isRed = true;
		}
	}, 100);
	setTimeout(function(){clearInterval(animate)}, 900);
	setTimeout(function(){element.style[property] = ""}, 1000);
}

function pulseBorder(element, property, origColor){ //Here you go, pulseBorder() is ready! Now, I will start on the standard rule support. For that, I need combat turn count in HTML.
	var maxColor = parseInt(("ff" + origColor.substring(2, origColor.length)), 16),
		deencrement = 65536,
		curColor = origColor = parseInt(origColor, 16),
		mSPF = (32768000/(maxColor - curColor)); //That number is basically (#mSec * 65536) The number is "010000" in hex, the increment.
	var pulse = setInterval(function(){
		curColor = curColor + deencrement;
		element.style[property] = curColor.toString(16);
		if(curColor >= maxColor) deencrement = -65536;
		if(curColor <= origColor) deencrement = 65536;
	}, mSPF);
	setTimeout(function(){clearInterval(pulse);}, 4000);
}

function randNpc(){
	for(var i=0; i<chars.length; i++) if(chars[i].npc && (chars[i].initiative.value == "" || chars[i].initiative.value == null)) chars[i].randNpcInit();
	currentSceneSave();
	animate(window.charAddRand, 'width', 78, 0, 3);
}

function clearRound(){
	for(var i=0; i<chars.length; i++) chars[i].initiative.value = "";
	animate(window.charAddRand, 'width', 0, 78, 3);
}

function findMax(){
	var max=0,
		maxInit = [],
		initInputCorrect = true;
	for(var i=chars.length-1; i>=0; i--){
		if(!(chars[i].initiative.value == "" || chars[i].initiative.value == null)) max = i;
		if(!checkInitInput(i)){
			initInputCorrect = false;
			animateBorder(chars[i].initiative, "borderColor");
		}
	}
	if(initInputCorrect){
		for(var i=0; i<chars.length; i++){
			if(parseInt(chars[i].initiative.value) >= parseInt(chars[max].initiative.value)){
				if(parseInt(chars[i].initiative.value) > parseInt(chars[max].initiative.value)) maxInit = [];
				max = i;
				maxInit.push(i);
			}
		}
	}
	//--------------Clear Previous Characters' Highlights---------------
	for(var i=0; i<chars.length; i++) if(chars[i].isHighlighted) chars[i].highlight(false);
	//--------------Set the New Characters' Highlights---------------
	if(parseInt(chars[max].initiative.value) <= 0) clearRound();
	else for(var i=0; i<maxInit.length; i++) chars[maxInit[i]].highlight(true);
}

function deleteAll(){
	var length = chars.length;
	for(var i=0; i<length; i++) deleteChar(0, 100);
}

function deleteChar(index, delay){
	var delChar = chars[index];
	animate(delChar.parentDiv, 'height', 35, 0, 2);
	chars.splice(index, 1);
	currentSceneSave(); //.!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!Something is not right here.
	setTimeout(function(){
		delChar.del();
		for(var i=0; i<chars.length; i++) chars[i].parentDiv.id = i;
	}, delay);
}

function nextPhase(){
	var isInputGood = true;
	for(var i=0; i<chars.length; i++) if(!(/^\d*$/.test(chars[i].initiative.value))){
		isInputGood = false;
		animateBorder(chars[i].initiative, "borderColor");
	}
	if(isInputGood){
		for(var i=0; i<chars.length; i++) if(chars[i].isHighlighted) chars[i].sub(10);
		findMax();
		currentSceneSave();
	}
}

//--------------Scene Management---------------

//--------------Tools---------------
function toolsSave(){
	cookieSet("SIT_tools", toolsToString());
}

function toolsLoad(){
	var save = cookieGet("SIT_tools");
	if(save != null){
		save.split(":");
		window.toolsStandardRulesRadio.checked = (save[0] == "true");
		window.toolsAlternativeRulesRadio.checked = !(save[0] == "true");
	}
}

function toolsToString(){
	//standardRule(boolean):
	return window.toolsStandardRulesRadio.checked.toString();
}

//--------------Current Scene---------------
function currentSceneSave(){
	var scene = sceneToString();
	console.log(scene);
	cookieSet("SIT_currentScene", scene);
}

//--------------Cookies---------------
function cookieSet(name, value){
	var d = new Date();
	d.setTime(d.getTime() + (365*24*60*60*1000));
	var expires = "expires=" + d.toGMTString();
	document.cookie = name + "=" + value + "; " + expires;
}

function cookieGet(name){
	if (typeof document.cookie == "undefined") return null;
	var cookies = document.cookie.split(";"),
		cookie = "";
	for(var i=0; i<cookies.length; i++){
		cookie = cookies[i].trim();
		if(cookie.indexOf(name) == 0) return cookie.substring((name.length+1), cookie.length);
	}
}

function sceneAdd(){
	if(window.sceneAddName.value == "" || window.sceneAddName.value == null) animateBorder(window.sceneAddName, 'borderColor');
	else{
		var d = new Date();
		d.setTime(d.getTime() + (365*24*60*60*1000));
		var expires = "expires="+d.toGMTString();
		console.log(sceneToString());
		document.cookie = window.sceneAddName.value + "=" + sceneToString() + "; " + expires;
		console.log(document.cookie);
		var hasAlready = false;
		for(var i=0; i<window.sceneAddSelect.length; i++) if(window.sceneAddSelect.options[i].text == window.sceneAddName.value) hasAlready = true;
		if(!hasAlready){
			var newScene = document.createElement("option");
			newScene.text = window.sceneAddName.value;
			window.sceneAddSelect.options.add(newScene);
			window.sceneAddSelect.value = window.sceneAddName.value;
		}
		window.sceneAddName.value = "";
	}
}

function sceneLoad(){
	
	for(var i=chars.length; i>=1; i--) deleteChar(0, 0);
	//var m = document.cookie;
	sceneName = window.sceneAddSelect.value + "=";
	cookiesArr = document.cookie.split(";");
	for(var i=0; i<cookiesArr.length; i++){
		var cookie = cookiesArr[i].trim();
		if(cookie.indexOf(sceneName) == 0) scenePopulate(cookie.substring(sceneName.length, cookie.length));
	}
}

function sceneDelete(){
	document.cookie = window.sceneAddSelect.value + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
	window.sceneAddSelect.remove(window.sceneAddSelect.selectedIndex);
}

function sceneToString(){
	//charName:charNpc:*if Npc*charBaseInit:charD6:charInitInput
	var out = "";
	for(var i=0; i<chars.length; i++){
		out += ":" + chars[i].name.innerHTML;
		out += ":" + chars[i].npc;
		if(chars[i].npc){
			out += ":" + chars[i].baseInit;
			out += ":" + chars[i].D6Init;
		}
		out += ":" + chars[i].initiative.value;
	}
	return out.substring(1, out.length); //removes the first ":"
}

function scenePopulate(s){
	var scene = s.split(":");
	console.log("scenePopulate: " + scene);
	for(var i=0; i<scene.length; i++){
		if(scene[i+1] == 'true') addChar(scene[i++], scene[i++], parseInt(scene[i++]), parseInt(scene[i++]), scene[i]);
		else  addChar(scene[i++], false, scene[i++], 0, scene[i]); //Technically, the third parameter passed is "false" but we need to move onto the next array element and putting scene[i++] instead of "false" brings complications. So instead, we are using the needless base initiative parameter place to increment the position.
	}
}

function sceneOptionsLoad(){
	var m = document.cookie;
	cookiesArr = document.cookie.split(";");
	if(m != ""){
		for(var i=0; i<cookiesArr.length; i++){
			if(cookiesArr[i].indexOf("tools") != 0){
				var newScene = document.createElement("option");
				newScene.text = cookiesArr[i].substring(0, cookiesArr[i].indexOf("="));
				window.sceneAddSelect.options.add(newScene);
			}
		}
	}
}

//--------------Scene Management---------------
function sceneToTextGenetate(){
	window.sceneToTextInput.value = sceneToString();
}

function sceneToTextLoad(){
	for(var i=chars.length; i>=1; i--) deleteChar(0, 0);
	scenePopulate(window.sceneToTextInput.value);
}

function whatsNew(){
	pulseBorder(window.sceneToTextInput, "borderColor", "88A8B7");
	pulseBorder(window.sceneToTextGenerateButton, "borderColor", "88A8B7");
	pulseBorder(window.sceneToTextLoadButton, "borderColor", "88A8B7");
}

/*function testRegExp(){
	var time = new Date();
	for(var i=0; i<10000; i++) isInputUnique();
	time -= new Date();
	console.log(time);
}*/