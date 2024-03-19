import User from "../models/user.js";

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

    if(password.length  < 6) return res.status(400).json({message:"Weak Password!"});

    const newUser=await User.create(req.body);
    console.log(newUser);
  } catch (error) {
    console.log(error);
  }
};
