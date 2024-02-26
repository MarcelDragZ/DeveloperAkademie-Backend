import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'scrumapp-environments-db',
  standalone: true,
  imports: [CommonModule],
  template: `<p>environments-db works!</p>`,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnvironmentsDbComponent {}
