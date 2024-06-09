import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { Timestamp } from '@scrumapp/environments//timestamp';
import { environment } from '@scrumapp/environments';
@Component({
  selector: 'scrumapp-home-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  template: `
    <div class="max-h-screen overflow-hidden h-screen">
      <h1
        class="p-5 pt-10
text-userColor text-2xl"
      >
        Home
      </h1>

      <div class="flex justify-center items-center w-full h-full ">
        <div
          class="w-2/3 h-2/3 -mt-16 flex flex-col justify-between text-white"
        >
          <div
            class="flex justify-center items-center w-full h-1/2 border-2 border-userColor rounded-xl mb-2"
          >
            <div
              class="flex flex-col md:flex-row items-center justify-between w-1/3"
            >
              <div class="text-center text-2xl">Tasks on Board</div>
              <div
                class="md:h-14 w-full md:w-1 border-b-2 md:border-r-2 md:border-b-0 border-userColor p-5"
              ></div>
              <div class="text-2xl p-5">{{ taskCount | async }}</div>
            </div>
          </div>
          <div class="flex flex-col md:flex-row items-center w-full h-1/2">
            <div
              class="flex items-center justify-center w-full md:w-1/2 md:mr-2 md:h-full h-screen border-2 border-userColor rounded-xl mb-2"
            >
              <div
                class="flex flex-col items-center justify-between w-2/3 md:h-1/2"
              >
                <div class="text-center">Registered Users</div>
                <div class="w-2/3 border-b-2 border-userColor"></div>
                <div>{{ userCount | async }}</div>
              </div>
            </div>

            <div
              class="flex items-center justify-center w-full md:w-1/2 md:h-full h-screen border-2 border-userColor rounded-xl mb-2"
            >
              <div
                class="flex flex-col items-center justify-between w-2/3 md:h-1/3"
              >
                <div class="text-center">Aktuelles Datum</div>
                <div class="w-2/3 border-b-2 border-userColor"></div>
                <div>{{ day }}.{{ month }}.{{ year }}</div>
                <div>{{ hours }}:{{ minutes }}:{{ seconds }} Uhr</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeHomeComponent implements OnInit {
  http = inject(HttpClient);
  cdRef = inject(ChangeDetectorRef);

  timestamp = new Timestamp();

  userCount = new BehaviorSubject<number>(0);
  taskCount = new BehaviorSubject<number>(0);
  error?: string;
  tasks: any = [];
  users: any = [];

  year!: number;
  month!: number;
  day!: number;
  hours!: number;
  minutes!: number;
  seconds!: number;

  async ngOnInit() {
    try {
      this.tasks = await this.loadTasks();
      this.users = await this.loadUsers();
      this.updateZeit();
      this.counter('user', this.users.length);
      this.counter('task', this.tasks.length);
      this.cdRef.detectChanges();
    } catch {
      this.error = 'ERROR 404';
    }
  }

  async loadTasks() {
    const url = environment.baseUrl + '/tasks/';
    return await lastValueFrom(this.http.get(url));
  }

  async loadUsers() {
    const url = environment.baseUrl + '/users/';
    return await lastValueFrom(this.http.get(url));
  }

  updateZeit(): void {
    const date = new Date();
    this.year = date.getFullYear();
    this.month = date.getMonth() + 1;
    this.day = date.getDate();
    this.hours = date.getHours();
    this.minutes = date.getMinutes();
    this.seconds = date.getSeconds();

    this.cdRef.detectChanges();

    requestAnimationFrame(() => this.updateZeit());
  }

  counter(valueCounter: string, numberToCount: number) {
    let counter = 0;
    if (numberToCount === 0) {
      return;
    } else {
      const interval = setInterval(() => {
        counter++;
        if (valueCounter === 'user') {
          this.userCount.next(counter);
        }
        if (valueCounter === 'task') {
          this.taskCount.next(counter);
        }
        if (counter === numberToCount) {
          clearInterval(interval);
        }
      }, 2000 / numberToCount);
    }
  }
}
