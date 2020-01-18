const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../../models/user");

router.post("/signup", async (req, res) => {
  try {
    const existedUser = await User.find({ email: req.body.email });

    if (existedUser.length !== 0) {
      return res.status(422).json({ message: "Email already used" });
    }

    const passwordHash = await bcrypt.hashSync(req.body.password, 10);

    if (!passwordHash) {
      return res.status(500);
    }

    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      email: req.body.email,
      password: passwordHash
    });

    const result = await user.save();

    res.status(201).json({
      message: "User created",
      data: result
    });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }).select(
      "_id email password"
    );

    if (!user) {
      return res.status(401).json({
        message: "User doesn't exist"
      });
    }

    const passwordIsMatch = await bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsMatch) {
      return res.status(401).json({
        message: "Password is not matched"
      });
    }

    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h"
      }
    );

    return res.status(200).json({
      token,
      user
    });
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
