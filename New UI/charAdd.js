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