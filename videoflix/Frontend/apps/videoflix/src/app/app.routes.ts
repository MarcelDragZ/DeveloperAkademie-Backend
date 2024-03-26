import { Route } from '@angular/router';
import { LoginLoginComponent } from '@videoflix/login/login';
import { RegisterRegisterComponent } from '@videoflix/register/register';
import { RegisterConfirmationComponent } from '@videoflix/register-confirmation';
import { ForgotPasswordComponent } from '@videoflix/forgot-password';
import { NewPasswordComponent } from '@videoflix/new-password';
import { HomeComponent } from '@videoflix/home';
import { VideosComponent } from '@videoflix/videos';
import { MyListComponent } from '@videoflix/my-list';
import { UploadComponent } from '@videoflix/upload';
import { VideoPlayerComponent } from '@videoflix/video-player';
import { DataProtectionComponent } from '@videoflix/data-protection';
import { ImprintImprintComponent } from '@videoflix/imprint/imprint';

export const appRoutes: Route[] = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginLoginComponent },
  { path: 'register', component: RegisterRegisterComponent },
  {
    path: 'register-confirmation/:id',
    component: RegisterConfirmationComponent,
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
  {
    path: 'reset-password/:id',
    component: NewPasswordComponent,
  },
  { path: 'home', component: HomeComponent },
  { path: 'videos', component: VideosComponent },
  { path: 'mylist', component: MyListComponent },
  { path: 'play/:id', component: VideoPlayerComponent },
  { path: 'upload', component: UploadComponent },
  { path: 'dataprotection', component: DataProtectionComponent },
  { path: 'imprint', component: ImprintImprintComponent },
];
