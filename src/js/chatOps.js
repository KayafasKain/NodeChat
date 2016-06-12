(function(){
	var getNode = function(s){
		return document.querySelector(s);
	},
	textarea = getNode('.chat-textarea'),
	chatName = getNode('.chat-name');

	try {
		var socket = io.connect('http://127.0.0.1:8080');
	} catch(e) {
		alert("connection lost");
	}

	if(socket !== undefined){
		console.log("all well");
		//listen for message
		textarea.addEventListener('keydown',function(event){
			var self  = this,
				name = chatName.value;
			if(event.which === 13 && event.shiftKey === false){

			}

		});
	}
})();