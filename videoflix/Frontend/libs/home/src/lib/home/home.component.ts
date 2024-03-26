import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { lastValueFrom } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { PreviewComponent } from '@videoflix/preview';
import { VideoListComponent } from '@videoflix/video-list';
import { environment } from '@videoflix/environments';

@Component({
  selector: 'videoflix-home',
  standalone: true,
  template: `
    <div class="overflow-hidden">
      <videoflix-preview [randomVideo]="randomVideo" />
    </div>
    <div class="-mt-36  overflow-hidden">
      <videoflix-video-list [videoList]="videoList" />
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    HttpClientModule,
    PreviewComponent,
    VideoListComponent,
  ],
})
export class HomeComponent implements OnInit {
  http = inject(HttpClient);
  cdRef: ChangeDetectorRef = inject(ChangeDetectorRef);

  videoList!: any;
  randomVideo!: any;

  async ngOnInit() {
    const url = environment.baseUrl + '/videos/';
    this.videoList = await lastValueFrom(this.http.get(url));
    this.randomVideo = this.returnRandomVideo();

    this.cdRef.detectChanges();
  }

  returnRandomVideo() {
    if (!Array.isArray(this.videoList) || this.videoList.length === 0) {
      return null;
    }
    const randomIndex = Math.floor(Math.random() * this.videoList.length);
    return this.videoList[randomIndex];
  }
}
