import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import notesRoutes from "./routes/notes.routes.js";
import errorHandler from "./middleware/error.middleware.js";
import ApiError from "./utils/apiError.js";

import limiter from "./middleware/rateLimit.middleware.js";

const app = express();
const defaultOrigins = ["http://localhost:5173", "http://127.0.0.1:5173"];
const allowedOrigins = (
  process.env.CLIENT_URL ? process.env.CLIENT_URL.split(",") : defaultOrigins
)
  .map((origin) => origin.trim())
  .filter(Boolean);

const corsOptions = {
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new ApiError(403, "CORS origin not allowed"));
  },
  credentials: true
};

/* Global Middlewares */


app.use(cors(corsOptions));
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
