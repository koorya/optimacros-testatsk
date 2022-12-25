import mongoose from "mongoose";
import { app } from "./app/app";

const main = async () => {
  const mongoHost = process.env.MONGO_HOST
    ? process.env.MONGO_HOST
    : "127.0.0.1";
  await mongoose.connect(`mongodb://root:example@${mongoHost}:27017`);

  app.listen(5000, () => console.log("server listen on port 5000"));
};
main();
