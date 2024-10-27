import { Request, Response, NextFunction } from "express";
import jsonWebToken from "../utils/jsonWebToken";
import User from "../model/User";
import { Encrypt } from "../utils/bcryptEncription";

//Takes params to register a user and returns JWT
export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    const {username, email, password} = req.body;
    const searchUser = await User.findOne({username});
    if (searchUser) {
      return res.status(400).send({
        message: 'User already registered',
      });
    }
    //EDIT Quick user info validation maybe will upgrade it later 
    if (!username || !email || !password ) {
        return res.status(400).send({
          message: 'Invalid data. Username, email, and password are required.',
        });
    } else if (!email.includes("@")) {
      const message = "Invalid email.";
      return res.status(400).send({
        message
      });
    } if (password.length < 6) {
      const message = "Password must be 6 characters or more.";
      return res.status(400).send({
        message
      });
    }

    const hashedPassowrd = await Encrypt.cryptPassword(password);
    const user = new User({
      username,
      email,
      password: hashedPassowrd,
    });
    await user.save();

    const token = jsonWebToken.generateToken(user.id);

    res.cookie('token', token, {
      httpOnly: true,  
      secure: process.env.NODE_ENV === 'production', 
      sameSite: "strict", 
      maxAge: 3600000 
    });

    return res.status(201).json({
      message: 'User registered successfully!'
    });
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