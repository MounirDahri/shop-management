import { HttpException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

export function idValidator(req: Request, res: Response, next: NextFunction) {

  const isValid = mongoose.Types.ObjectId.isValid(req.params[0])
  if(!isValid) {
    throw new HttpException('Entity not found', 404);
  }
  next();
};