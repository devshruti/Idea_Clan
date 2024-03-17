const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../model/userModel");
const { blacklistModel } = require("../model/blacklistModel");
const userRouter = express.Router();

// User registration endpoint
userRouter.post("/register", async (req, res) => {
  try {
    let { username, email, password } = req.body;

    // Check if required fields are provided
    if (!email || !username || !password) {
      
      return res
        .status(400)
        .json({ message: "Please provide all the fields", error: err.message });
    }
    // Check for duplicate email
    const existingEmail = await UserModel.findOne({ email });

    if (existingEmail) {
      // Log duplicate email or username
  
      return res
        .status(409)
        .json({ message: "This Email or Username is already taken." });
    } else {
      // Hash password and save user
      const hash = await bcrypt.hash(password, 5);
      const user = new UserModel({ username, email, password: hash });

      await user.save();

      // Log successful registration
      res.json({ message: "User has been registered" });
    }
  } catch (err) {
    // Log registration failure
    
    console.error(err);
    res
      .status(500)
      .json({ message: "User not registered", error: err.message });
  }
});

// User login endpoint
userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      // Log invalid credentials
    
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    // Compare passwords
    const result = await bcrypt.compare(password, user.password);

    if (result) {
      // Generate tokens and set cookies
      const accessToken = jwt.sign(
        { userId: user._id },
        process.env.secretkey,
        {
          expiresIn: "7d",
        }
      );

      const refreshToken = jwt.sign(
        { userId: user._id },
        process.env.refreshSecretkey,
        {
          expiresIn: "30d",
        }
      );

      const uid = user._id;
      res.cookie("access_token", accessToken, {
        maxAge: 900000,
        httpOnly: true,
      });
      res.cookie("refresh_token", refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      // Log successful login
      res.json({
        message: "Login Successfully",
        accessToken,
        refreshToken,
        uid,
      });
    } else {
      // Log invalid credentials
      
      res.status(401).json({ message: "Invalid Credentials" });
    }
  } catch (err) {
    // Log login failure
    console.error(err);
    res
      .status(500)
      .json({ message: "Something Went Wrong", error: err.message });
  }
});

// Get a new access token using a refresh token
userRouter.get("/getnewtoken", (req, res) => {
  try {
    const refresh_token = req.headers.authorization;
    if (!refresh_token) {
      
      return res.status(401).json({ message: "Login Again" });
    }

    // Verify the refresh token and generate a new access token
    jwt.verify(refresh_token, process.env.refreshSecretkey, (err, decoded) => {
      if (err) {
        // Log invalid or expired refresh token
       
        return res.status(401).json({
          message: "Invalid or expired refresh token. Please Login First",
        });
      } else {
        const newAccessToken = jwt.sign(
          { userId: decoded.userId },
          process.env.secretkey,
          {
            expiresIn: "1h",
          }
        );

        // Log successful token refresh
        return res
          .status(200)
          .json({ message: "Login Successfully", token: newAccessToken });
      }
    });
  } catch (err) {
    // Log token refresh failure
    console.error(err);
    res.status(401).json({
      message: "Invalid or expired refresh token. Please Login First",
    });
  }
});

 
// User logout endpoint
userRouter.post("/logout", async (req, res) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      // Log missing token for logout
      return res.status(400).json({ message: "Token not provided" });
    }

    // Check if the token is already blacklisted
    const existingToken = await blacklistModel.findOne({ token });

    if (existingToken) {
      // Log already blacklisted token
  
      return res.status(400).json({ message: "Token already blacklisted" });
    }

    // Blacklist the token
    const blacklistedToken = new blacklistModel({ token });
    await blacklistedToken.save();

    // Log successful logout
   res.status(200).send("Logged out successfully");
  } catch (err) {
    // Log logout failure
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = { userRouter };
