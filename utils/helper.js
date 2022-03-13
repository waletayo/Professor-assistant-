const fs = require("fs");
const stringSimilarity = require("string-similarity");

const readFile = async (path) => {
  const buffer = await fs.readFileSync(`${path}`);
  const fileContent = buffer.toString();
  return fileContent;
};

const checkFileExtension = (
  { originalname: studentOneFile },
  { originalname: studentTwoFile }
) => {
  const originalName = [];
  originalName.push(studentOneFile, studentTwoFile);
  return originalName.every(txtChecker);
};

const txtChecker = (file) => {
  const type = file.split(".").pop().toLowerCase() === "txt";
  return type;
};
const compareEssay = async (essayOneString, essayTwoString) => {
  const similarity = stringSimilarity.compareTwoStrings(
    `${essayOneString}`,
    `${essayTwoString}`
  );
  return similarity;
};

module.exports = { checkFileExtension, readFile, compareEssay };
