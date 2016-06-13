(function(){
	var getNode = function(s){
		return document.querySelector(s);
	},
	messages = getNode('.chat-messages'),
	status = getNode('.chat-status span'),
	textarea = getNode('.chat-textarea'),
	chatName = getNode('.chat-name');

	try {
		var socket = io.connect('http://127.0.0.1:8080');
	} catch(e) {
		alert("connection lost");
	}

	statusDefault = status.textContent,

	setStatus = function(s){
		status.textContent = s;

		if( s !== statusDefault ){
			var delay = setTimeout(function(){
				setStatus( statusDefault );
				clearInterval( delay )
			}, 3000);
		}
	}

	//setStatus("T");

	if(socket !== undefined){
		console.log("all well");

		//listen for output
		socket.on('output', function(data){
			if(data.length){
				//loop resoults
				for(var x = 0;x < data.length; x = x + 1){
					var message = document.createElement('div');
					message.setAttribute('class', 'chat-message');
					message.textContent = data[x].name + ': ' + data[x].message;

					messages.appendChild( message );
					messages.insertBefore(message, messages.lastChild);
				}
			}
		});


		//status listener
		socket.on('status', function(data){
			setStatus(( typeof data === 'object') ? data.message : data );

			if(data.clear === true){
				textarea.value = '';
			}
		});

		//listen for message
		textarea.addEventListener('keydown', function( event ) {
			var self  = this,
				name = chatName.value;

			//send message
			if(event.which === 13 && event.shiftKey === false){
				socket.emit('input',{
					name: name,
					message: self.value
				});
			}

		});
	}
})();