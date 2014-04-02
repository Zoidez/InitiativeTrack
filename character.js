function character(charNameAtt, npcSelectedAtt, counter){

	//-----------Initializing the methods-----------
	this.animateCharVertical = animateCharVertical;

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

	//-----------Creating the HTML-independent fields-----------
	this.npc = npcSelectedAtt;
	this.isHighlighted = false;

	//-----------Assigning the classes and ids to the elements-----------
	if(npcSelectedAtt) this.parentDiv.setAttribute("class", "charContainerNpc");
	else this.parentDiv.setAttribute("class", "charContainer");
	this.parentDiv.setAttribute("id", "charContainer");
	this.parentDiv.style.height = "0";
	this.delButtonContainer.setAttribute("id", "charDel");
	this.delButton.setAttribute("class", "charDelButton");
	this.delButton.setAttribute("id", "charDelButton");
	this.delButton.setAttribute("onClick", "deleteChar("+counter+")");
	this.delMinus.setAttribute("id", "charDelMinus");
	this.name.setAttribute("id", "charName");
	this.initiativeContainer.setAttribute("id", "charInit");
	this.initiative.setAttribute("class", "charInitInput");
	this.initiative.setAttribute("id", "charInitInput");
	this.floatNumber.setAttribute("class", "charInitFloat");
	this.floatNumber.setAttribute("id", "charInitFloat");
	this.sub5Container.setAttribute("id", "subContainer");
	this.sub5.setAttribute("class", "sub5Button");
	this.sub5.setAttribute("id", "sub5Button");
	this.sub5.setAttribute("onClick", "sub("+counter+", 5)");
	this.sub10Container.setAttribute("id", "subContainer");
	this.sub10.setAttribute("class", "sub10Button");
	this.sub10.setAttribute("id", "sub10Button");
	this.sub10.setAttribute("onClick", "sub("+counter+", 10)");

	//-----------Filling the elements-----------
	this.delMinus.innerHTML = "-";
	this.name.innerHTML = charNameAtt;
	this.floatNumber.innerHTML = "10";
	this.sub5.innerHTML = "-5";
	this.sub10.innerHTML = "-10";

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
	this.sub10Container.appendChild(this.sub10);
	this.parentDiv.appendChild(this.sub10Container);
	insertChar.appendChild(this.parentDiv);

	this.animateCharVertical(true);
	//counter++;

	//END of Constructor. FUNCTIONS from here.
	function animateCharVertical(unroll){
		var element = this;
		var end;
		var height;
		if(unroll){
			height = 0;
			end = 35;
			var interval = window.setInterval(function(){
				element.parentDiv.style.height = (height + "px");
				height+=2;
				if(height >= end){
					window.clearInterval(interval);
					element.parentDiv.style.height = "35px";
				}
			}, 1);
		}
		else{
			height = 35;
			end = 0;
			var interval = window.setInterval(function(){
				element.parentDiv.style.height = (height + "px");
				height-=2;
				if(height <= end){
					window.clearInterval(interval);
					element.parentDiv.style.height = "0px";
					element.parentDiv.style.padding = "0px";
				}
			}, 1);
			//document.getElementById("charContainer"+index).style.height = height + "px";
		}
	}
}