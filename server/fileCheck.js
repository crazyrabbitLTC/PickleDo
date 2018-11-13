var chokidar = require('chokidar');
var fs = require('fs');
var md5 = require('md5');
var path = require('path');

var Parser = require('exif-parser');

const gas = {
    price: 20 * 1e8,
    limit: 2100000,
}

let files = [];

var watcher = chokidar.watch('./testFolder', {
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



    try {
       await fs.readFile(path.join(__dirname, thisPath), async (err, buf) => {

            const fileHash = await md5(buf);

            const fileStructure = {
                file: thisPath,
                hash: fileHash
            }

            files.push(fileStructure);
            console.log("FILES: ", files)


        });


    } catch (err) {
        console.log(err);
    }
});


watcher.on('add', filePath => {

    console.log("The FilePath is: ", filePath);
    let jpegData = fs.readFileSync('filePath');
    let parser = Parser.create(buffer);
    // let result = parser.parse();    

})