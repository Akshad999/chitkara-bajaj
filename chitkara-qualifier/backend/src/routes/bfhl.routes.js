import { Router } from "express";
import { postBfhl } from "../controllers/bfhl.controller.js";

const router = Router();
router.post("/", postBfhl);

export default router;
