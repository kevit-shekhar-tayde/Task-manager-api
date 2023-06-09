const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config/test.env" });

mongoose.connect(process.env.MONGODB_CONNECTION, {
  useNewUrlParser: true,
});
