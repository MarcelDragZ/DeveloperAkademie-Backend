import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'videoflix-footer',
  standalone: true,
  imports: [CommonModule],
  template: `<div
    class="flex items-center justify-around text-white h-20 mt-10"
  >
    <div class="flex justify-between w-1/5">
      <a class="cursor-pointer" (click)="changeRoute('dataprotection')"
        >Datenschutz</a
      >
      <a class="cursor-pointer" (click)="changeRoute('imprint')">Impressum</a>
    </div>

    <div>© {{ year }} Videoflix</div>
  </div>`,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  router: Router = inject(Router);
  year: number;

  constructor() {
    this.year = new Date().getFullYear();
  }

  public changeRoute(pathName: string) {
    this.router.navigate([pathName]);
  }
}
