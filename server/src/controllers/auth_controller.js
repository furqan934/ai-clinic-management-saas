const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user_model");

const generate_token = (id, role) => {
  return jwt.sign(
    { id, role },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

const register_user = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
    } = req.body;

    const existing_user = await User.findOne({
      email,
    });

    if (existing_user) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashed_password =
      await bcrypt.hash(password, 10);

    const new_user = await User.create({
      name,
      email,
      password: hashed_password,
      role,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token: generate_token(
        new_user._id,
        new_user.role
      ),
      user: {
        id: new_user._id,
        name: new_user.name,
        email: new_user.email,
        role: new_user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const login_user = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const is_match = await bcrypt.compare(
      password,
      user.password
    );

    if (!is_match) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    res.status(200).json({
      success: true,
      message: "Login successful",
      token: generate_token(
        user._id,
        user.role
      ),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const get_current_user = async (
  req,
  res
) => {
  try {
    const user = await User.findById(
      req.user.id
    ).select("-password");

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  register_user,
  login_user,
  get_current_user,
};