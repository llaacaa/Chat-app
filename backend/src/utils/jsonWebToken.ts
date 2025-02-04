import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, RequestHandler, Response } from "express";
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

export interface AuthenticatedRequest extends Request {
  userData?: unknown;
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

  req.userData = userData;
  
  next();
};
