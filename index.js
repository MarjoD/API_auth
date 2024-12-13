import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./router.js";

dotenv.config();

const app = express();

const port = process.env.APP_PORT;

//configuring CORS to allow requests from localhost
const corsOptions = {
  'Access-Control-Allow-Origin': 'http://localhost',
  optionsSuccessStatus: 200
}

//use CORS configuration
app.use(cors(corsOptions));
app.use(express.json());
app.use("/api", router);

app.listen(port, () => {
  console.log(`server is listenning on port http://localhost:${port}/api`);
});
