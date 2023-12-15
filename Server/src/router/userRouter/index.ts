import { user } from "../../controller/userController";
import express from "express";

const router = express.Router();

router.get("/get-user-detail/:id", user.getUserDetail);
router.patch("/patch-user/:id", user.patchUser);
router.delete("/delete-user/:id", user.deleteUser);
router.put("/update-user/:id", user.updateUser);
router.post("/create-user", user.createUser);
router.get("/user-list", user.getUserList);

export default router;
