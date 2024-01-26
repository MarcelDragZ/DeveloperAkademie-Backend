import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  http = inject(HttpClient);
  router = inject(Router);

  userName!: string;
  password!: string;

  async login() {
    try {
      let resp: any = await this.loginWithUserNameAndPasswort(
        this.userName,
        this.password
      );
      localStorage.setItem('token', resp.token);
      this.router.navigateByUrl('/todos');
    } catch (e) {
      console.error(e);
    }
  }

  loginWithUserNameAndPasswort(userName: string, password: string) {
    const url = environment.baseUrl + '/login/';
    const body = {
      username: userName,
      password: password,
    };
    return lastValueFrom(this.http.post(url, body));
  }
}
