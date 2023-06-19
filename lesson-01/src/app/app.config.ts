import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom([
      BrowserModule,
      BrowserAnimationsModule
    ]),
    provideRouter(
      routes,
      withPreloading(PreloadAllModules)
    ),
    provideAnimations(),
    provideHttpClient()
  ]
};
