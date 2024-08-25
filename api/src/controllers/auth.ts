import { Request, Response, NextFunction } from 'express';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

import User, { IUser } from '../models/User';
import authServices from '../services/auth';
import {
  AlreadyExistError,
  BadRequestError,
  DoesNotExist,
} from '../apiErrors/apiErrors';
import { hashPassword, 
  generateEmailConfirmationToken,
  comparePassword, 
  generateToken } from '../utils/crypto';

//dami
const clientURL = process.env.CLIENTURL;

// Register account-------------------------
export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password } = req.body;

  try {
    const isExist = await User.findOne({ email });
    if (isExist) throw new AlreadyExistError();

    // hash password
    const hashedPassword = await hashPassword(password);

    //create email confirmation token
    const emailConfirmationToken = generateEmailConfirmationToken();

    const newUser = new User({
        name: name,
        email: email,
        password: hashedPassword,
        emailConfirmationToken: emailConfirmationToken,
      });


    const createSuccess = await authServices.signUp(newUser);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
        user: process.env.EMAIL_USER, // admin email
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: createSuccess.email,
      subject: 'Email Confirmation',
      html: `<p>Please confirm your email by clicking the following link: 
           <a href="${clientURL}/auth/confirm/${emailConfirmationToken}">Confirm Email</a></p>`,
    };

    await transporter.sendMail(mailOptions);

    res
      .status(201)
      .json({ message: 'User registered, please check your email to confirm' });
  } catch (error) {
    res.status(500).json({ message: 'Error signing up' });
  }
};

// Confirm email -------------------------------
export const confirmEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findOne({
      emailConfirmationToken: req.params.token,
    });

    if (!user) throw new DoesNotExist();

    user.isValid = true;
    user.emailConfirmationToken = '';
    const confirmSuccess = await authServices.confirmEmail(user);
    res.status(200).json({ message: 'Email confirmed, you can now log in' });
  } catch (error) {
    res.status(500).json({ message: 'Error confirming email' });
  }
};

//login -----------------------
export const signIn = async(
    req: Request,
    res: Response,
    next: NextFunction
) =>{
    const {email, password} = req.body
console.log("email ",email)
    try {
        const user = await User.findOne({email})

        //check user is exist or not
        if(!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
          }
          //user confirmed email or not
          if (!user.isValid) {
            return res.status(400).json({ message: 'Please confirm your email first' });
          }
          // compare password
          const isMatch = await comparePassword(password, user.password)
          if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
          }
const token = await authServices.signIn(user)
res.status(200).json(token)
    } catch (error) {
        
    }

}
