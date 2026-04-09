import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import notesRoutes from "./routes/notes.routes.js";
import errorHandler from "./middleware/error.middleware.js";
import ApiError from "./utils/apiError.js";

import limiter from "./middleware/rateLimit.middleware.js";

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    process.env.CLIENT_URL
  ],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(limiter);

/* Health Route */

app.get("/", (req, res) => {
  res.json({ message: "API running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);




app.use(errorHandler);

export default app;
