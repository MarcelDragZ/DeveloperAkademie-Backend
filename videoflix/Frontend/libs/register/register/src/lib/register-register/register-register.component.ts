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
  selector: 'videoflix-register-register',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, HttpClientModule],
  template: ` <img
      class="absolute left-5 top-5 w-44 object-contain "
      src="/assets/videoflix2.png"
    />

    <a
      class="absolute right-5 top-5 pl-3 pr-3 pt-0.5 pb-0.5 rounded bg-red-700 text-center text-white"
      [routerLink]="['/login']"
      >Sign In</a
    >

    <img
      class="absolute w-screen h-screen object-cover -z-10 opacity-45"
      src="/assets/videos_background2.jpg"
    />

    <div
      class="flex items-center justify-center h-screen w-screen text-white font-bold text-3xl"
      *ngIf="registrySuccessful"
    >
      Registration successful.
      <br />
      An email has been sent!
    </div>

    <form
      [ngClass]="registrySuccessful ? 'hidden' : ''"
      class="flex items-center justify-center h-screen w-screen text-white"
    >
      <div
        class="flex flex-col justify-center w-full md:w-2/3 rounded h-3/6 p-10 pt-10"
      >
        <h1 class="text-white text-center font-bold text-2xl mb-5">
          Unlimited movies, TV shows, and more
        </h1>
        <h2 class="text-white text-center font-bold mb-5">
          Watch anywhere. Cancel anytime.
        </h2>
        <h2 class="text-white text-center font-bold  mb-5">
          Ready to watch? Enter your email to create or restart your membership.
        </h2>
        <span class="text-red-700 font-bold -mb-10" *ngIf="error"
          >Error registering User. <br />There may be already a User with the
          Same Username</span
        >
        <div class="flex flex-col md:flex-row items-center  mt-20">
          <div class="flex flex-col w-full">
            <input
              class="bg-neutral-800 bg-opacity-70 p-2 rounded w-full"
              type="text"
              [(ngModel)]="newTeamMember.username"
              name="username"
              placeholder="Username"
            />
            <input
              class="bg-neutral-800 bg-opacity-70 p-2 rounded w-full mt-1"
              type="email"
              [(ngModel)]="newTeamMember.email"
              name="email"
              placeholder="Email address"
            />
            <input
              class="bg-neutral-800 bg-opacity-70 p-2 rounded w-full mt-1"
              type="password"
              [(ngModel)]="newTeamMember.password1"
              name="password1"
              placeholder="Password"
            />
            <input
              class="bg-neutral-800 bg-opacity-70 p-2 rounded w-full mt-1"
              type="password"
              [(ngModel)]="newTeamMember.password2"
              name="password2"
              placeholder="Password repeat"
            />
          </div>
          <div class="w-full md:mt-0 mt-4 md:ml-4">
            <button
              (click)="signUp()"
              class="bg-red-700 p-2 rounded w-full md:w-full text-white"
            >
              Get started ►
            </button>
          </div>
        </div>
      </div>
    </form>`,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterRegisterComponent {
  router: Router = inject(Router);
  http = inject(HttpClient);
  cdRef: ChangeDetectorRef = inject(ChangeDetectorRef);

  clickedSignupButton = false;
  registrySuccessful = false;
  error = false;

  newTeamMember: any = {
    username: '',
    email: '',
    password1: '',
    password2: '',
  };

  async signUp() {
    try {
      const url = environment.baseUrl + '/register/';

      const resp = await lastValueFrom(this.http.post(url, this.newTeamMember));
      console.log(resp);
      this.registrySuccessful = true;
      this.cdRef.detectChanges();
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);
    } catch (e) {
      console.error(e);
      this.error = true;
      this.cdRef.detectChanges();
      setTimeout(() => {
        this.error = false;
        this.cdRef.detectChanges();
      }, 2000);
    }
  }
}
