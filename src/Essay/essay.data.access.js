const EssayModel = require("./essay.model");

const createEssay = async (user) => {
  const newUser = new EssayModel({ ...user });
  const savedUser = newUser.save();
  return savedUser;
};
const getEssay = async (params) => {
  const { page, limit } = params;

  const essay = await EssayModel.aggregate([
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

  return essay;
};

const findEssayByParams = async (params = {}) => {
  const essay = await EssayModel.findOne({
    ...params,
    deleted: { $ne: true },
  })
    .lean()
    .exec();

  return essay;
};

const getUserEssay = async (params = {}) => {
  const essay = await EssayModel.find({ ...params, deleted: { $ne: true } })
    .populate("user_id")
    .lean()
    .exec();
  return essay;
};
module.exports = { findEssayByParams, getEssay, createEssay, getUserEssay };
