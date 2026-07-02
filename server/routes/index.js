import { Router } from "express";
const router = Router();

import category_routes from "./category.routes.js";
import product_routes from "./product.routes.js";

router.use("/category", category_routes);
router.use("/product", product_routes);

export default router;
