import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then(m => m.Login)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register').then(m => m.Register)
  },
  {
    path: 'contacts',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/contacts/contact-list/contact-list').then(m => m.ContactList)
  },
  {
    path: 'contacts/new',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/contacts/contact-form/contact-form').then(m => m.ContactForm)
  },
  {
    path: 'contacts/edit/:id',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/contacts/contact-form/contact-form').then(m => m.ContactForm)
  }
];
