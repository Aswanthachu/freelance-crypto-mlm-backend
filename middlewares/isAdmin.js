import jwt from "jsonwebtoken";

export const isAdmin = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  let decodedData;
  try {
    if (token && token !== "undefined") {
      decodedData = jwt.verify(token, process.env.JWT_SECRET);
      if (decodedData.role !== 1)
        return res.status(403).json({ message: "Unauthorized access." });
      else {
        req.role = decodedData.role;
        next();
      }
    } else {
      res.status(402).json({ message: "User Not Authenticated.." });
    }
  } catch (error) {
    console.log(error);
  }
};
