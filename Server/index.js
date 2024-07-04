import express from "express";
import cors from 'cors';
import "dotenv/config";
import publicRouter from "./routes/public.js";
import privateRouter from "./routes/private.js";
import { databaseInit } from "./database/index.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// database connection and execute DDL queries to create tables
databaseInit();

app.use("/", publicRouter);
app.use("/auth", privateRouter);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
