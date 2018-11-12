'use strict';


const fs = require('fs');
const spawn = require('child_process').spawn;


console.log("Starting Ganache-CLI");

//This Memonic is not secure.
const memonic = "detail august fragile luggage coyote home trap veteran witness result feed blade";
const port = 7545
const ganache = spawn('ganache-cli', ["-m", memonic, "-p", port]);
ganache.stdout.pipe(process.stdout);

