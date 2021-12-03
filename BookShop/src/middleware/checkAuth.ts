import { Response, NextFunction } from 'express';
// import { Session } from 'express-session';

export default function checkAuthMiddleware(req: any, res: Response, next: NextFunction) {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    if (req.session) {
      req.session.returnTo = req.originalUrl || req.url;
    }
    return res.redirect('/user/auth');
  }
  next();
}
