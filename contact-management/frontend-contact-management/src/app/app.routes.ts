import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'contacts',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/auth/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'contacts',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/contacts/contact-list/contact-list.component').then(m => m.ContactListComponent)
  },
  {
    path: 'contacts/new',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/contacts/contact-form/contact-form.component').then(m => m.ContactFormComponent)
  },
  {
    path: 'contacts/edit/:id',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/contacts/contact-form/contact-form.component').then(m => m.ContactFormComponent)
  },
  {
    path: 'admin',
    canActivate: [authGuard, adminGuard],
    loadComponent: () => import('./pages/admin/admin.component').then(m => m.AdminComponent)
  },
  {
  path: 'profile',
  canActivate: [authGuard],
  loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent)
},
  {
    path: '**',
    redirectTo: 'contacts'
  }
];