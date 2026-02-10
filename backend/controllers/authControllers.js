import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/* REGISTER USER */
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Registration failed" });
  }
};

/* LOGIN USER / ADMIN */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔑 ADMIN LOGIN (password from .env)
    if (password === process.env.ADMIN_SECRET_PASSWORD) {
      const token = jwt.sign(
        { role: "admin", email },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      return res.json({
        token,
        role: "admin",
        msg: "Admin login successful",
      });
    }

    // 👤 USER LOGIN
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ msg: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: "user" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      role: "user",
      name: user.name,  
      msg: "User login successful",
    });
  } catch (err) {
    res.status(500).json({ msg: "Login failed" });
  }
};
