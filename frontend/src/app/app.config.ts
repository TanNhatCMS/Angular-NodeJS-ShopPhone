import {ApplicationConfig, ErrorHandler} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {ErrorDialogService} from "./services/error-dialog.service";
import {AuthService} from "./services/auth.service";
import {HTTP_INTERCEPTORS, provideHttpClient, withFetch} from "@angular/common/http";
import {LoaderInterceptorService} from "./services/loader-interceptor.service";
import {GlobalErrorHandler} from "./utils/global-error-handler";


export const appConfig: ApplicationConfig = {
    providers: [
      provideRouter(routes),
      provideAnimationsAsync(),
      ErrorDialogService,
      AuthService,
      {provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptorService, multi: true},
      provideHttpClient(withFetch()),
      provideAnimationsAsync(),
      {provide: ErrorHandler, useClass: GlobalErrorHandler}
    ]
};
