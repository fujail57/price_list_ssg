import { Router } from "express";
const router = Router();
import {
  create_post,
  delete_post,
  get_post,
  get_post_filter,
  get_posts,
  pagination_post,
  search_post,
  update_post,
} from "../../Controller/test/PostController.js";

// Advance concept
router.get("/filter", get_post_filter);
router.get("/search", search_post); // review it again, not working
router.get("/pagination", pagination_post);

// basic routes
router.get("/", get_posts);
router.post("/", create_post);
router.get("/:id", get_post);
router.put("/:id", update_post);
router.delete("/:id", delete_post);

export default router;
