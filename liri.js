var fs = require('fs');

var keys = require('./keys.js');
var Twitter = require('twitter'); 
var spotify = require('spotify');
var request = require('request'); 

var nodeArgs = process.argv;

console.log(nodeArgs);