var fs = require('fs');

var Twitter = require('twitter'); 
var spotify = require('spotify');
var request = require('request'); 

var keys = require('./keys.js');

var nodeArgs = process.argv;

console.log(nodeArgs);

var client = new Twitter(keys.twitterKeys);

var params = {screen_name: 'rjuner', count: 30, include_rts: false};

client.get('statuses/user_timeline', params, function(error, tweets, response){
  if (!error) {
  	for(i = 0; i < 20; i++){
    console.log(tweets[i].text);
	}
  }
});

//data.tracks.items[0]