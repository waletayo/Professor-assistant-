const {
  createEssay,
  findEssayByParams,
  getUserEssay,
} = require("./essay.data.access");
const adaptRequest = require("../../utils/adapt-request");
const logger = require("../../config/winston");
const {
  OK,
  BAD_REQUEST,
  NOT_FOUND,
  CREATED,
  CONFLICT,
} = require("../../utils/status-code");
const vm = require("v-response");
const {
  checkFileExtension,
  readFile,
  compareEssay,
} = require("../../utils/helper");

exports.compareStudentEssay = async (req, res, next) => {
  try {
    const httpRequest = adaptRequest(req);
    const { body, files } = httpRequest;
    const studentOneFile = files?.student_one_file[0];
    const studentTwoFile = files?.student_two_file[0];
    const checkFileType = checkFileExtension(studentOneFile, studentTwoFile);
    if (!checkFileType) {
      return res
        .status(BAD_REQUEST)
        .json(
          vm.ApiResponse(
            false,
            BAD_REQUEST,
            "Invalid file type,please select a txt file"
          )
        );
    }
    const [essayOne, essayTwo] = await Promise.all([
      readFile(`${studentOneFile.path}`),
      readFile(`${studentTwoFile.path}`),
    ]);
    const result = await compareEssay(
      essayOne.toLowerCase(),
      essayTwo.toLowerCase()
    );
    const payload = Object.assign(body, {
      student_one_file: `${studentOneFile.path}`,
      student_two_file: `${studentTwoFile.path}`,
      matchResult: result,
      user_id: req.userId,
    });
    return res.status(OK).json(
      vm.ApiResponse(true, OK, "success", {
        matchResult: result,
        studentInfo: await createEssay(payload),
      })
    );
  } catch (e) {
    logger.log({ level: "error", message: e.message });
    return next(e);
  }
};


exports.reTryEssayComparison = async (req, res, next) => {
  try {
    const httpRequest = adaptRequest(req);
    const {
      queryParams: { essayId },
    } = httpRequest;
    if (!essayId) {
      return res
        .status(BAD_REQUEST)
        .json(vm.ApiResponse(false, BAD_REQUEST, "Incomplete payload"));
    }
    const findEssay = await findEssayByParams({ _id: essayId });
    if (!findEssay) {
      return res
        .status(NOT_FOUND)
        .json(vm.ApiResponse(false, NOT_FOUND, "Invalid Id provided"));
    }
    const [essayOne, essayTwo] = await Promise.all([
      readFile(`${findEssay.student_one_file}`),
      readFile(`${findEssay.student_two_file}`),
    ]);
    const result = await compareEssay(
      essayOne.toLowerCase(),
      essayTwo.toLowerCase()
    );
    return res.status(OK).json(
      vm.ApiResponse(true, OK, "success", {
        matchResult: result,
        studentInfo: findEssay,
      })
    );
  } catch (e) {
    logger.log({ level: "error", message: e.message });
    return next(e);
  }
};

exports.findOneEssay = async (req, res, next) => {
  try {
    const httpRequest = adaptRequest(req);
    const {
      queryParams: { essayId },
    } = httpRequest;
    if (!essayId) {
      return res
        .status(BAD_REQUEST)
        .json(vm.ApiResponse(false, BAD_REQUEST, "Incomplete payload"));
    }
    console.log("essayId", essayId);
    const findEssay = await findEssayByParams({ _id: essayId });
    if (!findEssay) {
      return res
        .status(NOT_FOUND)
        .json(vm.ApiResponse(false, NOT_FOUND, "Invalid Id provided"));
    }
    return res.status(OK).json(
      vm.ApiResponse(true, OK, "success", {
        studentInfo: findEssay,
      })
    );
  } catch (e) {
    logger.log({ level: "error", message: e.message });
    return next(e);
  }
};
exports.History = async (req, res, next) => {
  const history = await getUserEssay({ user_id: req.userId });
  if (!history) {
    return res
      .status(NOT_FOUND)
      .json(vm.ApiResponse(false, NOT_FOUND, "0 essay found"));
  }
  return res.status(OK).json(vm.ApiResponse(true, OK, "Success", history));
};
