import mongoose, { Connection, ConnectOptions } from "mongoose";
import logger from "./Logger";

class MongoConnection {
  private static instance: MongoConnection;
  private connection: Connection;

  public constructor() {
    // Actual database URI
    const databaseUrl = process.env.MONGODB_URI;

    // If no database URI exits, log error and close the application
    if (!databaseUrl) {
      logger.error(
        "No mongo connection string. Set databaseUrl environment variable."
      );
      process.exit(1);
    }

    // Connect to MongoDB using Mongoose
    mongoose
      .connect(databaseUrl)
      .then(async () => {
        console.log("Connected to MongoDB");
      })
      .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
        throw err;
      });

    // Set the instance to this newly created instance
    MongoConnection.instance = this;
    this.connection = mongoose.connection;
  }

  // Getter method to access the Mongoose connection
  public static getInstance(): Connection {
    if (!MongoConnection.instance) {
      new MongoConnection();
    }

    // Return the Mongoose connection directly
    return MongoConnection.instance.connection;
  }

  // Method to check if the database is connected
  public async isConnected(): Promise<boolean> {
    const connection = MongoConnection.getInstance();
    return connection.readyState === 1; // 1 means connected
  }

  // Method to check database stats
  public async getServerStatus(): Promise<mongoose.mongo.BSON.Document> {
    const connection = MongoConnection.getInstance();

    if (connection.readyState !== 1) {
      return null;
    }

    const db = connection.db;
    const admin = db.admin();

    // Fetch server status to get CPU usage information
    const serverStatus = await admin.serverStatus();

    return serverStatus;
  }
}

// Create a Singleton instance of the MongoConnection class
const mongoConnectionInstance = new MongoConnection();

// Export the Mongoose connection to be used throughout the application
export default mongoConnectionInstance;
