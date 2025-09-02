// routes/agentRoutes.js
import express from "express";
import Agent from "../models/Agents.js";

const router = express.Router();

// Get all agents
router.get("/", async (req, res) => {
  try {
    const agents = await Agent.find();
    res.json(agents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add new agent
router.post("/", async (req, res) => {
  try {
    const agent = new Agent(req.body);
    await agent.save();
    res.status(201).json(agent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update agent
router.put("/:id", async (req, res) => {
  try {
    const agent = await Agent.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(agent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete agent
router.delete("/:id", async (req, res) => {
  try {
    await Agent.findByIdAndDelete(req.params.id);
    res.json({ message: "Agent deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
