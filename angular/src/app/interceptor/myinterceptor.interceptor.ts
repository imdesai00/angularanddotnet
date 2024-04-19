import { HttpInterceptorFn } from '@angular/common/http';

export const myinterceptorInterceptor: HttpInterceptorFn = (req, next) => {

  const authToken = localStorage.getItem('token');
  if(authToken)
  {
    const authReq  = req.clone({
      setHeaders:{
        Authorization:`Bearer ${authToken}`
      }
    });
    return next(authReq );
  }
  return next(req);
};

  