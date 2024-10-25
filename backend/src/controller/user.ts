import { Request, Response, NextFunction } from "express";
import jsonWebToken from "../utils/jsonWebToken";
const secretKey = process.env.JWT_SECRET || 'your-secret-key';

//Takes params to register a user and returns JWT
export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    res.send("REGISTER");
}

//Takes params to login a user and returns JWT
export const loginUser = async (req: Request, res: Response, next: NextFunction) => {

}

//Requires to already have JWT
export const logoutUser = async (req: Request, res: Response, next: NextFunction) => {
    
}

//EDIT maybe won't be used in the future 
export const getUserProfile = async (req: Request, res: Response, next: NextFunction) => {
    
}

//Requires to already have JWT
export const updateUserProfile = async (req: Request, res: Response, next: NextFunction) => {
    
}

//Requires to already have JWT
export const changeUserPassword = async (req: Request, res: Response, next: NextFunction) => {

}

//Requires to provide email or username
export const forgotUserPassword = async (req: Request, res: Response, next: NextFunction) => {

}

//Call this upon register, login and forgotUserPassword 
export const emailVerification = async (req: Request, res: Response, next: NextFunction) => {

}