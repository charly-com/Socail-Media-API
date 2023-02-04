import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_DBNAME!)
.then(() => console.log('MongoDB Connected'))
.catch((err: any) => console.log(err));

app.use(express.static(__dirname + '/public'));

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
