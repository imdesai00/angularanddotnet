import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { myinterceptorInterceptor } from './interceptor/myinterceptor.interceptor';
import { JwtInterceptor } from './interceptor/jwt.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideAnimationsAsync(),
    provideHttpClient(
      withInterceptorsFromDi(),
      // withInterceptors([myinterceptorInterceptor]),
    ),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ]
};
