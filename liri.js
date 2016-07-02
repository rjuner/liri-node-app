var fs = require('fs');

var Twitter = require('twitter'); 
var spotify = require('spotify');
var request = require('request'); 

var keys = require('./keys.js');

var nodeArgs = process.argv;

var action = process.argv[2];
var value = process.argv[3];

//console.log(nodeArgs);

switch(action){
	case 'my-tweets': myTweets(); 
	break; 

	case 'spotify-this-song': spotifyThis();
	break; 

	case 'movie-this': omdb();
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

	var queryURL = "http://www.omdbapi.com/?t=" + value + "&y&plot=short&r=json&tomatoes=true"; 

	request(queryURL, function (error, response, body){
		if (!error && response.statusCode == 200) {
			console.log("Rotten Tomatoes Rating: " + JSON.parse(body)["tomatoRating"]);
		}else{
			console.log(error);
		}
	});

}