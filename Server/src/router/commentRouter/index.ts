import { commnet } from "../../controller/commentController";
import express from "express";

const router = express.Router();

router.get("/get-comment-detail/:id", commnet.getCommentDetail);
router.patch("/patch-comment/:id", commnet.patchComment);
router.delete("/delete-comment/:id", commnet.deleteComment);
router.put("/update-comment/:id", commnet.updateComment);
router.post("/create-comment", commnet.createComment);
router.get("/comment-list", commnet.getCommentList);

export default router;
