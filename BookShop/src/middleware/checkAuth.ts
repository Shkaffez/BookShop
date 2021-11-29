export default function checkAuthMiddleware(req: any, res: any, next: any) {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    if (req.session) {
      req.session.returnTo = req.originalUrl || req.url;
    }
    return res.redirect('/user/auth');
  }
  next();
}
