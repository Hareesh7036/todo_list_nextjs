import mongoose from "mongoose";

const db_name = process.env.DB_NAME;

global.mongoose = {
  conn: null,
  promise: null,
};

const connectDB = async () => {
  if (global.mongoose && global.mongoose.conn) {
    console.log("already connected");
    return global.mongoose.conn;
  } else {
    const connection_string = process.env.MONGO_URL;

    const promise = mongoose.connect(connection_string, { autoIndex: true });

    global.mongoose = {
      conn: await promise,
      promise,
    };

    console.log("connected!!");

    return await promise;
  }
};

export default connectDB;
