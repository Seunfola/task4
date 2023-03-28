const fs = require("fs");
const sourceFilename = process.argv[2];
const targetFilename = process.argv[3];

if (!sourceFilename || !targetFilename) {
  console.error("Please specify a source file and a target file");
  process.exit(1);
}

fs.access(sourceFilename, fs.constants.F_OK, (err) => {
  if (err) {
    console.error(`Error reading source file: ${err}`);
    process.exit(1);
  }
  fs.access(targetFilename, fs.constants.F_OK, (err) => {
    if (!err) {
      console.error(`Error: target file '${targetFilename}' already exists`);
      process.exit(1);
    }
    fs.copyFile(sourceFilename, targetFilename, (err) => {
      if (err) {
        console.error(`Error writing to target file: ${err}`);
        process.exit(1);
      }
      console.log(`Contents of ${sourceFilename} written to ${targetFilename}`);
    });
  });
});
