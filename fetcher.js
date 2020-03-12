const request = require('request');
const fs = require('fs');
let prompt = require("prompt-sync")();

const url = process.argv[2];
const path = process.argv[3];

if (fs.existsSync(path)) {
  let answer = prompt(`This file exists. Do you want to overwrite? (y/n): `);
  while (answer !== 'y' && answer !== 'n') {
    answer = prompt(`Please enter "y" or "n": `);
  }
  if (answer === 'n') {
    process.exit();
  }
}

request(url, (error, response, body) => {

  if (!error) {
    if (response.statusCode !== 200) {
      console.log(`HTTP request status code ${response.statusCode}. Exiting.`);
      return;
    }
    fs.writeFile(path, body, (err) => {
      if (err) {
        console.log(`This path does not exist. Exiting`);
        return;
      }
      console.log(`Downloaded and saved ${body.length} bytes of data to ${path}.`);
    });
  } else {
    //request error
    console.log(`There was an error reading from this url. Exiting.`);
  }
});

