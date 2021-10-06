import { config as envConfig } from 'dotenv';

envConfig();
export default {
  mongoUri: String(process.env.MONGO_URL),
  port: Number(process.env.PORT),
};
