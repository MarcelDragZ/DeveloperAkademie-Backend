import { Route } from '@angular/router';
import { LoginLoginComponent } from '@scrumapp/login/login';
import { RegisterRegisterComponent } from '@scrumapp/register/register';

export const appRoutes: Route[] = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginLoginComponent },
  { path: 'register', component: RegisterRegisterComponent },
  {
    path: 'app',
    loadChildren: () =>
      import('@scrumapp/shell/shell').then((m) => m.APP_ROUTES),
  },
];
