import Category from "../models/Category.js";


// ➕ Create multiple categories
export const createCategory = async (req, res) => {
  try {
    const data = req.body; // இது array ஆக வரும்
    console.log("👉 Incoming body:", data);

    if (!Array.isArray(data)) {
      return res.status(400).json({ message: "Array of categories required" });
    }

    const categories = await Category.insertMany(data);
    res.status(201).json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 📥 Get All Categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get category by ID
export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: "Category not found" });
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};