
var counter=0; //used in addChar()

var isRed = false; //used in borderColorChange()

var initArray = new Array(); //used in fillArray(), subtract10(), findMax()
var currentCharParentDiv; //used in findMax(), nextPhase()
var currentCharIndex = []; //used in findMax(), nextPhase()
var currentMax;

var charInitInputGood;

//onLoad(setTimeout(function(){fillContent()}, 1000));


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
	var sub5Container = document.createElement("div");
	var sub5 = document.createElement("button");
	var sub10Container = document.createElement("div");
	var sub10 = document.createElement("button");
	
	//-----------Assigning the classes and ids to the elements-----------
	if(npcSelectedAtt) parentDiv.setAttribute("class", "charContainerNpc-10");
	else  parentDiv.setAttribute("class", "charContainer-10");
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
	sub5Container.setAttribute("id", "subContainer");
	sub5.setAttribute("id", "sub5Button");
	sub5.setAttribute("onClick", "sub("+counter+", 5)");
	sub10Container.setAttribute("id", "subContainer");
	sub10.setAttribute("id", "sub10Button");
	sub10.setAttribute("onClick", "sub("+counter+", 10)");
	
	//-----------Filling the elements-----------
	delMinus.innerHTML = "-";
	name.innerHTML = charNameAtt;
	sub5.innerHTML = "-5";
	sub10.innerHTML = "-10";
	
	//-----------Getting the parent element to insert into-----------
	var insertChar = document.getElementById("charMasterContainer");
	
	//-----------Inserting the elements-----------
	delButton.appendChild(delMinus);
	delButtonContainer.appendChild(delButton);
	parentDiv.appendChild(delButtonContainer);
	parentDiv.appendChild(name);
	initiativeContainer.appendChild(initiative);
	parentDiv.appendChild(initiativeContainer);
	sub5Container.appendChild(sub5);
	parentDiv.appendChild(sub5Container);
	sub10Container.appendChild(sub10);
	parentDiv.appendChild(sub10Container);
	insertChar.appendChild(parentDiv);
	
	animateCharVertical(counter, 35);	
	counter++;
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

function animateCharVertical(index, height){
	var end;
	var classElement = document.getElementById("charContainer"+index).getAttribute("class");
	if(height == 0){
		height = 0;
		end = 35;
		var interval = window.setInterval(function(){
			document.getElementById("charContainer"+index).setAttribute("class", "charContainer" + (end - height*2));
			height++;
			if((end - height*2) <= -10){
				window.clearInterval(interval);
				if(classElement == "charContainer") document.getElementById("charContainer"+index).setAttribute("class", "charContainer-10");
				else document.getElementById("charContainer"+index).setAttribute("class", "charContainerNPC-10");
			}
		}, 1);
	}
	else{
		end = height;
		height = 0;
		var interval = window.setInterval(function(){
			document.getElementById("charContainer"+index).setAttribute("class", "charContainer" + (height*2));
			height++;
			if((height*2) >= end){
				window.clearInterval(interval);
				if(classElement == "charContainer0") document.getElementById("charContainer"+index).setAttribute("class", "charContainer");
				else document.getElementById("charContainer"+index).setAttribute("class", "charContainerNPC");
			}
		}, 1);
			
			//document.getElementById("charContainer"+index).style.height = height + "px";
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

function subtract10(index){
	var initiativeInput;
	var initiative;
	for(var i=0; i<currentCharIndex.length; i++){
		if(document.getElementById("charInitInput"+currentCharIndex[i]) /*&& parseInt(document.getElementById("charInitInput"+curentCharIndex[i]).value) == currentMax*/){
			sub(currentCharIndex[i], 10);
		}
	}

}

function sub(index, sub){
	initiativeInput = document.getElementById("charInitInput" + index)
	initiative = parseInt(initiativeInput.value);
	if (initiative > parseInt(sub)) initiativeInput.value = initiative - sub;
	else initiativeInput.value = 0;
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
	//------------Animate the Removal------------
	animateCharVertical(index, 0);
	//------------Remove the Element------------
	setTimeout(function(){
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
	}, 300);
}

function nextPhase(){
	if(currentCharIndex!=null) subtract10(null);
	findMax();
	
}