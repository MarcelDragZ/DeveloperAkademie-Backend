import { Route } from '@angular/router';

export const APP_ROUTES: Route[] = [
  {
    path: 'home',
    loadComponent: () =>
      import('@scrumapp/home/home').then((m) => m.HomeHomeComponent),
  },
  {
    path: 'board',
    loadComponent: () =>
      import('@scrumapp/board/board').then((m) => m.BoardBoardComponent),
  },
  {
    path: 'add-task',
    loadComponent: () =>
      import('@scrumapp/add-task').then((m) => m.AddTaskComponent),
  },
  {
    path: 'edit-task/:id',
    loadComponent: () =>
      import('@scrumapp/edit-task').then((m) => m.EditTaskComponent),
  },
  {
    path: 'users',
    loadComponent: () =>
      import('@scrumapp/user/user').then((m) => m.UserUserComponent),
  },
  {
    path: 'imprint',
    loadComponent: () =>
      import('@scrumapp/imprint/imprint').then(
        (m) => m.ImprintImprintComponent
      ),
  },
  {
    path: 'profile/:id',
    loadComponent: () =>
      import('@scrumapp/profile/profile').then(
        (m) => m.ProfileProfileComponent
      ),
  },
  { path: '**', redirectTo: 'home' },
];
