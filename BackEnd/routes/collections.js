router.post("/", async (req, res) => {
  try {
    const { customerId, amount, date } = req.body;

    // Save collection
    const newCollection = new Collection({ customerId, amount, date });
    await newCollection.save();

    // Update customer balance + lastTransaction
    const customer = await Customer.findById(customerId);
    if (!customer) return res.status(404).json({ error: "Customer not found" });

    customer.balanceAmount = customer.balanceAmount - amount;
    customer.lastTransaction = amount;
    await customer.save();

    res.json({ message: "Collection saved and customer updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});