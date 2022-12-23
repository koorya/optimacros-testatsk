import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

export const useMongoMemoryServer = () => {
  let mongod: MongoMemoryServer;

  const connect = async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoose.set("strictQuery", false);
    mongoose.set("debug", false);
    await mongoose.connect(uri);
  };

  const closeDatabase = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongod.stop();
  };

  const clearDatabase = async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      const collection = collections[key];
      try {
        await collection.deleteMany({ _id: /.*/ });
      } catch (err) {
        console.log("collection drop error", collection.collectionName);
      }
    }
  };

  beforeAll(async () => await connect());
  beforeEach(async () => await clearDatabase());
  afterAll(async () => await closeDatabase());
};
