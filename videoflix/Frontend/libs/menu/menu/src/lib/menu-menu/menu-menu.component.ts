import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'videoflix-menu-menu',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  template: `
    <nav
      (mouseleave)="toggleMenu(false)"
      class="absolute top-0 left-0 right-0 h-16 flex items-center justify-between bg-gradient-to-b from-black to-neutral-900 z-10"
    >
      <div class="flex items-center">
        <div class="ml-10">
          <img class="w-32 object-contain " src="/assets/videoflix2.png" />
        </div>
        <div class="ml-5">
          <a
            class="m-2 text-neutral-200 hover:text-neutral-400 transition-all"
            [routerLink]="['home']"
            >Home</a
          >
          <a
            class="m-2 text-neutral-200 hover:text-neutral-400 transition-all"
            [routerLink]="['videos']"
            >Videos</a
          >
          <!-- <a
            class="m-2 text-neutral-200 hover:text-neutral-400 transition-all"
            [routerLink]="['mylist']"
            >My List</a
          > -->
          <a
            class="m-2 text-neutral-200 hover:text-neutral-400 transition-all"
            [routerLink]="['upload']"
            >Upload</a
          >
        </div>
      </div>
      <div class="flex flex-col mr-10 bg-slate-900">
        <img
          (mouseenter)="toggleMenu(true)"
          class="w-8 object-contain "
          src="/assets/avatar-2.jpg"
        />
        <div
          (mouseleave)="toggleMenu(false)"
          class="absolute right-9 top-16 flex flex-col bg-black bg-opacity-85 text-white "
        >
          <button
            *ngIf="advancedMenu"
            (click)="logOut()"
            class="p-2 hover:underline transition-all "
          >
            Log Out
          </button>
        </div>
      </div>
    </nav>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuMenuComponent {
  router: Router = inject(Router);
  http = inject(HttpClient);
  cdRef = inject(ChangeDetectorRef);

  advancedMenu: boolean = false;

  logOut() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  toggleMenu(bool: boolean) {
    this.advancedMenu = bool;
  }
}
