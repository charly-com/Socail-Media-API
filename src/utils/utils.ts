import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import {v2 as cloudinary} from 'cloudinary';
import {CloudinaryStorage} from 'multer-storage-cloudinary';
import dotenv from 'dotenv';
dotenv.config();
const secret = process.env.JWT_SECRET || 'secret'



cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: async(req, file)=>{
      return{
        folder: "avater folder",
      }
    },
});
  
export const upload = multer({ storage: storage });


export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization');
    if (!token || token !== secret) {
      return res.status(401).send({ error: 'You are not authorized to perform this action.' });
    }
    next();
  };
  