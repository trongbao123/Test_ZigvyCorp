import { post } from "../../controller/postController";
import express from "express";

const router = express.Router();

router.get("/get-post-detail/:id", post.getPostDetail);
router.patch("/patch-post/:id", post.patchPost);
router.delete("/delete-post/:id", post.deletePost);
router.put("/update-post/:id", post.updatePostList);
router.post("/create-post", post.createPostList);
router.get("/post-list", post.getPostList);

export default router;
