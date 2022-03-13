require('dotenv').config();
const app = require("./app.js");
const { port } = require("../config/environment")();

const PORT = port || 3000;

module.exports = app.listen(PORT, async () =>
  console.log(`Server is live at localhost:${PORT}`)
);
