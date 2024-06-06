const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const { MONGO_ATLAS, MONGODB_URI } = process.env;

const connect = () => {
  return mongoose.connect(MONGO_ATLAS);
};

module.exports = connect;
