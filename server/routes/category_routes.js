import { Router } from "express";
import {
  create_category,
  get_categories,
} from "../Controller/category_controller.js";

const router = Router();

router.post("/", create_category);
router.get("/", get_categories);

export default router;
