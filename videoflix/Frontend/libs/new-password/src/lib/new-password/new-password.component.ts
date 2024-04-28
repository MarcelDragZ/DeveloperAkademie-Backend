import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { HttpClient, HttpClientModule } from '@angular/common/http';

import { environment } from '@videoflix/environments';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'videoflix-new-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  template: `<img
      class="absolute left-5 top-5 w-44 object-contain"
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
        <div class="flex flex-col">
          <a class="text-white font-bold mb-4" [routerLink]="['/login']"
            >Back to Login</a
          >
          <h1 class="text-white font-bold text-2xl mb-5">Reset password</h1>
        </div>
        <input
          *ngIf="!successful"
          class="bg-neutral-800 p-2 rounded text-white w-full"
          type="password"
          [(ngModel)]="password"
          name="password"
          placeholder="New Password"
        />
        <div *ngIf="successful" class="text-green-600">
          Password has been successfully resetted
        </div>
        <div *ngIf="error" class="text-red-600">Error resetting password</div>
        <button
          *ngIf="!successful"
          (click)="resetPassword()"
          class="bg-white p-2 rounded w-full text-black mt-5"
        >
          Reset Password
        </button>
      </div>
    </form>`,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewPasswordComponent implements OnInit {
  router: Router = inject(Router);
  route = inject(ActivatedRoute);
  http = inject(HttpClient);
  cdRef: ChangeDetectorRef = inject(ChangeDetectorRef);

  password!: string;
  successful = false;
  error = false;
  userId!: string | null;

  async ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');
  }
  async resetPassword() {
    const url = environment.baseUrl + `/reset-password/${this.userId}/`;
    const body = {
      password: this.password,
    };

    try {
      const resp = await lastValueFrom(this.http.put(url, body));
      this.successful = true;
      this.error = false;
      this.cdRef.detectChanges();
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);
    } catch (e) {
      console.error(e);
      this.error = true;
      this.successful = false;
      this.cdRef.detectChanges();
    }
  }
}
