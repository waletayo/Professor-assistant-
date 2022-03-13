const mongoose = require("mongoose");
const softDeletePlugin = require("../../config/mongodb/plugins/soft-delete");
const {
  hashPasswordPlugin,
  changePasswordPlugin,
  comparePasswordPlugin,
} = require("../../config/mongodb/plugins/password");

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    student_one_name: { type: String },
    student_two_name: { type: String },
    student_one_file: { type: String },
    student_two_file: { type: String },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
    versionKey: false,
  }
);
softDeletePlugin(UserSchema);
hashPasswordPlugin(UserSchema);
changePasswordPlugin(UserSchema);
comparePasswordPlugin(UserSchema);
const UserModel = mongoose.model("Users", UserSchema);

module.exports = UserModel;
