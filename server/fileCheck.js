var chokidar = require('chokidar');
var fs = require('fs');
var md5 = require('md5');
var path = require('path');

// chokidar.watch('.', {ignored: /(^|[\/\\])\../}).on('all', (event, path) => {
//     console.log(event, path);
//     if (event == "add"){
//         console.log(`New File added: ${path}`)
//     }
//   });


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

watcher.on('add', async (thisPath) => {


    try {
        const fileHash = await md5(fs.readFile(path.join(__dirname, thisPath)));

        const fileStructure = {
            file: thisPath,
            hash: fileHash
        }
    
        files.push(fileStructure);
        console.log("Array is: ", files)
        
    } catch (err) {
        console.log(err);
    }


});

  ;