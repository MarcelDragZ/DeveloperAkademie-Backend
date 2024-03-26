import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'videoflix-preview',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div *ngIf="randomVideo" class="h-screen w-full image-container">
      <video
        class="absolute top-0 left-0 w-full h-full object-cover -z-10"
        autoplay
        loop
        [muted]="true"
        [src]="randomVideo.video_file"
        type="video/mp4"
      >
        Dein Browser unterstützt das Video-Tag nicht.
      </video>
      <div
        class="flex items-center text-neutral-200 tracking-widest text-lg font-bold pl-10 pt-52 z-10"
      >
        <img class="w-12 z-10" src="/assets/v-logo.png" />
        <span class="ml-2">SERIES</span>
      </div>
      <div
        class="flex items-center text-neutral-200 tracking-widest text-3xl font-bold pl-10 pt-10 z-10"
      >
        <span class="ml-2">{{ randomVideo.title }}</span>
      </div>
      <div
        class="flex items-center text-neutral-200 tracking-widest font-bold w-2/3 md:w-1/3 pl-10 pt-6 z-10"
      >
        <span class="ml-2 break-words">{{ randomVideo.description }}</span>
      </div>

      <div
        class="flex z-10 flex-col sm:flex-row items-start sm:items-center text-neutral-200 tracking-widest font-bold w-96 pl-10 pt-6 cursor-pointer"
      >
        <button
          (click)="play(randomVideo)"
          class="bg-white text-black rounded p-3 pl-6 pr-6 font-extrabold text-xl hover:bg-opacity-75"
        >
          ⫸ Play
        </button>
        <button
          class="bg-neutral-700 rounded p-3 pl-6 pr-6 font-extrabold text-xl mt-2 sm:mt-0 sm:ml-3 cursor-pointer hover:bg-opacity-75"
        >
          <span
            class="rounded-full text-center p-0.5 brightness-200 -ml-2 mr-3 border-2"
            >❕</span
          >More Info
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      .image-container {
        background-size: cover;
        background-position: center;
        box-shadow: inset 0px -45px 30px -20px rgba(23, 23, 23, 1);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreviewComponent {
  router: Router = inject(Router);

  @Input() randomVideo: any;

  play(video: any) {
    this.router.navigateByUrl(`play/${video.id}`);
  }
}
