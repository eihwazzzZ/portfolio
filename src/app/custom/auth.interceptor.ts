import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem("token");

  if(token && (req.url.indexOf("api/auth/login") <= 0 && 
      (req.url.indexOf("api/user") > 0 && req.method !== 'POST')
    )) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(clonedRequest);
  }

  return next(req);
};
