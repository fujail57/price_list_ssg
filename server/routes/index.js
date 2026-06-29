import { Router } from "express";
const router = Router();

import categoryRoutes from "./category_routes.js";

router.use("/api/category", categoryRoutes);

export default router;
