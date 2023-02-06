import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import { User } from '../models/Users';
import jwt from 'jsonwebtoken';
const secret = process.env.JWT_SECRET || 'secret'





export const Register = async (req: Request, res: Response) => {
    const { email, password } = req.body;
  
    const hash = await bcrypt.hash(password, 10);
  
    const user = new User({ email, password: hash });
    await user.save();
  
    res.status(201).send('User created');
};

export const Login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send('Invalid username or password');
    }
  
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send('Invalid username or password');
    }
  
    const token = jwt.sign({ userId: user._id }, secret, { expiresIn: '1h' });
    res.status(200).send({ token });
}

export const uploadAvater = async (req: Request, res: Response) => {
    if (!req.file) {
        return res.status(400).send('No file was uploaded.');
      }
    
      res.status(200).send('File uploaded successfully.');
}
