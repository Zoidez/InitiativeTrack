
var chars = [];

document.addEventListener("DOMContentLoaded", function(event){whenLoaded();});

function whenLoaded(){
	//catching the charAdd form elements
	window.charAddName = document.getElementById("charNameInput");
	window.charAddNpc = document.getElementById("CharNPCSelect");
	window.charAddNpcInitContainer = document.getElementById("charAddNpcInitMaster");
	window.charAddNpcInitBase = document.getElementById("charNpcInitBaseInput");
	window.charAddNpcInitD6 = document.getElementById("charNpcInitD6Input");
	window.charAddRand = document.getElementById("charRandInit");
	window.sceneAddName = document.getElementById("sceneNameInput");
	window.sceneAddSelect = document.getElementById("sceneSelect");
	
	sceneOptionsLoad();
	//Fill the sample content in half a second
	//setTimeout(function(){fillContent()}, 500);
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
	if(!checkInputText(window.charAddName.value, true) || !isInputUnique()){
		animateBorder(window.charAddName, 'borderColor');
		isInputGood = false;
	}
	if(npcSelected){
		if(!checkInputText(window.charAddNpcInitBase.value, false)){
			animateBorder(window.charAddNpcInitBase, 'borderColor');
			isInputGood = false;
		}
		if(!checkInputText(window.charAddNpcInitD6.value, false)){
			animateBorder(window.charAddNpcInitD6, 'borderColor');
			isInputGood = false;
		}
	}
	if(isInputGood){
		addChar(window.charAddName.value.trim(), npcSelected, window.charAddNpcInitBase.value, window.charAddNpcInitD6.value);
		charName.value = "";
		window.charAddNpcInitBase.value = "";
		window.charAddNpcInitD6.value = "";
	}
}
function checkInputText(object, mustBeText){
	var regexp = (mustBeText) ? /^\w+$/ : /^\d+$/
	if(object == "" || object == null || (!regexp.test(object))){
		//animateBorder(object, "borderColor");
		return false;
	}
	return true;
}

function isInputUnique(){
	var isUnique = true;
	var match = "";
	for(var i=0; i<chars.length; i++){
		if(chars[i].name.innerHTML == window.charAddName.value.trim()){
			isUnique = false;
			animateBorder(chars[i].name, "color");
			animateBorder(window.charAddName, 'borderColor');
		}
	}
	return isUnique;
}

function addChar(charName, npcSelected, baseInit, D6Init){
	var newChar = new character(charName, npcSelected, baseInit, D6Init, chars.length);
	chars.push(newChar);
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

function animateBorder(element, property){
	var isRed = false;
	var originalColour = element.style[property];
	//console.log(element.css("border-color"));
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

function randNpc(){
	for(var i=0; i<chars.length; i++) if(chars[i].npc && (chars[i].initiative.value == "" || chars[i].initiative.value == null)) chars[i].randNpcInit();
	animate(window.charAddRand, 'width', 78, 0, 3);
}

function clearRound(){
	for(var i=0; i<chars.length; i++) chars[i].initiative.value = "";
	animate(window.charAddRand, 'width', 0, 78, 3);
}

function findMax(){
	var max=0;
	var maxInit = [];
	for(var i=chars.length-1; i>=0; i--) if(!(chars[i].initiative.value == "" || chars[i].initiative.value == null)) max = i;
	for(var i=0;i<chars.length; i++){
		if(parseInt(chars[i].initiative.value) >= parseInt(chars[max].initiative.value)){
			if(parseInt(chars[i].initiative.value) > parseInt(chars[max].initiative.value)) maxInit = [];
			max = i;
			maxInit.push(i);
		}
	}
	
	//--------------Clear Previous Characters' Highlight---------------
	for(var i=0; i<chars.length; i++) if(chars[i].isHighlighted) chars[i].highlight(false);
	
	//--------------Set the New Characters' Highlight---------------
	if(parseInt(chars[max].initiative.value) <= 0) clearRound();
	else for(var i=0; i<maxInit.length; i++) chars[maxInit[i]].highlight(true);
}

function deleteChar(index, delay){
	animate(chars[index].parentDiv, 'height', 35, 0, 2);
	setTimeout(function(){chars[index].del();
		chars.splice(index, 1);
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
	}
}

//--------------Scene Management---------------
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
	var m = document.cookie;
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
	//charName:charNpc1:*if Npc*charBaseInit1:charD61:
	var out = "";
	for(var i=0; i<chars.length; i++){
		out += ":" + chars[i].name.innerHTML;
		out += ":" + chars[i].npc;
		if(chars[i].npc){
			out += ":" + chars[i].baseInit;
			out += ":" + chars[i].D6Init;
		}
	}
	return out.substring(1, out.length); //removes the first :
}

function scenePopulate(s){
	var scene = s.split(":");
	console.log(scene);
	for(var i=0; i<scene.length; i++){
		if(scene[i+1] == 'true') addChar(scene[i++], scene[i++], parseInt(scene[i++]), parseInt(scene[i]));
		else  addChar(scene[i++], false);
	}
}

function sceneOptionsLoad(){
	var m = document.cookie;
	console.log(m);
	cookiesArr = document.cookie.split(";");
	if(m != ""){
		for(var i=0; i<cookiesArr.length; i++){
			var newScene = document.createElement("option");
			newScene.text = cookiesArr[i].substring(0, cookiesArr[i].indexOf("="));
			window.sceneAddSelect.options.add(newScene);
		}
	}
}

function testRegExp(){
	var time = new Date();
	for(var i=0; i<10000; i++) isInputUnique();
	time -= new Date();
	console.log(time);
}