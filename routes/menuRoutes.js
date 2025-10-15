import express from "express";
import {
  createMenuItem,
  getMenuItems,
  getMenuItemById,
} from "../controllers/menuController.js";

const router = express.Router();

// Routes
router.post("/", createMenuItem); // Create
router.get("/", getMenuItems); // Get all
router.get("/:id", getMenuItemById); // Get one by ID

export default router;
