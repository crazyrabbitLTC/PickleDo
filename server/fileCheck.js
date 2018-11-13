var chokidar = require("chokidar");
var fs = require("fs");
var md5 = require("md5");
var path = require("path");

var Parser = require("exif-parser");

const gas = {
  price: 20 * 1e8,
  limit: 2100000
};

let files = [];

var watcher = chokidar.watch("./testFolder", {
  ignored: /(^|[\/\\])\../,
  persistent: true
});

// Something to use when events are received.

var log = console.log.bind(console);

// Add event listeners.
watcher
  .on("add", thisPath => log(`File ${thisPath} has been added`))
  .on("change", thisPath => log(`File ${thisPath} has been changed`))
  .on("unlink", thisPath => log(`File ${thisPath} has been removed`));

// watcher.on("change", async thisPath => {
//   try {
//     await fs.readFile(path.join(__dirname, thisPath), async (err, buf) => {
//       const fileHash = await md5(buf);

//       const fileStructure = {
//         file: thisPath,
//         hash: fileHash
//       };

//       files.push(fileStructure);
//       console.log("FILES: ", files);
//     });
//   } catch (err) {
//     console.log(err);
//   }
// });

watcher.on("add", async filePath => {
  console.log("The FilePath is: ", filePath);
  const jpegData = fs.readFileSync(filePath);
  const fileHash = await md5(jpegData);
  const parser = Parser.create(jpegData);

  let result;
  try {
    result = await parser.parse();
    console.log("Parsed Data is: ", result);
  } catch (err) {
    // got invalid data, handle error
    console.log(err);
  }

  let filePathArray = filePath.split("/");
  console.log("FILE PATH ARRAY", filePathArray);
  let fileName = filePathArray[1].split(".");
  let newFileName = `${fileName[0]}_${fileHash}.${fileName[1]}`;

  fs.rename(
    filePath,
    `./finished/${fileName[0]}_${fileHash}.jpg`,
    function(err) {
      if (err) throw err;
      console.log("Move complete.");
    }
  );

  fs.writeFile(`./finished/${fileName[0]}_${fileHash}.txt`, JSON.stringify(result), (err)=> {
      console.log(err);
  } )

//   fs.unlink(filePath, function(err) {
//     console.log("Deletion sucessful.");
//   });
  //console.log("Result before promise?", result);
});
