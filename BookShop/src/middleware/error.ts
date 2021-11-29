export default function errorMiddleware(req: any, res: any) {
  res.render('error/404', {
    title: '404 | страница не найдена',
  });
}
