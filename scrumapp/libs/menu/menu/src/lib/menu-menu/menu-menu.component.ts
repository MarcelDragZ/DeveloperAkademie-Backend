import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { environment } from '@scrumapp/environments';
@Component({
  selector: 'scrumapp-menu-menu',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  template: ` <nav
    [class.hidden]="!toggledMenu"
    *ngIf="specificUser"
    class="fixed left-0 top-0 bottom-0 flex flex-col overflow-y-auto justify-between w-full md:w-48 bg-neutral-900 border-r-2 text-userColor border-userColor"
  >
    <div>
      <div class="flex items-center justify-around md:justify-start mt-4">
        <div (click)="toggleMenu(false)">
          <img
            class="w-12 img-color cursor-pointer hover:opacity-80 transition-all"
            src="/assets/burger_menu.png"
          />
        </div>
        <div class="flex items-center">
          <img class="w-16 img-color" src="/assets/logo_simply_black.png" />
          <p class="text-xl font-bold">Scrum</p>
        </div>
      </div>

      <a
        (click)="toggleMenu(true)"
        class="flex items-center justify-start pl-4 md:pl-0 md:justify-around cursor-pointer w-full bg-neutral-800 mt-5 rounded hover:bg-neutral-900 hover:transition-all "
      >
        <!-- <a
        (click)="toggleMenu(true)"
        [routerLink]="['app/profile/' + 1]"
        class="flex items-center justify-start pl-4 md:pl-0 md:justify-around cursor-pointer w-full bg-neutral-800 mt-5 rounded hover:bg-neutral-900 hover:transition-all "
      > -->
        <div>
          <img
            class="w-10 object-contain rounded-full"
            src="/assets/avatar_priminity.png"
          />
        </div>
        <div class="font-bold md:ml-0 ml-5">
          <p class="border-b-2 border-userColor border-solid border-opacity-75">
            Admin
          </p>
          <p>{{ specificUser.username }}</p>
        </div>
      </a>
    </div>

    <!-- NAV HERE -->

    <div class="h-full">
      <div class="flex flex-col ml-3 mr-3 mt-5">
        <a
          [routerLink]="['app/home']"
          (click)="toggleMenu(true)"
          class="flex items-center cursor-pointer hover:bg-neutral-800 hover:transition-all p-1 rounded"
          ><img
            class="w-6 object-contain mr-2 img-color"
            src="/assets/home.png"
          />Home</a
        >
        <a
          [routerLink]="['app/board']"
          (click)="toggleMenu(true)"
          class="flex items-center cursor-pointer hover:bg-neutral-800 hover:transition-all p-1 rounded"
          ><img
            class="w-6 object-contain mr-2 img-color"
            src="/assets/task.png"
          />Board</a
        >
      </div>

      <div class="flex flex-col ml-3 mr-3">
        <a
          [routerLink]="['app/users']"
          (click)="toggleMenu(true)"
          class="flex items-center cursor-pointer hover:bg-neutral-800 hover:transition-all p-1 rounded"
          ><img
            class="w-6 object-contain mr-2 img-color"
            src="/assets/user.png"
          />Users</a
        >
      </div>

      <div class="border-b-2 border-neutral-500 border-opacity-20 mt-5"></div>

      <div class="flex flex-col ml-3 mr-3 mt-5">
        <a
          [routerLink]="['app/imprint']"
          (click)="toggleMenu(true)"
          class="flex items-center cursor-pointer hover:bg-neutral-800 hover:transition-all p-1 rounded"
          ><img
            class="w-6 object-contain mr-2 img-color"
            src="/assets/orga.png"
          />Imprint</a
        >
      </div>
    </div>

    <div class="flex justify-center ml-3 mr-3 mb-5">
      <button
        (click)="logout()"
        class="bg-userColor text-white p-1 w-2/3 font-bold rounded hover:opacity-80 transition-all"
      >
        Logout
      </button>
    </div>
  </nav>`,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuMenuComponent implements OnInit, OnChanges {
  router: Router = inject(Router);
  http = inject(HttpClient);
  cdRef = inject(ChangeDetectorRef);

  @Input() toggleMenuInput!: boolean | null;
  @Output() emitToggledMenu = new EventEmitter<boolean>();

  specificUser!: any;
  toggledMenu = true;
  advancedMenuIcon = '▶';
  advancedMenu = false;
  error?: string;

  async ngOnInit() {
    try {
      this.specificUser = await this.loadUser();
      this.cdRef.detectChanges();
    } catch {
      this.error = 'ERROR 404';
    }
  }

  async loadUser() {
    const url = environment.baseUrl + '/current-user/';
    return await lastValueFrom(this.http.get(url));
  }

  ngOnChanges(): void {
    this.toggledMenu = this.toggleMenuInput as boolean;
  }

  toggleMenu(value: boolean) {
    if (this.toggledMenu && window.innerWidth < 768) {
      this.toggledMenu = false;
      this.emitToggledMenu.emit();
    }
    if (this.toggledMenu && window.innerWidth > 768 && !value) {
      this.toggledMenu = false;
      this.emitToggledMenu.emit();
    } else {
      this.toggledMenu = true;
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
