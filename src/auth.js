import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from './authConfig';

export default async (req, res, next) => {
  const authHeaders = req.headers.authorization;

  if(!authHeaders) {
    return res.status(401).json({ error: 'Token não enviado!' });
  }

  const [, token] = authHeaders.split(' ');

  try {
    const decodePassword = await promisify(jwt.verify)(
      token,
      authConfig.secret,
    );

    req.userId = decodePassword.id;

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalido!' });
  }
};
