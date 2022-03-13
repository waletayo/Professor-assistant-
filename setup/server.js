const app = require("./app.js");
const PORT = process.env.PORT || 3000;

module.exports = app.listen(PORT, async () =>
  console.log(`Server is live at localhost:${PORT}`)
);
