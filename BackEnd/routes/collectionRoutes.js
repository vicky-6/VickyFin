import express from "express";
import Collection from "../models/Collection.js";
import Customer from "../models/Customer.js";

const router = express.Router();

// ➡️ Add new collection & update customer balance
router.post("/", async (req, res) => {
  try {
    const { customerId, amount, paymentType } = req.body;

    if (!customerId || !amount || !paymentType) {
      return res.status(400).json({ error: "customerId, amount, and paymentType are required" });
    }

    // Find customer
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    // Save collection (createdAt will default to now)
    const collection = new Collection({
      customerId,
      amount,
      paymentType,
      createdAt: new Date()
    });
    await collection.save();

    // 🔹 Recalculate balance
    const totalAmount = customer.amount + (customer.emi * customer.duration);
    const collections = await Collection.find({ customerId });
    const collected = collections.reduce((sum, c) => sum + c.amount, 0);
    customer.balanceAmount = totalAmount - collected;
    customer.lastTransaction = amount;

    await customer.save();

    res.status(201).json({
      message: "Collection added successfully",
      collection,
      updatedCustomer: customer
    });
  } catch (err) {
    console.error("Error saving collection:", err);
    res.status(500).json({ error: err.message });
  }
});

// ➡️ Get all collections with customer basic details
router.get("/", async (req, res) => {
  try {
    const collections = await Collection.find()
      .populate("customerId", "userId name phone")
      .sort({ createdAt: -1 });

    res.json(collections);
  } catch (err) {
    console.error("Error fetching collections:", err);
    res.status(500).json({ error: err.message });
  }
});

// ➡️ Get collections for single customer
router.get("/customer/:id", async (req, res) => {
  try {
    const collections = await Collection.find({ customerId: req.params.id })
      .sort({ createdAt: -1 });

    res.json(collections);
  } catch (err) {
    console.error("Error fetching customer collections:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
