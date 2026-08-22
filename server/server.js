const dotenv = require("dotenv");
dotenv.config();

console.log("JWT_SECRET =", process.env.JWT_SECRET);

const app = require("./app");
const connectDB = require("./config/db");

console.log('GROQ_API_KEY:', !!process.env.GROQ_API_KEY);

// Connect Database
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("=================================");
  console.log("🚀 CareerPilot AI Server Running");
  console.log(`🌐 http://localhost:${PORT}`);
  console.log("=================================");
});