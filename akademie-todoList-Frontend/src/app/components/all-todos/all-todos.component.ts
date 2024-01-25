import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-all-todos',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './all-todos.component.html',
  styleUrl: './all-todos.component.scss',
})
export class AllTodosComponent implements OnInit {
  http = inject(HttpClient);
  todos: any = [];

  async ngOnInit() {
    this.todos = await this.loadTodos();
    console.log(this.todos);
  }
  loadTodos() {
    const url = environment.baseUrl + '/todos/';
    return lastValueFrom(this.http.get(url));
  }
}
