
var counter=0; //used in addChar()

var isRed = false; //used in borderColorChange()

var initArray = new Array(); //used in fillArray(), subtract10(), findMax()
var currentCharParentDiv; //used in findMax(), nextPhase()
var currentCharIndex = []; //used in findMax(), nextPhase()
var currentMax;
var chars = [];

var charInitInputGood;

onLoad(setTimeout(function(){fillContent()}, 1000));

//Script's
function fillContent(){
	addChar("Alvaro", false);
	//addChar("Ohm", true);
	//addChar("#1", true);
	//addChar("#2", true);
	//addChar("#3", false);
	
	chars[0].initiative.value = "12";
	//chars[1].initiative.value = "16";
	//chars[2].initiative.value = "32";
	//chars[3].initiative.value = "30";
	//chars[4].initiative.value = "31";
}

//Script's
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
	//alert(chars.length + "\n" + chars[(chars.length-1)].npc);
}

//Script's. Since this function receives charInitInput as well as charAddInput, we can have it outside the class and call animateBorder(chars[i]) instead of chars[i].animateBorder(). Same thing but then we shall not have to write animateBorder twice.
/*function animateBorder(element){
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
	setTimeout(function(){element.style.border-color = "#88A8B7"}, 1000);
}
//Object's
/*function animateCharVertical(index, unroll){
	
	var end;
	var height;
	var element = document.getElementById("charContainer"+index);
	if(unroll){
		height = 0;
		end = 35;
		var interval = window.setInterval(function(){
			element.style.height = (height + "px");
			height+=2;
			if(height >= end){
				window.clearInterval(interval);
				element.style.height = "35px";
			}
		}, 1);
	}
	else{
		height = 35;
		end = 0;
		var interval = window.setInterval(function(){
			element.style.height = (height + "px");
			height-=2;
			if(height <= end){
				window.clearInterval(interval);
				element.style.height = "0px";
				element.style.padding = "0px";
			}
		}, 1);
			
			//document.getElementById("charContainer"+index).style.height = height + "px";
	}
	
}

//Object's
function animateFloat(index, damage){
	var top = 3;
	var opacity = 1;
	var element = document.getElementById("charInitFloat"+index);
	element.innerHTML = damage;
	element.style.visibility = "visible";
	var interval = window.setInterval(function(){
		element.style.top = (top + "px");
		element.style.opacity = opacity;
		top--;
		opacity-=0.075
		if(top <= -17){
			window.clearInterval(interval);
			element.style.top = "3px";
			element.style.opacity = "1";
			element.style.visibility = "hidden";
		}
	}, 30);
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

//Object's
/*function subtract10(index){
	var initiativeInput;
	var initiative;
	for(var i=0; i<currentCharIndex.length; i++){
		if(document.getElementById("charInitInput"+currentCharIndex[i]) /*&& parseInt(document.getElementById("charInitInput"+curentCharIndex[i]).value) == currentMax*//*){
			sub(currentCharIndex[i], 10);
		}
	}

}

//Object's
/*function sub(index, sub){
	initiativeInput = document.getElementById("charInitInput" + index)
	initiative = parseInt(initiativeInput.value);
	if (initiative > parseInt(sub)){
		initiativeInput.value = initiative - sub;
		animateFloat(index, sub);
	}
	else{
		animateFloat(index, initiativeInput.value);
		initiativeInput.value = 0;
	}
}

//Script's
function clearRound(){
	var parent=document.getElementById("charMasterContainer");
	for(var i=0; i<counter; i++){
		document.getElementById("charInitInput"+i).value = "";
	}
	currentCharParentDiv = null;
	currentCharIndex = null;
}

//Script's
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

//The content is object's, the interface is script's because the object's index is passed and there is no other way around it that I want to deal with right now.
function deleteChar(index){
	//------------Animate the Removal------------
	animateCharVertical(index, false);
	//------------Remove the Element------------
	setTimeout(function(){
		document.getElementById("charContainer" + index).parentElement.removeChild(document.getElementById("charContainer" + index));
	//------------All the numbered elements have their numbers set one back-----------
		for(var i=index+1; i<counter; i++){
			document.getElementById("charContainer" + i).setAttribute("id", "charContainer" + (i-1));
			document.getElementById("charInitInput" + i).setAttribute("id", "charInitInput" + (i-1));
			document.getElementById("charDelButton" + i).setAttribute("onClick", "deleteChar("+(i-1)+")");
			document.getElementById("charDelButton" + i).setAttribute("id", "charDelButton" + (i-1));
			document.getElementById("sub5Button" + i).setAttribute("onClick", "sub("+(i-1)+", 5)");
			document.getElementById("sub5Button" + i).setAttribute("id", "sub5Button" + (i-1));
			document.getElementById("sub10Button" + i).setAttribute("onClick", "sub("+(i-1)+", 10)");
			document.getElementById("sub10Button" + i).setAttribute("id", "sub10Button" + (i-1));
			document.getElementById("charInitFloat" + i).setAttribute("id", "charInitFloat" + (i-1));
		}
	//-------------If such elements are mentioned in currentCharIndex, those references (counter numbers) have to be set one back too.
		for(var i=0; i<currentCharIndex.length; i++){
			if(currentCharIndex[i]>parseInt(index) || currentCharIndex[i] == parseInt(index)) currentCharIndex[i]--;
	//----------If the element deleted is referenced to in the currentCharIndex, remove it from the array and since the next element instantly jumps into the deleted element's place, have i-- so it would go through the element and not skip it.
			if(currentCharIndex[i] == parseInt(index-1)) currentCharIndex.splice(--i, 1);
		}
		counter--;
	}, 300);
}

//Script's
function nextPhase(){
	if(currentCharIndex!=null) subtract10(null);
	findMax();
	
}*/
