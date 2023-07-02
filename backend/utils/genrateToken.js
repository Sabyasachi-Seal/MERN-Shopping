import jwt from "jsonwebtoken";

const generateWebToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

export { generateWebToken };
