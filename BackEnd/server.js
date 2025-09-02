import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import customerRoutes from "./routes/customerRoutes.js";
import agentRoutes from "./routes/agentRoutes.js";
import collectionRoutes from "./routes/collectionRoutes.js";

dotenv.config(); // ✅ Load env variables

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// Routes
app.use("/api/customers", customerRoutes);
app.use("/api/agents", agentRoutes);
app.use("/api/collections", collectionRoutes);

// Root test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
