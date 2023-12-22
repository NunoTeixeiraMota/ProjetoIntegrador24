import { Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import config from '../../../config';
import exp from 'constants';


const jwt = require('jsonwebtoken');

export const checkRole = (requiredRoles) => (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Authentication token is missing' });
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret); 
    const roles = decoded.role || [];
    console.log(roles);
    const hasRequiredRole = requiredRoles.some(role => roles.includes(role));
    if (!hasRequiredRole) {
      return res.status(403).json({ message: 'Insufficient permissions' });
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }

};