import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

import { environment } from '@scrumapp/environments';
@Component({
  selector: 'scrumapp-register-register',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, HttpClientModule],
  template: ` <div class="absolute right-0 bottom-0 left-0 top-0 -z-10">
      <img
        class="absolute left-5 top-5 w-28 object-contain img-color"
        src="/assets/logo_simply_black.png"
      />
    </div>
    <div class="flex justify-center items-center h-screen w-screen ">
      <div class="flex justify-center w-screen ">
        <div
          class="flex items-center flex-col border-userColor border-2 w-full md:w-6/12 rounded"
        >
          <div class="flex items-center justify-between">
            <a
              [routerLink]="['/login']"
              class="text-xl text-userColor cursor-pointer"
              >◄</a
            >
            <h1
              class="text-white text-3xl m-5 pb-2 border-userColor  border-b-2"
            >
              Sign up
            </h1>

            <span
              *ngIf="registrySuccessful"
              class=" brightness-200 text-green-700 animate-pulse"
            >
              <span class="hue-rotate-180  brightness-75">✔️</span> Erfolgreich
              registriert
            </span>
          </div>
          <form #form="ngForm" class="flex flex-col items-center w-full mt-5">
            <div class="flex flex-col md:flex-row justify-between w-8/12">
              <div class="w-full mt-5 md:mt-0">
                <div
                  class="text-red-800 text-sm"
                  *ngIf="
                    form.controls['userName']?.invalid && clickedSignupButton
                  "
                >
                  Username required.
                </div>
                <input
                  class="border-userColor w-full border-b-2 p-2 rounded bg-transparent text-white placeholder:text-white"
                  type="text"
                  placeholder="Username"
                  [(ngModel)]="newTeamMember.username"
                  name="userName"
                  required
                />
              </div>
            </div>

            <div class="flex flex-col md:flex-row justify-between w-8/12 mt-5">
              <div class="w-full">
                <div
                  class="text-red-800 text-sm"
                  *ngIf="form.controls['email']?.invalid && clickedSignupButton"
                >
                  Email required.
                </div>
                <input
                  class="border-userColor w-full border-b-2 p-2 rounded bg-transparent text-white placeholder:text-white"
                  type="email"
                  placeholder="E-Mail"
                  [(ngModel)]="newTeamMember.email"
                  name="email"
                  required
                />
              </div>
            </div>

            <div class="flex justify-between w-8/12 mt-5">
              <div class="w-full">
                <div
                  class="text-red-800 text-sm"
                  *ngIf="
                    form.controls['password']?.invalid && clickedSignupButton
                  "
                >
                  Steam-Link required.
                </div>
                <input
                  class="border-userColor w-full border-b-2 p-2 rounded bg-transparent text-white placeholder:text-white"
                  type="password"
                  placeholder="Password"
                  [(ngModel)]="newTeamMember.password"
                  name="password"
                  required
                />
              </div>
            </div>
            <div class="flex justify-between w-8/12 mt-5">
              <div class="w-full">
                <div
                  class="text-red-800 text-sm"
                  *ngIf="
                    form.controls['password']?.invalid && clickedSignupButton
                  "
                >
                  Steam-Link required.
                </div>
                <input
                  class="border-userColor w-full border-b-2 p-2 rounded bg-transparent text-white placeholder:text-white"
                  type="password"
                  placeholder="Repeat Password"
                  [(ngModel)]="newTeamMember.password2"
                  name="password2"
                  required
                />
              </div>
            </div>

            <div class="flex justify-center mt-5 mb-10 w-6/12">
              <button
                (click)="signUp(form.invalid)"
                class="w-full rounded p-2 text-white bg-userColor hover:opacity-80 transition-all"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>`,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterRegisterComponent {
  router: Router = inject(Router);
  http = inject(HttpClient);

  clickedSignupButton = false;
  registrySuccessful = false;

  newTeamMember: any = {
    username: '',
    email: '',
    password: '',
    password2: '',
  };

  async signUp(invalid: boolean | null) {
    try {
      this.registrySuccessful = true;
      const url = environment.baseUrl + '/register/';

      await lastValueFrom(this.http.post(url, this.newTeamMember));
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);
    } catch (e) {
      console.error(e);
    }
  }
}
