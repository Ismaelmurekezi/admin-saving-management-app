import express from "express";
import dotenv from "dotenv";
import { connectDatabase } from "./config/database.js";
import { specs, swaggerUi } from "./config/swagger.js";
import adminRoutes from "./routes/adminRoute.js";
import cors from "cors";


dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;

app.get("/", (request, response) => {
  response.status(200).send("Welcome to the Useve admin  Backend Application!");
});

app.use(cors());
app.use(express.json());

//swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/admin', adminRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});

// Database connection and server start
const startServer = async () => {
    try {
    await connectDatabase();
    app.listen(PORT, () => {
      console.log(`Client server running on port ${PORT}`);
      console.log(
        `Swagger docs available at http://localhost:${PORT}/api-docs`
      );
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();

export default app;
