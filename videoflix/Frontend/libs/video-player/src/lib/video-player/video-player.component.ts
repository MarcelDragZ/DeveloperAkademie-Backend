import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '@videoflix/environments';
import { lastValueFrom } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'videoflix-video-player',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  template: `<div
    *ngIf="specificVideo"
    class="relative h-screen w-screen bg-black"
  >
    <button
      (click)="goBack()"
      class="absolute top-4 left-4 z-20 p-2 bg-neutral-800 text-white font-semibold rounded hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-opacity-50"
    >
      ← Zurück
    </button>

    <video
      #myVideo
      [ngClass]="specificVideo ? '' : 'hidden'"
      controls
      class="absolute top-0 left-0 w-full h-full object-cover z-10"
      autoplay
      loop
    >
      <source *ngIf="specificVideo" [src]="videoSource" type="video/mp4" />
      Ihr Browser unterstützt das Video-Tag nicht.
    </video>
    <select
      (change)="changeQuality($event)"
      class="absolute top-4 right-4 z-20 p-2 bg-neutral-800 text-white font-semibold rounded hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-opacity-50"
    >
      <option [value]="specificVideo.video_file">1080p</option>
      <option [value]="specificVideo.video_file_720p">720p</option>
      <option [value]="specificVideo.video_file_480p">480p</option>
    </select>
  </div>`,
  styles: [
    `
      .test {
        z-index: 5000 !important;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoPlayerComponent implements OnInit {
  location = inject(Location);
  @ViewChild('myVideo') myVideo!: ElementRef<HTMLVideoElement>;

  specificVideo: any;
  videoSource: string = '';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private cdRef: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    const routeId = this.route.snapshot.paramMap.get('id');
    const url = environment.baseUrl + '/videos/' + routeId + '/';
    this.specificVideo = await lastValueFrom(this.http.get(url));
    this.chooseVideoFormat();
    this.cdRef.detectChanges();
  }

  chooseVideoFormat(): void {
    if (window.innerWidth > 1280) {
      this.videoSource = this.specificVideo.video_file;
    } else {
      this.videoSource = this.specificVideo.video_file_720p;
    }
  }

  changeQuality(event: any) {
    const videoElement: HTMLVideoElement = this.myVideo.nativeElement;
    videoElement.src = event.target.value;
    videoElement.load();
    videoElement.play();
  }

  goBack() {
    this.location.back();
  }
}
