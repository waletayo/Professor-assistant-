"use strict";
import mongoose from "mongoose";
import vm from "v-response";
import Q from "q";
const { mongoDB } = require("../config/environment")();

export default (config) => {
  mongoose.Promise = Q.Promise;
  mongoose.connection.on("disconnected", function () {
    vm.log("Mongoose connection to mongodb shell disconnected", "");
  });
  return mongoose
    .connect(`mongodb://127.0.0.1:27017/essay`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(
      () => {
        vm.log("Mongoose connected to mongo shell.", "");
      },
      (err) => {
        vm.log(`${err}: Mongoose could not connect to mongo shell!`, "");
      }
    );
};
