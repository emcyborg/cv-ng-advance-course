import { importProvidersFrom } from '@angular/core';
import { Routes } from '@angular/router';
import { CoreModule } from './core/core.module';
import { DataModule } from './data/data.module';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./app.component').then((m) => m.AppComponent),
    loadChildren: () =>
      import('./presentation/presentation.routes').then(
        (m) => m.presentationRoutes
      ),
    providers: [importProvidersFrom([CoreModule, DataModule])],
  },
];
