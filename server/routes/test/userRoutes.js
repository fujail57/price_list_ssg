import { Router } from "express";
import {
  createUser,
  delete_user,
  get_all_user,
  get_all_user_with_post,
  get_all_user_with_post_count,
  get_user_by_id,
  updateUser,
} from "../Controller/UserController.js";

const router = Router();

// get_all_user_with_post
router.get("/user_post", get_all_user_with_post);
router.get("/user-post-count", get_all_user_with_post_count)

router.post("/", createUser);
router.put("/:id", updateUser);
router.get("/", get_all_user);
router.get("/:id", get_user_by_id);
router.delete("/:id", delete_user);


export default router;
