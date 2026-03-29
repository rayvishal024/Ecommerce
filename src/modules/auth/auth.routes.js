import { Router } from "express";
import * as controller from "./auth.controller.js";
import RegisterDto from "./dto/register.dto.js";
import validate from "../../common/middleware/validate.middleware.js";
import LoginDto from "./dto/login.dto.js";
import { isloggedin } from "./auth.middleware.js";

const router = Router();

router.post("/register", validate(RegisterDto), controller.register);
router.post("/login", validate(LoginDto), controller.login);


router.get("/logout", isloggedin, controller.logout);
router.get("/verify-Email/:token", controller.verifyEmail);
router.get("/profile", isloggedin, controller.getMe);
router.get("/refresh", controller.refresh);

export default router;