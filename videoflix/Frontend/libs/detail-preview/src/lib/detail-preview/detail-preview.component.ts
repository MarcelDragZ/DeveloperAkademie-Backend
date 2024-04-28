import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'videoflix-detail-preview',
  standalone: true,
  imports: [CommonModule],
  template: `<p>detail-preview works!</p>`,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailPreviewComponent {}
