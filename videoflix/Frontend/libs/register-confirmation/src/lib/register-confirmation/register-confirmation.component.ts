import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { environment } from '@videoflix/environments';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'videoflix-register-confirmation',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
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
      *ngIf="loading"
      class="flex items-center justify-center h-screen w-screen text-white font-bold text-3xl "
    >
      <div class="loader"></div>
    </div>

    <div
      *ngIf="error"
      class="flex items-center justify-center h-screen w-screen text-white font-bold text-3xl"
    >
      No Account found !
    </div>

    <div
      *ngIf="successfull"
      class="flex items-center justify-center h-screen w-screen text-white font-bold text-3xl"
    >
      Account has succesfully activated
    </div>`,
  styles: [
    `
      .loader {
        width: 50px;
        aspect-ratio: 1;
        display: grid;
        border: 4px solid #0000;
        border-radius: 50%;
        border-right-color: #25b09b;
        animation: l15 1s infinite linear;
      }
      .loader::before,
      .loader::after {
        content: '';
        grid-area: 1/1;
        margin: 2px;
        border: inherit;
        border-radius: 50%;
        animation: l15 2s infinite;
      }
      .loader::after {
        margin: 8px;
        animation-duration: 3s;
      }
      @keyframes l15 {
        100% {
          transform: rotate(1turn);
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterConfirmationComponent implements OnInit {
  route = inject(ActivatedRoute);
  http = inject(HttpClient);
  cdRef: ChangeDetectorRef = inject(ChangeDetectorRef);

  loading = true;
  successfull = false;
  error = false;

  async ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('id');
    const url = environment.baseUrl + `/register-confirmation/${userId}/`;
    try {
      console.log(await lastValueFrom(this.http.put(url, '')));
      setTimeout(() => {
        this.successfull = true;
        this.loading = false;
        this.cdRef.detectChanges();
      }, 1500);
    } catch (e) {
      setTimeout(() => {
        this.error = true;
        this.loading = false;
        this.cdRef.detectChanges();
      }, 1500);
    }
  }
}
