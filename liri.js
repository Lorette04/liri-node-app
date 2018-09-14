// read and set any environment variables with the dotenv package
require("dotenv").config();

// Make it so liri.js can take in one of the following commands:
// 1- `concert-this`
// 2-`spotify-this-song`
// 3-`movie-this`
// 4-`do-what-it-says`



// Variables for npm requests
var request = require("request");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var moment = require("moment");
moment().format();
var dotEvent = require('dotenv');
require('dotenv').config();


//Access to Spotify keys info
var spotify = new Spotify(keys.spotify);


// text require for .txt
var fs = require('fs');

// User inputs
var input = process.argv;
var action = input[2];
var inputUser = input[3];


//set a switch case
switch (action) {
    case "concert-this":
        concert(inputUser);
        break;

    case "spotify-this-song":
        spotifySong(inputUser);
        break;

    case "movie-this":
        movie(inputUser);
        break;

    case "do-what-it-says":
        doIt(inputUser);
        break;
}

// 1 - `node liri.js concert-this <artist/band name here>`

//Concert function with Bands in Town Artist Events API
function concert(inputUser) {
    var queryURl = "https://rest.bandsintown.com/artists/" + inputUser + "/events?app_id=codingbootcamp";
    // Then run a request to the Band in Town API with the artist specified
    request.get(queryURl, function (error, response, body) {
        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200)

            var jsonData = JSON.parse(body); {
            // console.log(jsonData[0].venue.name);

            // Parse the body of the site and recover just the imdbRating
            console.log("===================Concert Details===================");
            console.log("Name of the venue: " + jsonData[0].venue.name);
            console.log("Venue location: " + jsonData[0].venue.city);
            console.log("Venue location: " + jsonData[0].venue.country);
            console.log("Date of the Event: " + jsonData[0].datetime);

            // moment().format('L');

        }
    });
}

// // 2 - `node liri.js spotify-this-song '<song name here>'`
function spotifySong(inputUser) {
    // If no song is provided, default song "The Sign" by Ace of Base
    if (!inputUser) {
        inputUser = 'The Sign';
    };

    spotify.search({ type: 'track', query: inputUser, limit: 5 }, function (error, response) {
        if (!error && response.statusCode === 200)
        // console.log(spotify);
        // console.log(response);

        var data = response.tracks.items;

        // Parse the body of the site and recover just the imdbRating
        console.log("===================My Song Details===================");
        console.log("Artist(s): " + data[0].artists[0].name);
        console.log("Song Title: " + data[0].name);
        console.log("Preview Link: " + data[0].preview_url);
        console.log("Album: " + data[0].album.name);
        //append to log.txt
        // fs.appendFile('log.txt', 'Artist: ' + data.tracks.items[0].artists[0].name + '\n' + '; Song Name: ' + data.tracks.items[0].name + '\n' + '; Spotify Preview Link: ' + data.tracks.items[0].external_urls.spotify + '\n' + '; Album: ' + data.tracks.items[0].album.name  + '\n=================================================================\n', function(err) {
        //     if (err) throw err;
        //     console.log('Saved!');
        // );

    });
}

// 3 -   `node liri.js movie-this '<movie name here>'`
function movie(inputUser) {
    //default movie: 'Mr.Nobody' when no input by the user
    if (!inputUser) {
        inputUser = 'Mr.Nobody';
    }
    //Request to OMDB API
    request("http://www.omdbapi.com/?t=" + inputUser + "&y=&plot=short&apikey=trilogy", function (error, response, body) {

        // Movies results to user input
        if (!error && response.statusCode === 200) {

            var jsonData = JSON.parse(body); {

                console.log("===================Movie Details===================")
                console.log("Title: " + jsonData.Title);
                console.log("Release Year: " + jsonData.Year);
                console.log("IMDB Rating: " + jsonData.imdbRating);
                console.log("Rotten Tomatoes Rating: " + jsonData.Ratings[1].Value);
                console.log("Country: " + jsonData.Country);
                console.log("Language: " + jsonData.Language);
                console.log("Plot: " + jsonData.Plot);
                console.log("Actors: " + jsonData.Actors);
            }
        }
    });
};

// // 4 - `node liri.js do-what-it-says`
var fs = require("fs");

fs.readFile("random.txt", "utf8", function (error) {
    if (error) {
        return console.log(error);
    }
    console.log(data);
    var dataArr = data.split(",");
    console.log(dataArr);

})