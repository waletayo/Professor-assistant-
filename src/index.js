"use strict";
import errorHandler from "../setup/error-handler";
import Q from "q";
import Auth from "../src/Auth/auth.route";

/**
 * The routes will add all the application defined routes
 * @param {express} app The app is an instance of an express application
 * @return {Promise<void>}
 **/

export default (app) => {
  app.use("/api/v1", Auth);
  app.use("/", (req, res, next) => {
    const appErrorw = { status: 200 };
    return next(appErrorw);
  });
  app.use(errorHandler);

  return Q.resolve(app);
};
