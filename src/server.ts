import mongoose from "mongoose";
import app from "./app";
import config from "./config/index";

async function DBconnection() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log("🛢 Database Connected Successfully");
    app.listen(config.port, () => {
      console.log(`Lit-Books Server listening on port ${config.port}`);
    });
  } catch (error) {
    console.log("Failed To Connect With Database", error);
  }
}

DBconnection();
