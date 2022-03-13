const fs = require("fs");
const stringSimilarity = require("string-similarity");

const readFile = async (path) => {
  console.log("path", path);
  const buffer = await fs.readFileSync(`${path}`);
  const fileContent = buffer.toString();
  return fileContent;
};

const checkFileExtension = (file) => {
  return file.split(".").pop();
};

const compareEssay = async (essayOneString, essayTwoString) => {
  const similarity = stringSimilarity.compareTwoStrings(
    `${essayOneString}`,
    `${essayTwoString}`
  );
  return similarity;
};

module.exports = { checkFileExtension, readFile, compareEssay };
