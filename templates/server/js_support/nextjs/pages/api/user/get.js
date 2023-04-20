import { CatchErrors } from "../middlewares/error";
import UserController from "../controller/user";

const userController = new UserController();

const getUsers = (req, res) => userController.getUser(req, res);
export default CatchErrors(getUsers);
