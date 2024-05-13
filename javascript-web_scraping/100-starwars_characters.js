#!/usr/bin/node

const request = require('request');

const movieId = process.argv[2];

if (!movieId) {
    console.log("Please provide a movie ID.");
    process.exit(1);
}

const movieUrl = `https://swapi.dev/api/films/${movieId}/`;

request.get(movieUrl, (error, response, body) => {
    if (error) {
        console.error('Error:', error);
        return;
    }
    if (response.statusCode !== 200) {
        console.error('Request failed with status:', response.statusCode);
        return;
    }

    const movieData = JSON.parse(body);
    const charactersUrls = movieData.characters;

    charactersUrls.forEach(characterUrl => {
        request.get(characterUrl, (error, response, body) => {
            if (error) {
                console.error('Error:', error);
                return;
            }
            if (response.statusCode !== 200) {
                console.error('Request failed with status:', response.statusCode);
                return;
            }

            const characterData = JSON.parse(body);
            console.log(characterData.name);
        });
    });
});
