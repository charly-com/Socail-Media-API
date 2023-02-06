import express from 'express';
import {Register, Login, uploadAvater} from '../controller/userController';
import {upload} from '../utils/utils'
import {authenticate} from '../utils/utils'

const router = express.Router();

router.post('/register', Register);
  
router.post('/login', Login);

router.post('/upload',  upload.single('avater'), uploadAvater)


export default router;
