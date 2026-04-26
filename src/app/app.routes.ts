import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'signin',
    loadComponent: () => import('./pages/signin/signin.component').then(
      m => m.SigninComponent
    )
  },
  {
    path: 'dashboard', title: 'Dashboard', loadComponent: () =>
      import('./pages/dashboard/dashboard.component').then(
        m => m.DashboardComponent
      )
  },

  { path: '**', redirectTo: 'signin', pathMatch: 'full' },
];
