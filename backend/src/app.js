import express from "express";
import cors from "cors";
import dotenv from "dotenv";



import authRoutes from "./routes/auth.routes.js";
import notesRoutes from "./routes/notes.routes.js";
import errorHandler from "./middleware/error.middleware.js";

import limiter from "./middleware/rateLimit.middleware.js";

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_URL
]

app.use(
  cors({
    origin: function (origin, callback) {

      if (!origin) return callback(null, true)

      if (allowedOrigins.includes(origin)) {
        return callback(null, true)
      }

      return callback(new Error("Not allowed by CORS"))
    },
    credentials: true
  })
)
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
