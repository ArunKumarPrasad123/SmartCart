import { genToken, genToken1 } from "../config/token.js";
import User from "../model/userModel.js";
import bcrypt from 'bcryptjs';
import validator from "validator";

// ------------------- REGISTRATION -------------------
export const registration = async (req, res) => {
  try {
     let { name, email, password } = req.body;

    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Enter a valid email" });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: "Enter a stronger password" });
    }

    let hashedPassword = await bcrypt.hash(password, 10);

    let user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    let token = genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // Set to true in production with HTTPS
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    return res.status(201).json({
      message: "Registration successful",
      user
    });

  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({ message: `Register error: ${error.message}` });
  }
};



// ------------------- LOGIN -------------------
export const login = async (req, res) => {
  try {
    let { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

     let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    let token = genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.status(200).json(user);

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: `Login error: ${error.message}` });
  }
};



// ------------------- LOGOUT -------------------
export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ message: `Logout error: ${error.message}` });
  }
}


export const googleLogin = async (req, res) => {
  try {
    const { name, email } = req.body;

    let user = await User.findOne({ email });

    // If user doesn't exist, create one
    if (!user) {
      user = await User.create({
        name,
        email
      });
    }

    let token = genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // set true if using https
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.status(200).json({
      message: "Google login successful",
      user,
      token
    });

  } catch (error) {
    console.error("googleLogin error:", error);
    return res.status(500).json({ message: `Google login error: ${error.message}` });
  }
}

export const adminLogin = async (req,res) => {
  try {
      let {email , password } = req.body
      if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
       
    let token = await genToken1(email);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // set true if using https
      sameSite: "strict",
      maxAge: 1 * 24 * 60 * 60 * 1000
    });

    return res.status(200).json(token);
 
      }
      return res.status(400).json({message:"Invalid creadintials"})

  } catch (error) {
     console.error("AdminLogin error");
    return res.status(500).json({ message: `Admin login error: ${error.message}` });
  }
}

