import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

function generateToken(email, id) {
  return jwt.sign({ email, id }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

export const registration = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password)
      return res
        .status(400)
        .json({ message: "email,password and username are required." });

    const userExist = await User.findOne({ email });
    if (userExist)
      return res.status(400).json({ message: "This user already exist" });

    if (password.length < 6)
      return res.status(400).json({ message: "Weak Password!" });

    const salt = bcrypt.genSaltSync(Number(process.env.BCRYPT_SALT_ROUND));
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = await User.create({ username, email, hashedPassword });

    const token = await generateToken(email, newUser._id);

    res
      .status(200)
      .json({ message: "User Registered successfully", newUser, token });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server error while registration" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res
        .status(400)
        .json({ message: "There is no user with this email" });

    const correctPassword = await bcrypt.compare(
      password,
      existingUser.hashedPassword
    );

    if (!correctPassword)
      return res.status(400).json({ message: "Password doesn't match" });

    const token = await generateToken(email, existingUser._id);

    res.status(200).json({ message: "User succesfully logined.", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error while login" });
  }
};
