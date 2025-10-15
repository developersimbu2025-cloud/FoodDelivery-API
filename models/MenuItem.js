import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: false },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true }, // ✅ relation
    rating: { type: Number, default: 0 },
    preparationTime: { type: String },
    ingredients: { type: [String] },
    isVegetarian: { type: Boolean, default: false },
    isSpicy: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const MenuItem = mongoose.model("MenuItem", menuItemSchema);
export default MenuItem;
