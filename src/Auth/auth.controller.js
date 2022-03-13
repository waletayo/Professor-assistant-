const {
  findUserByParams,
  createUser,
  findUserByParamsWithPassword,
} = require("./auth.data.access");
const bcrypt = require("bcrypt");

const {
  OK,
  BAD_REQUEST,
  NOT_FOUND,
  CREATED,
  CONFLICT,
} = require("../../utils/status-code");
const adaptRequest = require("../../utils/adapt-request");
const logger = require("../../config/winston");
const vm = require("v-response");
const { createToken } = require("../../config/jwt");

exports.CreateAccount = async (req, res, next) => {
  const httpRequest = adaptRequest(req);
  const { body } = httpRequest;
  const checkEmail = await findUserByParams({ email: body?.email });
  if (checkEmail) {
    return res
      .status(CONFLICT)
      .json(vm.ApiResponse(false, CONFLICT, "Email Already exist"));
  }
  const createNewUser = await createUser(body);
  if (!createNewUser) {
    return res
      .status(BAD_REQUEST)
      .json(vm.ApiResponse(false, BAD_REQUEST, "Oops! an error occur"));
  }
  const token = createToken(createNewUser);
  return res.status(OK).json(
    vm.ApiResponse(true, CREATED, "Success", {
      user: createNewUser,
      token: token,
    })
  );
};

exports.login = async (req, res) => {
  const httpRequest = adaptRequest(req);
  const {
    body: { password, email },
  } = httpRequest;
  const checkEmail = await findUserByParamsWithPassword({ email });
  if (!checkEmail) {
    return res
      .status(CONFLICT)
      .json(vm.ApiResponse(false, CONFLICT, "Incorrect email or password"));
  }
  const comparePassword = await bcrypt.compare(password, checkEmail?.password);
  if (!comparePassword) {
    return res
      .status(BAD_REQUEST)
      .json(vm.ApiResponse(false, BAD_REQUEST, "Incorrect email or password"));
  }
  const token = createToken(checkEmail);
  return res.status(OK).json(
    vm.ApiResponse(true, CREATED, "Success", {
      user: checkEmail,
      token: token,
    })
  );
};
