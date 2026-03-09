import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {

  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {

    try {

      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decoded.userId).select("-password");

      req.user = user;

      next();

    } catch (error) {

      res.status(401).json({ message: "Not authorized" });

    }

  } else {

    res.status(401).json({ message: "No token provided" });

  }
};

export default protect;