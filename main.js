
var counter=0; //used in addChar()

var isRed = false; //used in borderColorChange()

var initArray = new Array(); //used in fillArray(), subtract10(), findMax()
var currentCharParentDiv; //used in findMax(), nextPhase()
var currentCharIndex; //used in findMax(), nextPhase()

var charInitInputGood;

onLoad(setTimeout(function(){fillContent()}, 1000));


function fillContent(){
	addChar("Alvaro", false);
	addChar("Ohm", true);
	addChar("#1", true);
	addChar("#2", true);
	addChar("#3", false);
	
	document.getElementById("charInitInput0").value = "15";
	document.getElementById("charInitInput1").value = "16";
	document.getElementById("charInitInput2").value = "32";
	document.getElementById("charInitInput3").value = "30";
	document.getElementById("charInitInput4").value = "31";
	
}

function checkForm() {
	charName = document.getElementById("charNameInput");
	
	var npc = document.getElementById("CharNPCSelect");
	var npcSelected;
	npcSelected =(npc.options[npc.selectedIndex].value === "npc");
	
	if(charName.value == "" || charName.value == null) animateBorder(charName);
	else addChar(charName.value, npcSelected);
	
	charName.value = "";
}



function addChar(charNameAtt, npcSelectedAtt){
	
	//-----------Creating the elements-----------
	var parentDiv = document.createElement("div");
	var delMinusParentContainer = document.createElement("div");
	var delMinusContainer = document.createElement("div");
	var name = document.createElement("div");
	var initiativeContainer = document.createElement("div");
	var initiative = document.createElement("input");
	
	//-----------Assigning the classes and ids to the elements-----------
	if(npcSelectedAtt) parentDiv.setAttribute("class", "charContainerNpc");
	else  parentDiv.setAttribute("class", "charContainer");
	parentDiv.setAttribute("id", "charContainer"+counter);
	delMinusParentContainer.setAttribute("id", "charDel");
	delMinusContainer.setAttribute("id", "charDelMinus");
	name.setAttribute("id", "charName");
	initiativeContainer.setAttribute("id", "charInit");
	initiative.setAttribute("class", "charInitInput");
	initiative.setAttribute("id", "charInitInput"+counter);
	counter++;
	
	//-----------Filling the elements-----------
	name.innerHTML = charNameAtt;
	delMinusParentContainer.innerHTML = "["
	delMinusContainer.innerHTML = "-";
	
	//-----------Getting the parent element to insert into-----------
	var insertChar = document.getElementById("charMasterContainer");
	
	//-----------Inserting the elements-----------
	delMinusParentContainer.appendChild(delMinusContainer);
	delMinusParentContainer.innerHTML = (delMinusParentContainer.innerHTML + "]");
	parentDiv.appendChild(delMinusParentContainer);
	parentDiv.appendChild(name);
	initiativeContainer.appendChild(initiative);
	parentDiv.appendChild(initiativeContainer);
	insertChar.appendChild(parentDiv);
}

function animateBorder(element){
	var animate = setInterval(function(){borderColorChange(element)}, 100);
	setTimeout(function(){clearInterval(animate)}, 900);
	setTimeout(function(){element.setAttribute("style", "border-color: #88A8B7;")}, 1000);
}


function borderColorChange(element){
	if(isRed === true){
		element.setAttribute("style", "border-color: #88A8B7;");
		isRed = false;
	}
	else{
		element.setAttribute("style", "border-color: #FF8888;");
		isRed = true;
	}
}


function fillArray(){
	var initiative;
	charInitInputGood = true;
	for(var i=0; i<counter; i++){
		initiative = document.getElementById("charInitInput"+i);
		if(initiative.value == null || initiative.value == ""){
			animateBorder(initiative);
			charInitInputGood = false;
		}
		else initArray[i] = parseInt(initiative.value);
	}
}

function subtract10(){
	var initiative = document.getElementById("charInitInput"+currentCharIndex)
	if (initArray[currentCharIndex] > 10) initiative.value = initArray[currentCharIndex] - 10;
	else initiative.value = 0;
}

function clearRound(){
	for(var i=0; i<initArray.length; i++){
		document.getElementById("charInitInput"+i).value = "";
	}
	currentCharParentDiv = null;
	currentCharIndex = null;
}

function findMax(){
	var max=0;
	for(var i=0;i<initArray.length; i++){
		if(initArray[i]>initArray[max] && initArray[i] > 0) max=i;
	}
	if(initArray[max] <= 0){
		currentCharParentDiv.setAttribute("class", "charContainer");
		clearRound();
	}
	else{
		var newCharParentDiv = document.getElementById("charContainer"+max);
		if(newCharParentDiv.getAttribute("class") == "charContainer") newCharParentDiv.setAttribute("class", "charContainerSelected");
		else newCharParentDiv.setAttribute("class", "charContainerNpcSelected");
		if(currentCharParentDiv != null){
			if(currentCharParentDiv.getAttribute("class") == "charContainerSelected") currentCharParentDiv.setAttribute("class", "charContainer");
			else currentCharParentDiv.setAttribute("class", "charContainerNpc");
		}
		currentCharParentDiv = newCharParentDiv;
		currentCharIndex = max;
	}
}

function nextPhase(){
	if(currentCharParentDiv!=null) subtract10();
	fillArray();
	if(charInitInputGood) findMax();
	
}