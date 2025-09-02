import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    userId: { type: Number, unique: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String },
    email: { type: String },

    amount: { type: Number, required: true },
    interestPerMonth: { type: Number, required: true },  
    duration: { type: Number, required: true },
    totalInterest: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    emi: { type: Number, required: true },

    balanceAmount: { type: Number, default: 0 },
    lastTransaction: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Customer", customerSchema);
