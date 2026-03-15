import { Router } from "express";
import { getCaterers, getCatererById, createCaterer } from "../controllers/caterer.controller.js";

const router = Router();

router.get("/", getCaterers);
router.get("/:id", getCatererById);
router.post("/", createCaterer);

export default router;
