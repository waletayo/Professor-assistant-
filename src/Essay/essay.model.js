const mongoose = require("mongoose");
const softDeletePlugin = require("../../config/mongodb/plugins/soft-delete");

const { Schema } = mongoose;

const EssaySchema = new Schema(
  {
    student_one_name: { type: String },
    student_two_name: { type: String },
    student_one_file: { type: String },
    student_two_file: { type: String },
    user_id: { type: Schema.Types.ObjectId, ref: "user" },
    matchResult: { type: String },
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
softDeletePlugin(EssaySchema);
const EssayModel = mongoose.model("Essay", EssaySchema);

module.exports = EssayModel;
