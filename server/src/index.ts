import mongoose from "mongoose";
import { app } from "./app/app";

const main = async () => {
  await mongoose.connect(`mongodb://root:example@127.0.0.1:27017`);

  app.listen(5000, () => console.log("server listen on port 5000"));
};
main();
