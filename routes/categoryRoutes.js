import express from "express";
import {
  createCategory,
  getCategories,
  getCategoryById
  
} from "../controllers/categoryController.js";

const router = express.Router();

router.post("/", createCategory); // ➕ Create
router.get("/", getCategories); // 📥 All
router.get("/:id", getCategoryById);

export default router;
