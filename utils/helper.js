const fs = require("fs");

const readFile = (path) => {
  const buffer = fs.readFileSync(`${path}`);
  const fileContent = buffer.toString();
  return fileContent;
};

const checkFileExtension = (file) => {
  return file.split(".").pop();
};

module.export = { checkFileExtension, readFile };
