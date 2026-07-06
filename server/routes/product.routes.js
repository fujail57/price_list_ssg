import { Router } from "express";
import {
  create_product,
  delete_product,
  get_product,
  get_products,
  update_product,
} from "../Controller/product_controller.js";
const router = Router();

router.get("/", get_products);
router.get("/:id", get_product)
router.post("/", create_product);
router.patch("/:id", update_product)
router.delete("/:id", delete_product)

export default router;
