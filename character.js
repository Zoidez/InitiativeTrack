function character(charNameAtt, npcSelectedAtt, baseInit, D6Init, initInput, counter){

	//-----------Creating the HTML-independent fields-----------
	this.npc = npcSelectedAtt;
	this.isHighlighted = false;
	this.baseInit = parseInt(baseInit);
	this.D6Init = parseInt(D6Init);
	this.nameString = charNameAtt;
	this.acted = false;

	//-----------Initializing the methods-----------
	this.animateFloat = animateFloat;
	this.sub = sub;
	this.highlight = highlight;
	this.del = del;
	this.randNpcInit = randNpcInit;

	//-----------Creating the HTML fields-----------
	this.parentDiv = document.createElement("div");
	this.delButtonContainer = document.createElement("div");
	this.delButton = document.createElement("button");
	this.delMinus = document.createElement("div");
	this.name = document.createElement("div");
	this.initiativeContainer = document.createElement("div");
	this.initiative = document.createElement("input");
	this.floatNumber = document.createElement("div");
	this.sub5Container = document.createElement("div");
	this.sub5 = document.createElement("button");	
	this.sub10Container = document.createElement("div");
	this.sub10 = document.createElement("button");
	
	// New code
	
	this.sub7Container = document.createElement("div");
	this.sub7 = document.createElement("button");

	//-----------Assigning the classes and ids to the elements-----------
	if(npcSelectedAtt) this.parentDiv.setAttribute("class", "charContainerNpc");
	else this.parentDiv.setAttribute("class", "charContainer");
	this.parentDiv.setAttribute("id", counter);
	this.parentDiv.style.height = "0";
	this.delButtonContainer.setAttribute("id", "charDel");
	this.delButton.setAttribute("class", "charDelButton");
	this.delButton.setAttribute("id", "charDelButton");
	this.delButton.setAttribute("onClick", "deleteChar(this.parentElement.parentElement.id, 100)");
	this.delMinus.setAttribute("id", "charDelMinus");
	this.name.setAttribute("id", "charName");
	this.initiativeContainer.setAttribute("id", "charInit");
	this.initiative.setAttribute("class", "charInitInput");
	this.initiative.setAttribute("id", "charInitInput");
	this.initiative.setAttribute("tabindex", (counter+1));
	this.initiative.setAttribute("onKeyPress", "initInputChanged(" + counter + ")");
	this.floatNumber.setAttribute("class", "charInitFloat");
	this.floatNumber.setAttribute("id", "charInitFloat");
	this.sub5Container.setAttribute("id", "subContainer");
	this.sub5.setAttribute("class", "sub5Button");
	this.sub5.setAttribute("id", "sub5Button");
	this.sub5.setAttribute("onClick", "chars[this.parentElement.parentElement.id].sub(5)");
	
	
	this.sub10Container.setAttribute("id", "subContainer");
	this.sub10.setAttribute("class", "sub10Button");
	this.sub10.setAttribute("id", "sub10Button");
	this.sub10.setAttribute("onClick", "chars[this.parentElement.parentElement.id].sub(10)");
	
	// New code
	
	this.sub7Container.setAttribute("id", "subContainer");
	this.sub7.setAttribute("class", "sub7Button");
	this.sub7.setAttribute("id", "sub7Button");
	this.sub7.setAttribute("onClick", "chars[this.parentElement.parentElement.id].sub(7)");

	//-----------Filling the elements-----------
	this.delMinus.innerHTML = "-";
	this.name.innerHTML = charNameAtt;
	this.initiative.value = (initInput == null || initInput == "") ? "" : initInput;
	console.log("initInput: "+initInput);
	this.floatNumber.innerHTML = "10";
	this.sub5.innerHTML = "-5";
	this.sub10.innerHTML = "-10";
	
	// New code
	
	this.sub7.innerHTML = "-7";

	//-----------Getting the parent element to insert into-----------
	var insertChar = document.getElementById("charMasterContainer");

	//-----------Inserting the elements-----------
	this.delButton.appendChild(this.delMinus);
	this.delButtonContainer.appendChild(this.delButton);
	this.parentDiv.appendChild(this.delButtonContainer);
	this.parentDiv.appendChild(this.name);
	this.initiativeContainer.appendChild(this.initiative);
	this.initiativeContainer.appendChild(this.floatNumber);
	this.parentDiv.appendChild(this.initiativeContainer);
	this.sub5Container.appendChild(this.sub5);
	this.parentDiv.appendChild(this.sub5Container);
	
	// New code
	
	this.sub7Container.appendChild(this.sub7);
	this.parentDiv.appendChild(this.sub7Container);
	// End New code
	
	this.sub10Container.appendChild(this.sub10);
	this.parentDiv.appendChild(this.sub10Container);
	
	
	insertChar.appendChild(this.parentDiv);
	animate(this.parentDiv, 'height', 0, 35, 2);

	//END of Constructor. METHODS from here.
	function randNpcInit(){
		var init = 0;
		for(var i=0; i<this.D6Init; i++){
			init += Math.floor((Math.random()*6)+1);
		}
		init += this.baseInit;
		this.initiative.value = init;
	}
	function highlight(highlight){
		element = this.parentDiv;
		this.isHighlighted = highlight;
		if(highlight) this.parentDiv.setAttribute("class", "charContainerSelected");
		else{
			if(this.npc) this.parentDiv.setAttribute("class", "charContainerNPC");
			else this.parentDiv.setAttribute("class", "charContainer");
		}
	}
	function sub(sub){
		var parentElement = this;
		var element = this.initiative;
		if (parseInt(element.value) > parseInt(sub)){
			element.value = parseInt(element.value) - sub;
			parentElement.animateFloat(sub);
		}
		else{
			parentElement.animateFloat(element.value);
			element.value = 0;
		}
	}
	function animateFloat(damage){
		var top = 3;
		var opacity = 1;
		var element = this.floatNumber;
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
	function del(){
		this.parentDiv.parentElement.removeChild(this.parentDiv);
	}
}
