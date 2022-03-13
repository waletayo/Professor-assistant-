const User = require("./auth.model");

const adaptRequest = require("../../utils/adapt-request");
const logger = require("../../config/winston");
const { checkFileExtension } = require("../../utils/helper");

exports.compareStudentEssay = (req, res, next) => {
  const httpRequest = adaptRequest(req);
  const { body, files } = httpRequest;
  const selectedFile = Object.values(files);
//   console.log("files",selectedFile);
  for (let i = 0; i < selectedFile.length; i++) {
    console.log("files", selectedFile);
    const fileName = selectedFile[i].originalname;
    const fileType = checkFileExtension(fileName);
    console.log("fileType", fileType);

    if (fileType.toLowerCase() != "txt") {
      console.log("invalid file type");
    }
    console.log("nnooooo");
  }
  console.log("not");
};
