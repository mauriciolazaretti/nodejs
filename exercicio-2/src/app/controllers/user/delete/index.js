import { UserModel } from "../../../models/user.model.js";
import {UserService} from "../../../services/user.service.js";
import { DeleteUserController } from "./delete.user.controller.js";
const userService = new UserService(UserModel);
const deleteUserController = new DeleteUserController(userService);

export {deleteUserController};


