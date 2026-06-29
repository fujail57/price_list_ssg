import { Router } from "express";
const router = Router();

import {
  create_comment,
  delete_comment,
  get_comment,
  get_comments,
  update_comment,
} from "../../Controller/test/CommentController.js";

router.post("/", create_comment);
router.get("/", get_comments);
router.get("/:id", get_comment);
router.put("/:id", update_comment);
router.delete("/:id", delete_comment);


export default router;