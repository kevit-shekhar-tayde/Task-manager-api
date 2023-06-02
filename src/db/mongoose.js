const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config/config.env" });

mongoose.connect(process.env.MONGODB_CONNECTION, {
  useNewUrlParser: true,
});
