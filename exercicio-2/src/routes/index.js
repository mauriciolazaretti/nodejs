import {Router} from "express";
import routerUser from "../routes/user.router.js";
const router = Router();
router.use(routerUser);
export  {router};