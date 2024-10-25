import jwt, { JwtPayload } from 'jsonwebtoken';
const secretKey = process.env.JWT_SECRET || 'your-secret-key';

const jsonWebToken = {
    generateToken: (userId: string): string => {
        return jwt.sign({ userId }, secretKey, { expiresIn: '1h' });
    },
    verifyToken: (token: string): JwtPayload | string | null => {
        try {
            return jwt.verify(token, secretKey) as JwtPayload;
        } catch (error) {
            console.error("Invalid token", error);
            return null;
        }
    }
};

export default jsonWebToken;