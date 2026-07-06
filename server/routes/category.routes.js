import { Router } from "express";
import {
  create_category,
  delete_category,
  get_categories,
  get_category,
  update_category,
} from "../Controller/category_controller.js";

const router = Router();

router.post("/", create_category);
router.get("/", get_categories);
router.get("/:id", get_category);
router.put("/:id", update_category);
router.delete("/:id", delete_category);

export default router;
