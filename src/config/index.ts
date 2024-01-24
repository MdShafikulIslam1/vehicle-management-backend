import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env') });
export default {
  port: process.env.PORT,
  env: process.env.NODE_ENV,
  salt_rounds:process.env.SALT_ROUNDS,

 

  jwt:{
    secret_key:'',
    accessToken: process.env.ACCESS_TOKEN as string,
    refreshToken: process.env.REFRESH_TOKEN as string,
    
  
    accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN ,
    refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
  }
};
