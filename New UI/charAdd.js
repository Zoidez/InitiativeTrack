function charAdd() {
	
	//-----------Creating the HTML fields-----------
	this.form = document.createElement("form");
	this.name = document.createElement("input");
	this.pc = document.createElement("button");
	this.npc = document.createElement("button");
	this.baseInit = document.createElement("input");
	this.d6Init = document.createElement("input");
	this.woundMod = document.createElement("select");
	this.option0 = document.createElement("option");
	this.option1 = document.createElement("option");
	this.option2 = document.createElement("option");
	this.option3 = document.createElement("option");
	this.option4 = document.createElement("option");
	this.option5 = document.createElement("option");
	this.option6 = document.createElement("option");
	this.option7 = document.createElement("option");
	this.option8 = document.createElement("option");
	this.option9 = document.createElement("option");
	this.notes = document.createElement("input");
	
	//-----------Assigning the classes and ids to the elements-----------
	this.form
}

function pcNpcButtonOnClick(isPc) {
	var pcButton = document.getElementById("charPcButton");
	var npcButton = document.getElementById("charNpcButton");
	if(isPc){
		npcButton.style.backgroundColor = pcButton.style.backgroundColor;
		pcButton.style.backgroundColor = "#397652";
	}
	else {
		pcButton.style.backgroundColor = npcButton.style.backgroundColor;
		npcButton.style.backgroundColor = "#397652";
	}
}