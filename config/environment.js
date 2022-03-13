const environmentConfig = () => {
  let envConfig = {};

  switch (process.env.NODE_ENV) {
    case "staging":
      envConfig = {};
      break;

    default:
      envConfig = {
        mongoDB:
          process.env.MONGODB_URL_DEV || "mongodb+srv://waletayo:walex3913@momoney.lsjon.mongodb.net/momoney",
        port: process.env.PORT,
        jwtSecret: process.env.JWT_SECRET || "jwt",
      };
      break;
  }

  return envConfig;
};

module.exports = environmentConfig;
