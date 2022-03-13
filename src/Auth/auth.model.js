const mongoose = require("mongoose");
const softDeletePlugin = require("../../config/mongodb/plugins/soft-delete");
const {
  hashPasswordPlugin,
  comparePasswordPlugin,
} = require("../../config/mongodb/plugins/password");

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    email: { type: String },
    password: { type: String },
    name: { type: String },
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
comparePasswordPlugin(UserSchema);

const UserModel = mongoose.model("user", UserSchema, "Users");

module.exports = UserModel;
