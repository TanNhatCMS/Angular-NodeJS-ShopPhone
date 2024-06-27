import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    // Log the error to a monitoring service or console
    console.error('Global Error:', error);
  }
}
