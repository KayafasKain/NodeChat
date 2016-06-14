//here is code for separate functions which do their own work

//MEDIA parsers
	//smiley parse
		function parse_link( comment ){

				var place = comment.replace(/(http.*?(\s|\n|\t|$))/gi, function( match ) {
					return '<a class = "link" href="' + match + '">  '+ match +'  </a>';
				});
				
			return place;			
		}
		function parse_smile( comment ) {
			var replaced = comment.replace(/(\:\)|\:D|\:\(|\XD)/gi, function( match ) {
				smilies = {
					":D": "happy.png",
					"XD": "lauf.png",
					":(": "sad.png",
					":)": "smile-face.png"
				}
				console.log(match);
				return '<img class = "smiles" src="img/vemoji/' + smilies[match] + '" alt="smile" />';
			});
			
			return replaced;
		}
	// end of smiley parsing
	//======================
	//image parse
		function parse_img( comment ) {
			var place = comment.replace(/(\shttp.*(png|jpg|jpeg|gif)\s)/gi, function( match ) {
				return '<img class = "pastedImg" src="' + match + '" alt="pasted image" />';
			});
			
			return place;
		}
	// end of image parsing
	//======================
	//video parse (work in progress)
		function parse_video( comment ) {
			//insert video as a frame(WIP)
			var place = comment.replace(/\shttps:..www.youtube.com.watch\?v=([^&].*?(\s|\n|\t))/gi, function( match ) {
				console.log(match);
				var l = " https:..www.youtube.com.watch?v=";

				return '<iframe class = "pastedVideo" src="https://www.youtube.com/embed/'+ match.substring(l.length) +'" frameborder="0" allowfullscreen></iframe>';
			});
			
			return place;
		}
	// end of video parsing
	//======================
//END of media parsers	