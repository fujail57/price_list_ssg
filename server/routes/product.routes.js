import { Router } from "express";
import {
  create_product,
  get_products,
} from "../Controller/product_controller.js";
const router = Router();

router.get("/", get_products);
router.post("/", create_product);

export default router;
