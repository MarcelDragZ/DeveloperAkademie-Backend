import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmallPreviewComponent } from '@videoflix/small-preview';

@Component({
  selector: 'videoflix-video-list',
  standalone: true,
  imports: [CommonModule, SmallPreviewComponent],
  template: `
    <div
      class="flex items-center text-neutral-200 tracking-widest text-xl font-bold w-96 pl-5 sm:pl-10 pt-6"
    >
      Video TV
    </div>

    <div
      class="flex justify-start flex-wrap gap-4 w-full text-white pl-5 sm:pl-10 mt-5"
    >
      <ng-container *ngFor="let video of videoList">
        <videoflix-small-preview class="z-10" [video]="video" />
      </ng-container>
    </div>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoListComponent {
  @Input() videoList: any;
}
