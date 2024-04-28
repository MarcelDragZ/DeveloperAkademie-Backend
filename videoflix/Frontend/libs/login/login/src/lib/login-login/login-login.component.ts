import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

import { environment } from '@videoflix/environments';
@Component({
  selector: 'videoflix-login-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, HttpClientModule],
  template: `
    <img
      class="absolute left-5 top-5 w-44 object-contain "
      src="/assets/videoflix2.png"
    />
    <img
      class="absolute w-screen h-screen object-cover -z-10 opacity-45"
      src="/assets/videos_background.jpg"
    />

    <form class="flex items-center justify-center h-screen w-screen">
      <div
        class="flex flex-col justify-between w-full h-full md:w-96 rounded bg-black bg-opacity-100 md:bg-opacity-85 md:h-3/6 p-10 pt-28 md:pt-10"
      >
        <h1 class="text-white font-bold text-2xl mb-5">Sign In</h1>
        <input
          class="bg-neutral-800 p-2 rounded text-white w-full mb-3"
          type="text"
          [(ngModel)]="userName"
          name="userName"
          placeholder="Username"
        />
        <input
          class="bg-neutral-800 p-2 rounded text-white w-full"
          type="password"
          [(ngModel)]="password"
          name="password"
          placeholder="Password"
        />
        <span *ngIf="wrongUsernameOrPassword" class="text-red-700 mt-2"
          >Wrong Username or Password</span
        >
        <span *ngIf="noUsernameAndPassword" class="text-red-700 mt-2"
          >No Username and Password</span
        >
        <button
          (click)="login()"
          class="bg-red-700 p-2 rounded w-full text-white mt-5"
        >
          Sign In
        </button>
        <button
          (click)="loginGuest()"
          class="bg-white p-2 rounded w-full text-black mt-5"
        >
          Guest Sign In
        </button>
        <div>
          <input class="mt-4" type="checkbox" />
          <label class="text-neutral-400 ml-2 text-sm" for=""
            >Remember me</label
          >
          <a class="text-white ml-3" [routerLink]="['/forgot-password']"
            >Forgot password ?</a
          >
        </div>
        <div class="flex items-center mt-1">
          <p class="text-neutral-400">New to Videoflix ?</p>
          <a class="text-white ml-3" [routerLink]="['/register']"
            >Sign up now</a
          >
        </div>
      </div>
    </form>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginLoginComponent {
  router: Router = inject(Router);
  http = inject(HttpClient);
  cdRef: ChangeDetectorRef = inject(ChangeDetectorRef);

  userName!: string;
  password!: string;
  wrongUsernameOrPassword = false;
  noUsernameAndPassword = false;

  async login() {
    if (this.userName === '' && this.password === '') {
      this.noUsernameAndPassword = true;
      this.cdRef.detectChanges();
      setTimeout(() => {
        this.noUsernameAndPassword = false;
        this.cdRef.detectChanges();
      }, 2000);
    } else {
      try {
        const resp: any = await this.loginWithUserNameAndPasswort();
        localStorage.setItem('token', resp.token);
        this.router.navigateByUrl('/home');
      } catch (e) {
        console.error(e);
        this.wrongUsernameOrPassword = true;
        this.cdRef.detectChanges();
        setTimeout(() => {
          this.wrongUsernameOrPassword = false;
          this.cdRef.detectChanges();
        }, 2000);
      }
    }
  }

  async loginWithUserNameAndPasswort() {
    const url = environment.baseUrl + '/login/';
    const body = {
      username: this.userName,
      password: this.password,
    };
    return await lastValueFrom(this.http.post(url, body));
  }

  async loginGuest() {
    try {
      const resp: any = await this.loginGuestWithUserNameAndPassword();

      localStorage.setItem('token', resp.token);
      this.router.navigateByUrl('/home');
    } catch (e) {
      console.error(e);
    }
  }

  loginGuestWithUserNameAndPassword() {
    const url = environment.baseUrl + '/login/';
    const body = {
      username: 'Guest',
      password: 'GuestLogin',
    };
    return lastValueFrom(this.http.post(url, body));
  }
}
