import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response } from "express";
const secretKey = process.env.JWT_SECRET || "your-secret-key";

const jsonWebToken = {
  generateToken: (userId: string): string => {
    return jwt.sign({ userId }, secretKey, { expiresIn: "1h" });
  },
  verifyToken: (token: string): JwtPayload | string | null => {
    try {
      return jwt.verify(token, secretKey) as JwtPayload;
    } catch (error) {
      console.error("Invalid token", error);
      return null;
    }
  },
};
export default jsonWebToken;

export async function checkForToken(req: Request, res: Response) {

  const token = req.cookies?.token;
  

  if (!token) {
    console.log("NO TOKEN!");
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, secretKey, (err: unknown, decoded: unknown) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    res.status(200).json({ message: "Authenticated", user: decoded });
  });
}
