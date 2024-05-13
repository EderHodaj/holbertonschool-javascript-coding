#!/usr/bin/node
const request = require('request');
const process = require('process');

const link = 'https://swapi-api.hbtn.io/api/films/' + process.argv[2];

request(link, (error, response, body) => {
  if (error) {
    console.error(error);
  } else if (response.statusCode !== 200) {
    console.error(`Response code: ${response.statusCode}`);
  } else {
    const results = JSON.parse(body);
    console.log(results.title);
  }
});
