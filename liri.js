var fs = require('fs');

var Twitter = require('twitter'); 
var spotify = require('spotify');
var request = require('request'); 

var keys = require('./keys.js');

var action = process.argv[2];
var value = process.argv[3];

//makes it so you can get multi-word inputs because it goes through the whole array process.argv
for(var i = 4; i < process.argv.length; i++){
	value = value + " " + process.argv[i];
}

//console.log("what's this? " + value);

switch(action){
	case 'my-tweets': myTweets(); 
	break; 

	case 'spotify-this-song': spotifyThis();
	break; 

	case 'movie-this': omdb();
	break;

	case 'do-what-it-says': justDoIt(); 
	break;
}

function myTweets(){

	var client = new Twitter(keys.twitterKeys);

	var params = {screen_name: 'rjuner', count: 30, include_rts: false};

	client.get('statuses/user_timeline', params, function(error, tweets, response){
	  if (!error) {
	  	for(i = 0; i < 20; i++){
	    console.log(tweets[i].text + "\n " + "Date of Tweet: " + tweets[i].created_at + "\n");
		}
	  }
	});

}

function spotifyThis(){

	if (value == null){

		value = "What's my age again?";
	
	console.log("You didn't pick a song, so here's a punk classic:"); 
	}

	spotify.search({type: 'track', query: value}, function(err, data) {

		if (err) {
	        console.log('Error occurred: ' + err);
	        return;
	    } else {
	 		// Do something with 'data' 
	 		var songInfo = data.tracks.items[0];
	 		var songResult = console.log(
	 				"Artist of song is: " + songInfo.artists[0].name + "\n" 
	 				+ "Song name is: " + songInfo.name + "\n" 
	 				+ "Album song is: " + songInfo.album.name + "\n"  
	 				+ "Preview the song: " + songInfo.preview_url
	 				);
		}
	});
}

function omdb(){

	if (value == null){

		value = "Mr. Nobody";

		console.log("You didn't pick a movie, so here's a movie you didn't know existed: "); 
	}

	// console.log("the string is: " + value);

	// console.log("This is the index of: " + value.indexOf("\""));
	
	var queryURL = "http://www.omdbapi.com/?t=" + value + "&y&plot=short&r=json&tomatoes=true"; 

	request(queryURL, function (error, response, body){
		if (!error && response.statusCode == 200) {
			var data = JSON.parse(body);
			console.log(
				"Movie Title: " + data.Title + "\n" + 
				"Year Produced: " +  data.Year + "\n" + 
				"IMDB Rating: " + data.imdbRating + "\n" + 
				"Rotten Tomatoes Rating: " + data.tomatoRating + "\n");
		}else{
			console.log(error);
		}
	});

}

function justDoIt(){

	fs.readFile('random.txt', 'utf8', function(err, data){

		var textData = data.split(", ");

		action = textData[0];
		value = textData[1];

		//takes string in text file and removes the first and last quotes
		value = value.substr(1, value.length-2);

		console.log(value);

		switch(action){
			case 'my-tweets': myTweets(); 
			break; 

			case 'spotify-this-song': spotifyThis(action, value);
			break; 

			case 'movie-this': omdb(action, value);
			break;

			case 'do-what-it-says': justDoIt(); 
			break;
		}

	});

}
