
var chars = [];

onLoad(setTimeout(function(){fillContent()}, 500));

function fillContent(){
	addChar("Alvaro", false);
	addChar("Ohm", true);
	addChar("#1", true);
	addChar("#2", true);
	addChar("#3", false);
	
	chars[0].initiative.value = "12";
	chars[1].initiative.value = "16";
	chars[2].initiative.value = "32";
	chars[3].initiative.value = "30";
	chars[4].initiative.value = "31";
}

function checkForm() {
	var charName = document.getElementById("charNameInput");
	var npc = document.getElementById("CharNPCSelect");
	var npcSelected =(npc.options[npc.selectedIndex].value == "npc");
	
	if(charName.value == "" || charName.value == null) animateBorder(charName);
	else {
		addChar(charName.value, npc);
	}
	charName.value = "";
}

function addChar(charName, npc){
	var newChar = new character(charName, npc, chars.length);
	chars.push(newChar);
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

function clearRound(){
	for(var i=0; i<chars.length; i++) chars[i].initiative.value = "";
}

function findMax(){
	var max=0;
	var maxInit = [];
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