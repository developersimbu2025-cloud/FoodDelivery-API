import MenuItem from "../models/MenuItem.js";

// ➕ Create MenuItem
export const createMenuItem = async (req, res) => {
  try {
    const menuItem = await MenuItem.create(req.body);
    res.status(201).json(menuItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 📥 Get All MenuItems (with Category details)
export const getMenuItems = async (req, res) => {
  try {
    const menuItems = await MenuItem.find().populate("category");
    console.log("MenuItems:", menuItems);
    res.json(menuItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMenuItemsId = async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);
    res.json(menuItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//📥 Get MenuItem by ID (with Category details)
export const getMenuItemById = async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id).populate("category");
    if (!menuItem)
      return res.status(404).json({ message: "Menu item not found" });
    res.json(menuItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
