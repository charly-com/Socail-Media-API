import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRouter from './routes/Auth';


dotenv.config();

const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const port = process.env.PORT;


mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_DBNAME!)
.then(() => console.log('MongoDB Connected'))
.catch((err: any) => console.log(err));


app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.use('/api', authRouter);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
