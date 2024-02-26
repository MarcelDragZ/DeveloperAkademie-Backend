import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

import { environment } from '@scrumapp/environments';
@Component({
  selector: 'scrumapp-board-board',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  template: `
    <div class="h-screen">
      <h1
        class="p-5 pb-2 pt-10
text-userColor text-2xl"
      >
        Board
      </h1>

      <div class="border-b-2 border-userColor p-5">
        <button
          (click)="changeRoute('add-task')"
          class="bg-userColor p-1 text-white rounded"
        >
          Add Task
        </button>
      </div>

      <!-- Drag and Drop Start -->
      <div
        class="flex flex-col lg:flex-row items-start justify-between p-2 h-2/3"
      >
        <div
          class="lg:w-1/4 w-3/4 h-full p-1 text-white rounded-xl m-10"
          (drop)="dropItem('open')"
          (dragover)="allowDrop($event)"
        >
          <div>
            <h2 class="text-xl font-bold border-b-2 p-2">Open</h2>
          </div>

          <div>
            <!-- TASK -->
            <ng-container *ngFor="let task of tasks">
              <div
                *ngIf="task.status === 'open'"
                (click)="changeRoute('edit-task', task.id)"
                draggable="true"
                (dragstart)="dragStart(task.id)"
                class="flex justify-between p-5 w-full bg-neutral-700 rounded-xl mt-5 h-36 cursor-grab"
              >
                <div>
                  <div>{{ task.title }}</div>
                  <div>{{ task.description }}</div>
                </div>
                <div>
                  <div>{{ task.creatorId }}</div>
                  <div>{{ task.createdTime }}</div>
                  <div
                    [ngClass]="
                      task.priority === 'high'
                        ? 'bg-red-700 border-red-700'
                        : task.priority === 'medium'
                        ? 'bg-orange-500'
                        : task.priority === 'low'
                        ? 'bg-green-500'
                        : ''
                    "
                    class="text-center rounded mt-4"
                  >
                    {{ task.priority }}
                  </div>
                </div>
              </div>
            </ng-container>
            <!-- TASK -->
          </div>
        </div>

        <div
          class="lg:w-1/4 w-3/4 h-full p-1 text-white rounded-xl m-10"
          (drop)="dropItem('progress')"
          (dragover)="allowDrop($event)"
        >
          <h2 class="text-xl font-bold border-b-2 p-2">In Progress</h2>

          <div>
            <!-- TASK -->
            <ng-container *ngFor="let task of tasks">
              <div
                *ngIf="task.status === 'progress'"
                (click)="changeRoute('edit-task', task.id)"
                draggable="true"
                (dragstart)="dragStart(task.id)"
                class="flex justify-between p-5 w-full bg-neutral-700 rounded-xl mt-5 h-36 cursor-grab"
              >
                <div>
                  <div>{{ task.title }}</div>
                  <div>{{ task.description }}</div>
                </div>
                <div>
                  <div>{{ task.creatorId }}</div>
                  <div>{{ task.createdTime }}</div>
                  <div
                    [ngClass]="
                      task.priority === 'high'
                        ? 'bg-red-700 border-red-700'
                        : task.priority === 'medium'
                        ? 'bg-orange-500'
                        : task.priority === 'low'
                        ? 'bg-green-500'
                        : ''
                    "
                    class="text-center rounded mt-4"
                  >
                    {{ task.priority }}
                  </div>
                </div>
              </div>
            </ng-container>
            <!-- TASK -->
          </div>
        </div>

        <div
          class="lg:w-1/4 w-3/4 h-full p-1 text-white  rounded-xl m-10"
          (drop)="dropItem('closed')"
          (dragover)="allowDrop($event)"
        >
          <div class="stage-header">
            <h2 class="text-xl font-bold border-b-2 p-2">Closed</h2>
          </div>

          <div
            class="flex flex-col justify-start items-center overflow-y-scroll h-92"
          >
            <!-- TASK -->
            <ng-container *ngFor="let task of tasks">
              <div
                *ngIf="task.status === 'closed'"
                (click)="changeRoute('edit-task', task.id)"
                draggable="true"
                (dragstart)="dragStart(task.id)"
                class="flex justify-between p-5 w-full bg-neutral-700 rounded-xl mt-5 h-36 cursor-grab"
              >
                <div>
                  <div>{{ task.title }}</div>
                  <div>{{ task.description }}</div>
                </div>
                <div>
                  <div>{{ task.creatorId }}</div>
                  <div>{{ task.createdTime }}</div>
                  <div
                    [ngClass]="
                      task.priority === 'high'
                        ? 'bg-red-700 border-red-700'
                        : task.priority === 'medium'
                        ? 'bg-orange-500'
                        : task.priority === 'low'
                        ? 'bg-green-500'
                        : ''
                    "
                    class="text-center rounded mt-4"
                  >
                    {{ task.priority }}
                  </div>
                </div>
              </div>
            </ng-container>
            <!-- TASK -->
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .h-92 {
        height: 92%;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardBoardComponent implements OnInit {
  router = inject(Router);
  http = inject(HttpClient);
  cdRef = inject(ChangeDetectorRef);
  error?: string;
  tasks: any = [];

  lastDraggedTaskId?: any;

  async ngOnInit() {
    try {
      this.tasks = await this.loadTasks();
      this.cdRef.detectChanges();
    } catch {
      this.error = 'ERROR 404';
    }
  }

  async loadTasks() {
    const url = environment.baseUrl + '/tasks/';
    return await lastValueFrom(this.http.get(url));
  }

  async updateTask(status: string) {
    const url =
      environment.baseUrl + '/tasks/' + parseInt(this.lastDraggedTaskId) + '/';

    await lastValueFrom(this.http.put(url, { status: status }));
  }

  allowDrop(event: DragEvent) {
    event.preventDefault();
  }

  dragStart(id: string) {
    this.lastDraggedTaskId = parseInt(id);
  }

  async dropItem(status: string) {
    await this.updateTask(status);
    this.tasks = await this.loadTasks();
    this.cdRef.detectChanges();
  }

  changeRoute(route: string, taskId?: number) {
    if (taskId) {
      this.router.navigate(['app/' + route + '/' + taskId]);
    } else {
      this.router.navigate(['app/' + route]);
    }
  }
}
