import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Timestamp } from '@scrumapp/environments//timestamp';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

import { environment } from '@scrumapp/environments';
@Component({
  selector: 'scrumapp-edit-task',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  template: `
    <h1
      class="p-5 pt-10
text-userColor text-2xl"
    >
      Edit Task
    </h1>
    <div class="border-b-2 border-userColor"></div>

    <div class="flex lg:flex-row flex-col text-white">
      <form
        *ngIf="specificTask"
        #form="ngForm"
        class="flex flex-col justify-between w-full full_height border-r-2 border-userColor "
      >
        <div class="flex  p-5">
          <div class="w-2/3 ">
            <div class="flex flex-col">
              <label>Created at</label>
              <input
                class="bg-userColor w-2/3 lg:w-1/2 mt-2 rounded p-1 cursor-pointer"
                type="date"
                name="specificTask.createdTime"
                [(ngModel)]="specificTask.createdTime"
                disabled
              />
            </div>
          </div>
          <div *ngIf="creationSuccessful">
            <span class="brightness-200 text-green-700 animate-pulse">
              <span class="hue-rotate-180  brightness-75">✔️</span> Erfolgreich
              bearbeitet
            </span>
          </div>
        </div>

        <div class="border-b-2 border-userColor mt-1 mb-1"></div>

        <div class="p-5">
          <div class="flex flex-col lg:flex-row justify-between">
            <div class="flex flex-col items-start w-2/3 mr-5 mb-2">
              <div
                class="text-red-800 text-sm"
                *ngIf="
                  form.controls['specificTask.title']?.invalid &&
                  clickedCreateButton
                "
              >
                Title required
              </div>
              <div class="flex lg:flex-row flex-col w-full mb-5">
                <label class="ml-1 mr-2">Title:</label>
                <input
                  class="border-userColor border-b-2 p-2 w-full lg:w-full rounded bg-transparent"
                  type="text"
                  name="specificTask.title"
                  [(ngModel)]="specificTask.title"
                  required
                />
              </div>
            </div>
          </div>

          <div class="flex flex-col justify-around mt-10">
            <div>Select Priority:</div>
            <div class="flex justify-around w-full">
              <div
                (click)="selectPriority('high')"
                [ngClass]="
                  specificTask.priority === 'high'
                    ? 'bg-red-700 border-red-700'
                    : ''
                "
                class="p-1 rounded w-20 text-center font-bold cursor-pointer  border-neutral-400 hover:border-b-red-700 border-b-2 transition-all"
              >
                High
              </div>
              <div
                (click)="selectPriority('medium')"
                [ngClass]="
                  specificTask.priority === 'medium'
                    ? 'bg-orange-500  border-orange-500'
                    : ''
                "
                class="p-1 rounded w-20 text-center font-bold cursor-pointer  border-neutral-400 hover:border-b-orange-400 border-b-2 transition-all"
              >
                Medium
              </div>
              <div
                (click)="selectPriority('low')"
                [ngClass]="
                  specificTask.priority === 'low'
                    ? 'bg-green-500  border-green-500'
                    : ''
                "
                class="p-1 rounded w-20 text-center font-bold cursor-pointer  border-neutral-400 hover:border-b-green-400 border-b-2 transition-all"
              >
                Low
              </div>
            </div>
          </div>
        </div>

        <div class=" flex sm:flex-row flex-col justify-between">
          <div class="w-full h-64 mr-5 sm:ml-5 mb-7 mt-5 sm:mt-0">
            <label>Description:</label>
            <textarea
              name=""
              class="w-full h-full mt-2 rounded border-userColor border-2 bg-transparent resize-none"
              name="specificTask.description"
              [(ngModel)]="specificTask.description"
            ></textarea>
          </div>
        </div>
        <div class="flex justify-center p-5">
          <button
            (click)="updateTask(form.invalid)"
            class="text-center p-2 bg-userColor w-2/3 rounded hover:opacity-80 transition-all"
          >
            Update Task
          </button>
          <button
            (click)="deleteTask()"
            class="ml-5 text-center p-2 bg-userColor w-2/3 rounded hover:opacity-80 transition-all"
          >
            Delete Task
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [
    `
      .full_height {
        min-height: calc(100vh - 94px);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditTaskComponent implements OnInit {
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  http = inject(HttpClient);
  cdRef = inject(ChangeDetectorRef);

  timestamp = new Timestamp();

  clickedCreateButton = false;
  creationSuccessful = false;
  error?: string;
  specificTask!: any;
  specificTaskId!: any;

  async ngOnInit() {
    this.specificTaskId = this.activatedRoute.snapshot.paramMap.get('id');
    try {
      this.specificTask = await this.loadTask();
      this.cdRef.detectChanges();
      console.log(this.specificTask);
    } catch {
      this.error = 'ERROR 404';
    }
  }

  async loadTask() {
    const url = environment.baseUrl + '/tasks/' + this.specificTaskId;
    return await lastValueFrom(this.http.get(url));
  }

  selectPriority(priority: string) {
    this.specificTask.priority = priority;
  }

  async updateTask(invalidForm: boolean | null) {
    this.creationSuccessful = true;
    const url =
      environment.baseUrl + '/tasks/' + parseInt(this.specificTaskId) + '/';

    await lastValueFrom(this.http.put(url, this.specificTask));

    setTimeout(() => {
      this.router.navigate(['app/board']);
    }, 2000);
  }

  async deleteTask() {
    const url =
      environment.baseUrl + '/tasks/' + parseInt(this.specificTaskId) + '/';

    await lastValueFrom(this.http.delete(url));

    this.router.navigate(['app/board']);
  }
}
