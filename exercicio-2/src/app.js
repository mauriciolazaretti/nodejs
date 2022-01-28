import express from "express";
import { errorHandling } from "./app/middlewares/error.js";
import { router } from "./routes/index.js";
const app = express();
app.use(express.json());
app.use(router);
app.use(errorHandling);
app.listen(3000, () => console.log("rodando"));