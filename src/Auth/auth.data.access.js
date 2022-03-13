const UserModel = require("./auth.model");

const createUser = async (user) => {
  const newUser = new UserModel({ ...user });
  const savedUser = newUser.save();
  return savedUser;
};
const getUsers = async (params) => {
  const { page, limit } = params;

  const users = await UserModel.aggregate([
    {
      $facet: {
        data: [
          { $match: {} },
          {
            $project: {
              password: 0,
            },
          },
          { $skip: page * limit },
          { $limit: limit },
        ],
        total: [{ $count: "total" }],
      },
    },
  ]);

  return users;
};

const findUserByParams = async (params = {}) => {
  const user = await UserModel.findOne({
    ...params,
    deleted: { $ne: true },
  })
    .select("-password")
    .lean()
    .exec();

  return user;
};
const findUserByParamsWithPassword = async (params = {}) => {
  const user = await UserModel.findOne({
    ...params,
    deleted: { $ne: true },
  })
    .lean()
    .exec();

  return user;
};


module.exports = { findUserByParams, getUsers, createUser,findUserByParamsWithPassword };
