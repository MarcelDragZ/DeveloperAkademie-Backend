import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { environment } from '@videoflix/environments';
import { lastValueFrom } from 'rxjs';
import { response } from 'express';
@Component({
  selector: 'videoflix-upload',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  template: `<div
    class="flex flex-col items-center justify-center pt-16 h-screen"
  >
    <div class="w-2/3 h-2/3">
      <div class="m-2 text-neutral-200 font-bold text-xl">Upload Video</div>
      <form
        class="flex flex-col justify-between w-full h-full bg-neutral-950 rounded-xl text-neutral-200"
      >
        <div
          *ngIf="videoIsUploading"
          class="flex items-center justify-center w-full h-full"
        >
          <span class="loader"></span>
        </div>
        <div
          [ngClass]="videoIsUploading ? 'hidden' : ''"
          class="flex flex-col md:flex-row w-full"
        >
          <div class="flex flex-col w-full md:w-1/2">
            <div class="flex flex-col w-full p-5">
              <label for="">Title</label>
              <div
                *ngIf="video.title === '' && clickedUploadButton"
                class="text-red-700"
              >
                Missing Title
              </div>
              <input
                [(ngModel)]="video.title"
                name="video.title"
                class="bg-neutral-800 rounded p-0.5"
                type="text"
              />
            </div>
            <div class="flex flex-col w-full p-5">
              <label for="">Description</label>
              <div
                *ngIf="video.description === '' && clickedUploadButton"
                class="text-red-700"
              >
                Missing Description
              </div>
              <textarea
                [(ngModel)]="video.description"
                name="video.description"
                rows="5"
                class="bg-neutral-800 rounded resize-none"
                type="text"
              ></textarea>
            </div>
          </div>
          <div class="flex flex-col w-full md:w-1/2">
            <div class="flex flex-col w-full p-5">
              <label for="">Cover</label>
              <div
                *ngIf="video.cover_file === '' && clickedUploadButton"
                class="text-red-700"
              >
                Missing Cover
              </div>
              <input
                (change)="onCoverFileSelected($event)"
                class="bg-neutral-800 rounded p-0.5"
                type="file"
              />
            </div>
            <div class="flex flex-col w-full p-5">
              <label for="">Video</label>
              <div
                *ngIf="video.video_file === '' && clickedUploadButton"
                class="text-red-700"
              >
                Missing Video
              </div>
              <input
                (change)="onVideoFileSelected($event)"
                class="bg-neutral-800 rounded p-0.5 "
                type="file"
              />
            </div>
          </div>
        </div>
        <div
          [ngClass]="videoIsUploading ? 'hidden' : ''"
          class="flex justify-center w-full"
        >
          <button
            (click)="uploadVideo()"
            class="bg-red-700 p-2 w-3/5 mb-5 text-neutral-200 font-bold rounded-xl hover:bg-opacity-80"
          >
            Upload Video
          </button>
        </div>
      </form>
    </div>
  </div>`,
  styles: [
    `
      input::file-selector-button {
        font-weight: bold;
        color: white;
        background-color: rgb(10, 10, 10);
        padding: 0.5em;
        border: thin solid rgb(23, 23, 23);
        border-radius: 3px;
      }

      .loader {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        display: inline-block;
        position: relative;
        border: 3px solid;
        border-color: #fff #fff transparent transparent;
        box-sizing: border-box;
        animation: rotation 1s linear infinite;
      }
      .loader::after,
      .loader::before {
        content: '';
        box-sizing: border-box;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        border: 3px solid;
        border-color: transparent transparent #ff3d00 #ff3d00;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        box-sizing: border-box;
        animation: rotationBack 0.5s linear infinite;
        transform-origin: center center;
      }
      .loader::before {
        width: 32px;
        height: 32px;
        border-color: #fff #fff transparent transparent;
        animation: rotation 1.5s linear infinite;
      }

      @keyframes rotation {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
      @keyframes rotationBack {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(-360deg);
        }
      }

      @media (max-width: 500px) {
        input::file-selector-button {
          font-weight: normal;
          font-size: 12px;
        }
        input {
          font-size: 12px;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadComponent {
  router: Router = inject(Router);
  http = inject(HttpClient);
  cdRef: ChangeDetectorRef = inject(ChangeDetectorRef);

  clickedUploadButton: boolean = false;

  videoIsUploading: boolean = false;
  videoUploadSuccessfull: boolean = false;
  videoUploadFailed: boolean = false;

  video: any = {
    title: '',
    description: '',
    cover_file: '',
    video_file: '',
  };

  onCoverFileSelected(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.video.cover_file = event.target.files[0];
    }
  }

  onVideoFileSelected(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.video.video_file = event.target.files[0];
    }
  }

  async uploadVideo() {
    const invalidForm = Object.values(this.video).every(
      (value) => value !== ''
    );
    this.checkFormField();
    if (!invalidForm) {
      console.log('Formular ist ungültig');
      return;
    }

    console.log('Formular ist gültig');

    this.videoIsUploading = true;
    const formData = new FormData();
    formData.append('title', this.video.title);
    formData.append('description', this.video.description);
    formData.append('cover_file', this.video.cover_file);
    formData.append('video_file', this.video.video_file);

    const url = environment.baseUrl + '/videos/';

    try {
      const response = await lastValueFrom(this.http.post(url, formData));
      this.videoIsUploading = false;
      this.videoUploadSuccessfull = true;
      if (response) {
        this.router.navigateByUrl('/home');
      }
    } catch (error) {
      console.error('Fehler beim Upload', error);
      this.videoUploadSuccessfull = false;
      this.videoUploadFailed = true;
    }
  }

  checkFormField() {
    this.clickedUploadButton = true;
    this.cdRef.detectChanges();
    setTimeout(() => {
      this.clickedUploadButton = false;
      this.cdRef.detectChanges();
    }, 2500);
  }
}
