import express from 'express';
import mongoose from 'mongoose';
import {MongoMemoryServer} from 'mongodb-memory-server'
import helmet from 'helmet';

import rootRouter from './routes/index';
import handleError from './middleware/error-handler';

const app = express();

app.use(helmet());
app.use(express.json());
 
app.use(rootRouter);
app.use(handleError);


async function start() {
  const mongod = await MongoMemoryServer.create()
  const url = mongod.getUri()

  await mongoose
        .connect(url)
        .then(() => console.log('Connected to MongoDB'))
        .catch((err) => console.log(`DB conection error ${err}`));

  app.listen(3000, () => console.log('Server working...'));
}

start()
