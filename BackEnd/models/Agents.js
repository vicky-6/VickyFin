// models/Agent.js
import mongoose from "mongoose";

const agentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String, required: true }
});

// This automatically creates a MongoDB collection called **agents**
const Agent = mongoose.model("Agent", agentSchema);

export default Agent;
