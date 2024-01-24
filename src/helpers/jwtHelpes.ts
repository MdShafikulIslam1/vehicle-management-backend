import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../config';


const createToken = (
  payload: Record<string, unknown>,
  secretKey: Secret,
  expiresTime: string
): string => {
  return jwt.sign(payload, secretKey, { expiresIn: expiresTime });
};


const verifyToken = (token: string, secretKey: Secret): JwtPayload => {
  return jwt.verify(token, secretKey) as JwtPayload;
};



// export const signJwt = async(payload: Object) => {
//   return jwt.sign(payload, config.accessToken as Secret, {
//       expiresIn:config.accessTokenExpiresIn,
//   });
// };

export const JwtHelpers = {
  createToken,
  verifyToken,
};
