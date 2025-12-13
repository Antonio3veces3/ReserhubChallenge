import mongoose, { mongo } from 'mongoose';
import app from './app.ts';
import config from './config/config.ts';
import { connectDB } from './db/connection.ts';

app.listen(config.PORT, async () => {
  await connectDB();
  console.log(
    `Server is running on PORT ${config.PORT} in ${config.ENV} mode.`,
  );
});
