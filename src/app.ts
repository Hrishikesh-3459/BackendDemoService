import express from "express";
import mongoose from "mongoose";
import router from "./routes";
const app = express();
const port = 3000;

app.use(express.json());

const MONGO_URL = "mongodb: //127.0.0.1:27017";
mongoose
  .connect(MONGO_URL, {
    dbName: "node-typescript-app",
  })
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => console.log(error));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/dummy", router);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
