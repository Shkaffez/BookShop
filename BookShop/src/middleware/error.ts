import { Request, Response } from 'express-serve-static-core';

export default function errorMiddleware(req: Request, res: Response) {
  res.render('error/404', {
    title: '404 | страница не найдена',
  });
}
