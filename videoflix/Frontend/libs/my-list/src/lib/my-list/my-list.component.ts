import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoListComponent } from '@videoflix/video-list';

@Component({
  selector: 'videoflix-my-list',
  standalone: true,
  imports: [CommonModule, VideoListComponent],
  template: ` <div class="mt-14">
    <videoflix-video-list />
  </div>`,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyListComponent {}
