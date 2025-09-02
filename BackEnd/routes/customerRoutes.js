import express from "express";
import Customer from "../models/Customer.js";
import Collection from "../models/Collection.js";

const router = express.Router();

// 🔹 Helper: generate unique userId (starts from 1000)
async function generateUserId() {
  const lastCustomer = await Customer.findOne().sort({ userId: -1 });
  return lastCustomer ? Number(lastCustomer.userId) + 1 : 1000;
}

// ➡️ Add Customer
router.post("/", async (req, res) => {
  try {
    const {
      name,
      phone,
      address = "",
      email = "",
      amount,
      interestPerMonth,
      duration,
    } = req.body;

    if (!name || !phone || !amount || !interestPerMonth || !duration) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const amt = Number(amount);
    const rate = Number(interestPerMonth);
    const months = Number(duration);

    if (isNaN(amt) || isNaN(rate) || isNaN(months)) {
      return res
        .status(400)
        .json({ error: "Amount, Interest, Duration must be numbers" });
    }

    const userId = await generateUserId();

    // 🔹 Calculate financials (Simple Interest)
    const totalInterest = (amt * rate * months) / 100;
    const totalAmount = amt + totalInterest;
    const emi = totalAmount / months;

    const newCustomer = new Customer({
      userId,
      name,
      phone,
      address,
      email,
      amount: amt,
      interestPerMonth: rate,
      duration: months,
      totalInterest,
      totalAmount,
      emi,
    });

    const savedCustomer = await newCustomer.save();
    res.status(201).json(savedCustomer);
  } catch (err) {
    console.error("Error adding customer:", err);
    res.status(500).json({ error: err.message });
  }
});

// ➡️ Get All Customers (with recalculated balance)
router.get("/", async (req, res) => {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 });

    // 🔹 Recalculate balance for each customer
    const result = await Promise.all(
      customers.map(async (cust) => {
        const collections = await Collection.find({ customerId: cust._id });
        const collected = collections.reduce(
          (sum, c) => sum + Number(c.amount),
          0
        );
        return {
          ...cust.toObject(),
          collected,
          balanceAmount: cust.totalAmount - collected,
        };
      })
    );

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ➡️ Get Single Customer + transactions
router.get("/:id", async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).json({ error: "Customer not found" });

    const collections = await Collection.find({ customerId: req.params.id }).sort({
      createdAt: -1,
    });

    const collected = collections.reduce((sum, c) => sum + Number(c.amount), 0);
    const balanceAmount = customer.totalAmount - collected;

    res.json({
      ...customer.toObject(),
      collected,
      balanceAmount,
      transactions: collections,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ➡️ Update Customer
router.put("/:id", async (req, res) => {
  try {
    const updated = await Customer.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: "Customer not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ➡️ Delete Customer
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Customer.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Customer not found" });

    // Also remove collections tied to this customer
    await Collection.deleteMany({ customerId: req.params.id });

    res.json({ message: "Customer deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
