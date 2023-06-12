import cors from "cors";
import express from "express";

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.listen(3000);
console.log("Express server listening to http://localhost:3000");
