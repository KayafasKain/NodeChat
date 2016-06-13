var mongo = require('mongodb').MongoClient,
	client = require('socket.io').listen(8080).sockets;

	mongo.connect('mongodb://127.0.0.1/chat',function(err,db){
		if(err) throw err;

		client.on('connection', function(socket){

			var col = db.collection('messages'),
				sendStatus = function(s) {
					socket.emit('status',s);
				};

			//emit all messages
			col.find().limit(100).sort({_id: 1}).toArray(function(err, res){
				if(err) throw err;

				socket.emit('output', res);

			});


			socket.on('input',function(data){

				var name = data.name,
					message = data.message,
					whiteSpacceCheck = /^\s*$/;

					// col.insert({name: name, message: message},function(){
					// 	console.log("inserted");
					// });

				if(whiteSpacceCheck.test(name) || whiteSpacceCheck.test(message)){
					sendStatus('Name and message is required.');
				}else{
					col.insert({name: name, message: message},function(){

						//emit lastest messages
						socket.emit('output', [data]);

						//show status
						sendStatus({
							message: "Message sent",
							clear: true
						});
					});
				}

			});
		});
	});
