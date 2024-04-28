import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'videoflix-small-preview',
  standalone: true,
  imports: [CommonModule],
  template: `<div
    (mouseenter)="hover(true)"
    (mouseleave)="hover(false)"
    [style.backgroundImage]="'url(' + video.cover_file + ')'"
    class="flex flex-col justify-between overflow-hidden custom-width rounded-lg h-32 image-container hover:scale-x-1 hover:scale-y-110 hover:scale-x-110 transition-all"
  >
    <img class="w-10 p-2" src="/assets/v-logo.png" alt="" />

    <div
      *ngIf="advancedPreview"
      class="flex items-center justify-between p-5 w-full bg-neutral-900 h-1/2"
    >
      <button
        class="flex items-center justify-center rounded-full font-bold w-10 h-10 bg-neutral-300 text-black hover:bg-opacity-50"
        (click)="play(video)"
      >
        ⫸
      </button>
      <div>
        <span>{{ video.title }}</span>
      </div>
    </div>
  </div>`,
  styles: [
    `
      .image-container {
        background-image: url('/assets/preview-pic.png');
        background-size: cover;
        background-position: center;
      }

      .custom-width {
        width: calc(100vw - 76vw - 22px);
      }

      @media (max-width: 590px) {
        .custom-width {
          width: 80vw;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmallPreviewComponent {
  router: Router = inject(Router);

  @Input() video: any; // Erwäge die Verwendung eines spezifischeren Typs anstelle von `any`

  advancedPreview: boolean = false;

  hover(bool: boolean) {
    if (bool) {
      this.advancedPreview = true;
    } else {
      this.advancedPreview = false;
    }
  }

  play(video: any) {
    this.router.navigateByUrl(`play/${video.id}`);
  }
}
