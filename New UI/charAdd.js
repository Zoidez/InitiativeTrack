function charAdd(counter) {
	
	//-----------Creating the HTML-independent fields-----------
	
	//-----------Initializing the methods-----------
	this.check = check;
	this.pcNpcButtonColor = pcNpcButtonColor;

	//-----------Creating the HTML fields-----------
	this.form = document.createElement("form");
	this.name = document.createElement("input");
	this.pc = document.createElement("button");
	this.npc = document.createElement("button");
	this.baseInit = document.createElement("input");
	this.d6Init = document.createElement("select");
	this.initOption1 = document.createElement("option");
	this.initOption2 = document.createElement("option");
	this.initOption3 = document.createElement("option");
	this.initOption4 = document.createElement("option");
	this.initOption5 = document.createElement("option");
	this.woundMod = document.createElement("select");
	this.woundOption0 = document.createElement("option");
	this.woundOption1 = document.createElement("option");
	this.woundOption2 = document.createElement("option");
	this.woundOption3 = document.createElement("option");
	this.woundOption4 = document.createElement("option");
	this.woundOption5 = document.createElement("option");
	this.woundOption6 = document.createElement("option");
	this.woundOption7 = document.createElement("option");
	this.woundOption8 = document.createElement("option");
	this.woundOption9 = document.createElement("option");
	this.notes = document.createElement("textarea");
	
	//-----------Creating the text between the fields-----------
	this.space1Text = document.createElement("div");
	this.space1Text.setAttribute("id", "space1Text");
	this.space2Text = document.createElement("div");
	this.space2Text.setAttribute("id", "space2Text");
	this.plusText = document.createElement("div");
	this.plusText.setAttribute("id", "plusText");
	this.d6Text = document.createElement("div");
	this.d6Text.setAttribute("id", "d6Text");
	this.woundText = document.createElement("div");
	this.woundText.setAttribute("id", "woundText");
		
	//-----------Assigning the classes and ids to the elements-----------
	this.form.setAttribute("id", "charAddForm");
	this.name.setAttribute("id", "charNameInput");
	this.name.setAttribute("placeholder", "Character Name");
	this.name.setAttribute("onFocus", "addForm("+counter+")");
	this.pc.setAttribute("id", "charPcButton");
	this.pc.setAttribute("type", "button");
	this.pc.setAttribute("onClick", "pcNpcButtonOnClick("+counter+", true)");
	this.npc.setAttribute("id", "charNpcButton");
	this.npc.setAttribute("type", "button");
	this.npc.setAttribute("onClick", "pcNpcButtonOnClick("+counter+", false)");
	this.baseInit.setAttribute("id", "charNpcInitBaseInput");
	this.d6Init.setAttribute("id", "charNpcInitD6Select");
	this.initOption1.setAttribute("value", "1");
	this.initOption2.setAttribute("value", "2");
	this.initOption3.setAttribute("value", "3");
	this.initOption4.setAttribute("value", "4");
	this.initOption5.setAttribute("value", "5");
	this.woundMod.setAttribute("id", "charWoundModSelect");
	this.woundOption0.setAttribute("value", "0");
	this.woundOption1.setAttribute("value", "1");
	this.woundOption2.setAttribute("value", "2");
	this.woundOption3.setAttribute("value", "3");
	this.woundOption4.setAttribute("value", "4");
	this.woundOption5.setAttribute("value", "5");
	this.woundOption6.setAttribute("value", "6");
	this.woundOption7.setAttribute("value", "7");
	this.woundOption8.setAttribute("value", "8");
	this.woundOption9.setAttribute("value", "9");
	this.notes.setAttribute("id", "charNotes");
	this.notes.setAttribute("placeholder", "Notes");
	
	//-----------Filling the elements-----------
	this.pc.innerHTML = "PC";
	this.npc.innerHTML = "NPC";
	this.initOption1.innerHTML = "1";
	this.initOption2.innerHTML = "2";
	this.initOption3.innerHTML = "3";
	this.initOption4.innerHTML = "4";
	this.initOption5.innerHTML = "5";
	this.woundOption0.innerHTML = "0";
	this.woundOption1.innerHTML = "-1";
	this.woundOption2.innerHTML = "-2";
	this.woundOption3.innerHTML = "-3";
	this.woundOption4.innerHTML = "-4";
	this.woundOption5.innerHTML = "-5";
	this.woundOption6.innerHTML = "-6";
	this.woundOption7.innerHTML = "-7";
	this.woundOption8.innerHTML = "-8";
	this.woundOption9.innerHTML = "-9";
	this.space1Text.innerHTML = " ";
	this.space2Text.innerHTML = " ";
	this.plusText.innerHTML = "+";
	this.d6Text.innerHTML = "D6 ";
	this.woundText.innerHTML = "wound modifier";

	//-----------Getting the parent element to insert into-----------
	var parent = document.getElementById("formBrowserContainer");
	
	//-----------Inserting the elements-----------
	this.form.appendChild(this.name);
	this.form.appendChild(this.space1Text);
	this.form.appendChild(this.pc);
	this.form.appendChild(this.npc);
	this.form.appendChild(this.npc);
	this.form.appendChild(this.space2Text);
	this.form.appendChild(this.baseInit);
	this.form.appendChild(this.plusText);
	this.d6Init.appendChild(this.initOption1);
	this.d6Init.appendChild(this.initOption2);
	this.d6Init.appendChild(this.initOption3);
	this.d6Init.appendChild(this.initOption4);
	this.d6Init.appendChild(this.initOption5);
	this.form.appendChild(this.d6Init);
	this.form.appendChild(this.d6Text);
	this.woundMod.appendChild(this.woundOption0);
	this.woundMod.appendChild(this.woundOption1);
	this.woundMod.appendChild(this.woundOption2);
	this.woundMod.appendChild(this.woundOption3);
	this.woundMod.appendChild(this.woundOption4);
	this.woundMod.appendChild(this.woundOption5);
	this.woundMod.appendChild(this.woundOption6);
	this.woundMod.appendChild(this.woundOption7);
	this.woundMod.appendChild(this.woundOption8);
	this.woundMod.appendChild(this.woundOption9);
	this.form.appendChild(this.woundMod);
	this.form.appendChild(this.woundText);
	this.form.appendChild(document.createElement("br"));
	this.form.appendChild(this.notes);
	parent.appendChild(this.form);

	function pcNpcButtonColor(isPc) {
		this.isPc = isPc;
		var pcButton = this.pc;
		var npcButton = this.npc;
		if(isPc){
			this.npc.style.backgroundColor = "#394652";
			this.pc.style.backgroundColor = "#397652";;
		}
		else {
			pcButton.style.backgroundColor = "#394652";
			npcButton.style.backgroundColor = "#397652";
		}
	}

	function check() {
		var isInputGood = true;
		var baseInitText = this.baseInit.value;
		var regexp = /^\d+$/;
		console.log("this.name: ");
		console.log(this.name);
		if(this.name.value == "" || this.name.value == null) isInputGood = false;
		if(!(regexp.test(baseInitText) || baseInitText == "")){
			isInputGood = false;
			console.log("Regexp did not go through.");
		}
		//if(this.isPc != true || this.isPc != false) isInputGood = false;
		if(this.baseInit.value == "" || this.baseInit.value == null) isInputGood = false;
		console.log("this.baseInit: ");
		console.log(this.baseInit);
		return isInputGood;
	}
}