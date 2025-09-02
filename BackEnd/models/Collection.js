import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
  amount: { type: Number, required: true },
  paymentType: { type: String, enum: ["Cash", "Online"], required: true }, // 👈 New
}, { timestamps: true }); // 👈 auto adds createdAt + updatedAt

export default mongoose.model("Collection", collectionSchema);
