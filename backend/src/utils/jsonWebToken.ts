import jwt, { Jwt, JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, RequestHandler, Response } from "express";
const secretKey = process.env.JWT_SECRET || "your-secret-key";

const jsonWebToken = {
  generateToken: (userId: string, username: string): string => {
    return jwt.sign({ userId, username }, secretKey, { expiresIn: "1h" });
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

interface TokenData extends JwtPayload {
  userId: String;
  exp: number;
  iat: number;
}

export interface AuthenticatedRequest extends Request {
  userData?: String;
}

export const checkForToken: RequestHandler = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token =
    req.cookies.token || req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "Unauthorized: No token provided" });
    return;
  }
  const userData = jsonWebToken.verifyToken(token);
  if (!userData) {
    res.status(401).json({ message: "Unauthorized: Invalid token" });
    return;
  }

  req.userData = (userData as TokenData).userId;

  next();
};
