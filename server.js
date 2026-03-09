
//Entery  file of Serverimport {app} from "./app.js";
import express from "express";
// import { PORT } from "./constants.js";
import dotenv from "dotenv";
import { connectMongoDB } from "./src/config/db.js";
import appRoutes from "./src/appRoutes.js";
// import {app} from "./app.js"

dotenv.config({
    path:"./.env"
})

const app = express();
app.use(express.json());

await connectMongoDB();

app.use("/api", appRoutes);

 const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server is flying on port: ${PORT}`);
});