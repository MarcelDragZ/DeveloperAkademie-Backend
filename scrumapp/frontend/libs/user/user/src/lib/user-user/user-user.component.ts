import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { environment } from '@scrumapp/environments';
@Component({
  selector: 'scrumapp-user-user',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  template: `<h1
      class="p-5 pt-10
 text-userColor text-2xl"
    >
      Userlist
    </h1>
    <div
      class="flex flex-col sm:flex-row items-start sm:items-center justify-between"
    >
      <div
        class="flex w-full sm:w-auto text-sm sm:text-base text-white sm:pr-0 pr-5 sm:pl-0 pl-5 mt-5 sm:m-5 cursor-pointer"
      >
        <div
          (click)="changeListFilter('all')"
          [ngClass]="
            (listFilter$ | async) === 'all'
              ? 'border-userColor'
              : 'border-neutral-500'
          "
          class="border-opacity-20 border-b-2 w-12 pb-2 text-center transition-all"
        >
          Alle
        </div>
        <div
          (click)="changeListFilter('activated')"
          [ngClass]="
            (listFilter$ | async) === 'activated'
              ? 'border-userColor'
              : 'border-neutral-500'
          "
          class="border-opacity-20 border-b-2 w-24 pb-2 text-center transition-all"
        >
          Aktivierte
        </div>
        <div
          (click)="changeListFilter('deactivated')"
          [ngClass]="
            (listFilter$ | async) === 'deactivated'
              ? 'border-userColor'
              : 'border-neutral-500'
          "
          class="border-opacity-20 border-b-2 w-24 pb-2 text-center transition-all"
        >
          Deaktivierte
        </div>
      </div>

      <!-- <div class="m-5">
        <input
          placeholder="Suche"
          class="border-userColor w-full border-b-2 p-2 rounded bg-transparent text-white placeholder:text-white"
          [(ngModel)]="searchFilter"
          (keyup)="changeSearchFilter()"
          type="text"
          name="searchInput"
        />
      </div> -->
    </div>

    <table class="w-full text-white ">
      <tr
        class="bg-neutral-900 h-10 border-b-userColor border-opacity-30 border-b-2"
      >
        <td class="pl-5">Nr.</td>
        <td>Name</td>
        <td>E-Mail</td>
      </tr>

      <ng-container *ngFor="let user of users; let i = index">
        <tr class="h-9 border-b-neutral-900 border-b-2 border-opacity-80">
          <td class="pl-5">{{ i + 1 }}</td>
          <td>{{ user.username }}</td>

          <td>{{ user.email }}</td>
        </tr>
      </ng-container>
    </table>`,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserUserComponent implements OnInit {
  router = inject(Router);
  http = inject(HttpClient);
  cdRef = inject(ChangeDetectorRef);

  users: any = [];
  searchFilter = '';
  error?: string;

  listFilter$ = new BehaviorSubject<string>('all');
  searchFilter$ = new BehaviorSubject<string>('');

  async ngOnInit() {
    try {
      this.users = await this.loadUsers();
      this.cdRef.detectChanges();
      console.log(this.users);
    } catch {
      this.error = 'ERROR 404';
    }
  }

  changeListFilter(filter: string) {
    this.listFilter$.next(filter);
  }

  changeSearchFilter() {
    this.searchFilter$.next(this.searchFilter);
  }

  async loadUsers() {
    const url = environment.baseUrl + '/users/';
    return await lastValueFrom(this.http.get(url));
  }
}
