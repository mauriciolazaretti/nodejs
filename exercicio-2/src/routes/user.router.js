import {Router} from "express";
import { userController } from "./../app/controllers/user/create/index.js";
import { deleteUserController} from "./../app/controllers/user/delete/index.js";
import { getUserController} from "./../app/controllers/user/get/index.js";
const router = Router();
router.get('/users',getUserController.execute.bind(getUserController) );
router.post('/user',userController.execute.bind(userController) );
router.delete("/user", deleteUserController.execute.bind(deleteUserController));
export default router;
