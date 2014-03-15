
var counter=0; //used in addChar()

var isRed = false; //used in borderColorChange()

var initArray = new Array(); //used in fillArray(), subtract10(), findMax()
var currentCharParentDiv; //used in findMax(), nextPhase()
var currentCharIndex = []; //used in findMax(), nextPhase()
var currentMax;

var charInitInputGood;

onLoad(setTimeout(function(){fillContent()}, 1000));


function fillContent(){
	addChar("Alvaro", false);
	addChar("Ohm", true);
	addChar("#1", true);
	addChar("#2", true);
	addChar("#3", false);
	
	document.getElementById("charInitInput0").value = "12";
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
	var delButtonContainer = document.createElement("div");
	var delButton = document.createElement("button");
	var delMinus = document.createElement("div");
	var name = document.createElement("div");
	var initiativeContainer = document.createElement("div");
	var initiative = document.createElement("input");
	
	//-----------Assigning the classes and ids to the elements-----------
	if(npcSelectedAtt) parentDiv.setAttribute("class", "charContainerNpc");
	else  parentDiv.setAttribute("class", "charContainer");
	parentDiv.setAttribute("id", "charContainer"+counter);
	delButtonContainer.setAttribute("id", "charDel");
	delButton.setAttribute("class", "charDelButton");
	delButton.setAttribute("id", "charDelButton"+counter);
	delButton.setAttribute("onClick", "deleteChar("+counter+")");
	delMinus.setAttribute("id", "charDelMinus");
	name.setAttribute("id", "charName");
	initiativeContainer.setAttribute("id", "charInit");
	initiative.setAttribute("class", "charInitInput");
	initiative.setAttribute("id", "charInitInput"+counter);
	counter++;
	
	//-----------Filling the elements-----------
	name.innerHTML = charNameAtt;
	delMinus.innerHTML = "-";
	
	//-----------Getting the parent element to insert into-----------
	var insertChar = document.getElementById("charMasterContainer");
	
	//-----------Inserting the elements-----------
	delButton.appendChild(delMinus);
	delButtonContainer.appendChild(delButton);
	parentDiv.appendChild(delButtonContainer);
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


/*function fillArray(){
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
}*/

function subtract10(){
	var initiativeInput;
	var initiative;
	for(var i=0; i<currentCharIndex.length; i++){
		if(document.getElementById("charInitInput"+currentCharIndex[i]) /*&& parseInt(document.getElementById("charInitInput"+curentCharIndex[i]).value) == currentMax*/){
			initiativeInput = document.getElementById("charInitInput"+currentCharIndex[i])
			initiative = parseInt(initiativeInput.value);
			if (initiative > 10) initiativeInput.value = initiative - 10;
			else initiativeInput.value = 0;
		}
	}
}

function clearRound(){
	var parent=document.getElementById("charMasterContainer");
	for(var i=0; i<counter; i++){
		document.getElementById("charInitInput"+i).value = "";
	}
	currentCharParentDiv = null;
	currentCharIndex = null;
}

function findMax(){
	var max=0;
	var maxInit = [];
	var parent=document.getElementById("charMasterContainer");
	for(var i=0;i<counter; i++){
		if(parseInt(document.getElementById("charInitInput"+i).value) >= parseInt(document.getElementById("charInitInput"+max).value)){
			if(parseInt(document.getElementById("charInitInput"+i).value) > parseInt(document.getElementById("charInitInput"+max).value)) maxInit = [];
			max = i;
			currentMax = parseInt(document.getElementById("charInitInput"+i).value);
			maxInit.push(i);
		}
	}
	
	//--------------Clear Previous Characters' Highlight---------------
	for(var i=0; i<counter; i++){
		if(document.getElementById("charContainer"+i).getAttribute("class") == "charContainerSelected") document.getElementById("charContainer"+i).setAttribute("class", "charContainer");
		else if(document.getElementById("charContainer"+i).getAttribute("class") == "charContainerNpcSelected") document.getElementById("charContainer"+i).setAttribute("class", "charContainerNpc");
	}
	
	if(parseInt(document.getElementById("charInitInput"+max).value) <= 0) clearRound();
	else{
		currentCharIndex = [];
		for(var i=0; i<maxInit.length; i++){
			document.getElementById("charContainer"+maxInit[i]).setAttribute("class", document.getElementById("charContainer"+maxInit[i]).getAttribute("class") + "Selected");
			currentCharIndex[i] = maxInit[i];
		}
	}
}

function deleteChar(index){
	//------------Remove the Element------------
	document.getElementById("charContainer" + index).parentElement.removeChild(document.getElementById("charContainer" + index));
	//------------All the numbered elements have their numbers set one back-----------
	for(var i=index+1; i<counter; i++){
		document.getElementById("charContainer" + i).setAttribute("id", "charContainer" + (i-1));
		document.getElementById("charInitInput" + i).setAttribute("id", "charInitInput" + (i-1));
		document.getElementById("charDelButton" + i).setAttribute("onClick", "deleteChar("+(i-1)+")");
		document.getElementById("charDelButton" + i).setAttribute("id", "charDelButton" + (i-1));
	}
	//-------------If such elements are mentioned in currentCharIndex, those references (counter numbers) have to be set one back too.
	for(var i=0; i<currentCharIndex.length; i++){
		if(currentCharIndex[i]>parseInt(index) || currentCharIndex[i] == parseInt(index)) currentCharIndex[i]--;
			//----------If the element deleted is referenced to in the currentCharIndex, remove it from the array and since the next element instantly jumps into the deleted element's place, have i-- so it would go through the element and not skip it.
			if(currentCharIndex[i] == parseInt(index-1)) currentCharIndex.splice(i--, 1);
	}
	counter--;
}

function nextPhase(){
	if(currentCharIndex!=null) subtract10();
	findMax();
	
}