import { Request, Response } from 'express';

export const healthCheck = (req: Request, res: Response) => {
  res.json({ status: 'OK', message: 'API is healthy' });
};
