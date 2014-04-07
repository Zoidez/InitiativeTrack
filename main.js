
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
	//Fill contents after half a second
	//setTimeout(function(){fillContent()}, 500)
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

function animateNpcInit(){
	var end;
	var width;
	if(window.charAddNpc.selectedIndex/*charAddNpc.selectedIndex*/ == 1){
		width = 0;
		end = 146;
		console.log(window.charAddNpcInitContainer);
		var interval = window.setInterval(function(){
			window.charAddNpcInitContainer.style.width = (width + "px");
			width+=5;
			if(width >= end){
				window.clearInterval(interval);
				window.charAddNpcInitContainer.style.width= "146px";
			}
		}, 1);
	}
	else{
		width = 146;
		end = 0;
		var interval = window.setInterval(function(){
			window.charAddNpcInitContainer.style.width = (width + "px");
			width-=5;
			if(width <= end){
				window.clearInterval(interval);
				window.charAddNpcInitContainer.style.width= "0px";
			}
		}, 1);
	}
}

function animateRandInit(unroll){
	var end;
	var width;
	if(unroll && (window.charAddRand.style.width == 0 || window.charAddRand.style.width == "0px")){
		width = 0;
		end = 78;
		var interval = window.setInterval(function(){
			window.charAddRand.style.width = (width + "px");
			width+=3;
			if(width >= end){
				window.clearInterval(interval);
				window.charAddRand.style.width= "78px";
			}
		}, 1);
	}
	if(!(unroll) && parseInt(window.charAddRand.style.width) > 0){
		width = 78;
		end = 0;
		var interval = window.setInterval(function(){
			window.charAddRand.style.width = (width + "px");
			width-=3;
			if(width <= end){
				window.clearInterval(interval);
				window.charAddRand.style.width= "0px";
			}
		}, 1);
	}
}

function checkForm() {
	var npc = document.getElementById("CharNPCSelect");
	var npcSelected = (window.charAddNpc.selectedIndex == 1);
	var isInputGood = true;
	if(window.charAddName.value == "" || window.charAddName.value == null){
		animateBorder(window.charAddName);
		isInputGood = false;
	}
	if(window.charAddNpc.selectedIndex == 1){
		if(window.charAddNpcInitBase.value == "" || window.charAddNpcInitBase.value == null){
			animateBorder(window.charAddNpcInitBase);
			isInputGood = false;
		}
		if(window.charAddNpcInitD6.value == "" || window.charAddNpcInitD6.value == null){
			animateBorder(window.charAddNpcInitD6);
			isInputGood = false;
		}
	}
	if(isInputGood){
		addChar(window.charAddName.value, npcSelected, window.charAddNpcInitBase.value, window.charAddNpcInitD6.value);
		charName.value = "";
		window.charAddNpcInitBase.value = "";
		window.charAddNpcInitD6.value = "";
	}
}

function addChar(charName, npcSelected, baseInit, D6Init){
	var newChar = new character(charName, npcSelected, baseInit, D6Init, chars.length);
	chars.push(newChar);
	if(npcSelected) animateRandInit(true);
}

function animateBorder(element){
	var isRed = false;
	var animate = setInterval(function(){
		if(isRed === true){
			element.style.borderColor = "#88A8B7";
			isRed = false;
		}
		else{
			element.style.borderColor = "#FF8888";
			isRed = true;
		}
	}, 100);
	setTimeout(function(){clearInterval(animate)}, 900);
	setTimeout(function(){element.style.borderColor = "#88A8B7"}, 1000);
}

function randNpc(){
	for(var i=0; i<chars.length; i++) if(chars[i].npc && (chars[i].initiative.value == "" || chars[i].initiative.value == null)) chars[i].randNpcInit();
	animateRandInit(false);
}

function clearRound(){
	for(var i=0; i<chars.length; i++) chars[i].initiative.value = "";
	animateRandInit(true);
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

function deleteChar(index){
	chars[index].del();
	chars.splice(index, 1);
	for(var i=0; i<chars.length; i++) chars[i].parentDiv.id = i;
}

function nextPhase(){
	for(var i=0; i<chars.length; i++) if(chars[i].isHighlighted) chars[i].sub(10);
	findMax();
}