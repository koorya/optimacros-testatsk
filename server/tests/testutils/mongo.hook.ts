import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

export const useMongoMemoryServer = <T>(fillDB?: () => Promise<T>) => {
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
        const res = await collection.deleteMany({});
      } catch (err) {
        console.log("collection drop error", collection.collectionName);
      }
    }
  };
  let data: T;
  beforeAll(async () => await connect());
  beforeEach(async () => {
    await clearDatabase();
    if (fillDB) data = await fillDB();
  });
  afterAll(async () => await closeDatabase());
  return () => data;
};
