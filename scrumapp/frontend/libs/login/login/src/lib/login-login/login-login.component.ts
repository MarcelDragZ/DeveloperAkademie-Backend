import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { WelcomeWelcomeComponent } from '@scrumapp/welcome/welcome';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

import { environment } from '@scrumapp/environments';
@Component({
  selector: 'scrumapp-login-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    WelcomeWelcomeComponent,
    FormsModule,
    HttpClientModule,
  ],
  template: `
    <div class="absolute left-0 top-0 right-0 bottom-0 -z-10">
      <img
        class="absolute left-0 top-0 right-0 bottom-0 w-full h-full object-cover "
        src="/assets/Wallpaper9.1Background_gray.png"
      />
      <img
        class="absolute left-0 top-0 right-0 bottom-0 img-color w-full h-full object-cover object-right-top"
        src="/assets/Wallpaper 9.1Logoopactiy40.png"
      />
    </div>

    <scrumapp-welcome-welcome />
    <div class="flex items-end flex-row md:justify-end text-white p-16">
      Not a Scrumboard user?
      <a
        [routerLink]="['/register']"
        class="bg-userColor ml-5 p-1 rounded cursor-pointer hover:opacity-80 transition-all"
      >
        Sign up</a
      >
    </div>

    <div class="flex items-center -mt-40 h-screen w-screen">
      <div class="flex justify-center w-screen ">
        <div
          class="flex items-center flex-col border-userColor border-2 w-full md:w-1/2 rounded bg-neutral-800"
        >
          <h1 class="text-white text-3xl m-5 pb-2 border-userColor border-b-2">
            Log in
          </h1>

          <form class="flex flex-col items-center w-full mt-5 ">
            <div class="flex flex-col w-6/12">
              <input
                class="border-userColor border-b-2 p-2 rounded bg-transparent text-white placeholder:text-white"
                type="text"
                placeholder="Username"
                [(ngModel)]="userName"
                name="userName"
                required
              />
              <input
                class="border-userColor border-b-2 p-2 rounded bg-transparent text-white placeholder:text-white mt-5"
                type="password"
                placeholder="Password"
                [(ngModel)]="password"
                name="password"
                required
              />
            </div>
            <div class="flex flex-col items-start w-6/12 mt-7 text-white">
              <div><input class="mr-2" type="checkbox" />Remember me</div>
            </div>
            <div class="flex flex-col justify-center mt-5 mb-5 w-6/12">
              <button
                (click)="login()"
                class="w-full rounded p-2 text-white bg-userColor hover:opacity-80 transition-all"
              >
                Log in
              </button>
              <button
                (click)="loginGuest()"
                class="mt-2 w-full rounded p-2 bg-white text-black hover:opacity-80 transition-all"
              >
                Guest Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginLoginComponent {
  router: Router = inject(Router);
  http = inject(HttpClient);

  userName!: string;
  password!: string;

  async login() {
    try {
      const resp: any = await this.loginWithUserNameAndPasswort();
      localStorage.setItem('token', resp.token);
      this.router.navigateByUrl('app/home');
    } catch (e) {
      console.error(e);
    }
  }

  loginWithUserNameAndPasswort() {
    const url = environment.baseUrl + '/login/';
    const body = {
      username: this.userName,
      password: this.password,
    };
    return lastValueFrom(this.http.post(url, body));
  }

  async loginGuest() {
    try {
      const resp: any = await this.loginGuestWithUserNameAndPassword();

      localStorage.setItem('token', resp.token);
      this.router.navigateByUrl('app/home');
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
