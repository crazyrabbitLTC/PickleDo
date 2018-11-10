var chokidar = require('chokidar');
var fs = require('fs');
var md5 = require('md5');
var path = require('path');

//const deploy = require('./test2');
const TokenInterface = require('./tokenInterface');
const tokenInterface = new TokenInterface("hello");

let files = [];

var watcher = chokidar.watch('.', {
    ignored: /(^|[\/\\])\../,
    persistent: true
  });
  // Something to use when events are received.
var log = console.log.bind(console);

// Add event listeners.
watcher
  .on('add', thisPath => log(`File ${thisPath} has been added`))
  .on('change', thisPath => log(`File ${thisPath} has been changed`))
  .on('unlink', thisPath => log(`File ${thisPath} has been removed`));

watcher.on('change', async (thisPath) => {

//anothe
    try {
       await fs.readFile(path.join(__dirname, thisPath), async (err, buf) => {

            const fileHash = await md5(buf);

            const fileStructure = {
                file: thisPath,
                hash: fileHash
            }

            files.push(fileStructure);
            const balance = await tokenInterface.mintToken(fileHash);
            //console.log("Array is: ", files)

        });


        //console.log("Balance after operation is: ", balance);
    } catch (err) {
        console.log(err);
    }
});

