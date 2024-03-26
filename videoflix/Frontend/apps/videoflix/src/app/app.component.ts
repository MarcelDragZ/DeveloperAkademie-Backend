import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MenuMenuComponent } from '@videoflix/menu/menu';
import { ImageFilter, Solver } from '@videoflix/environments/imagefilter';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '@videoflix/footer';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FooterComponent,
    MenuMenuComponent,
    RouterModule,
  ],
  selector: 'videoflix-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'videoflix';
  public router: Router = inject(Router);
  cdRef: ChangeDetectorRef = inject(ChangeDetectorRef);

  toggledMenu = true;
  screenWidth!: number;

  rgbColor: { r: number; g: number; b: number } = {
    r: 255,
    g: 0,
    b: 0,
  };

  constructor() {
    document.documentElement.style.setProperty(
      '--dynamic-color',
      `${this.rgbColor.r}, ${this.rgbColor.g}, ${this.rgbColor.b}`
    );
    this.imageColor(this.rgbColor.r, this.rgbColor.g, this.rgbColor.b);
  }

  ngOnInit(): void {
    this.checkScreenSize();
    window.addEventListener('resize', this.checkScreenSize.bind(this));
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.checkScreenSize.bind(this));
  }

  getRgbColor(hexColor: string) {
    if (hexColor === '') {
      return;
    } else {
      this.rgbColor.r = parseInt(hexColor.substr(1, 2), 16);
      this.rgbColor.g = parseInt(hexColor.substr(3, 2), 16);
      this.rgbColor.b = parseInt(hexColor.substr(5, 2), 16);
    }
  }

  imageColor(r: number, g: number, b: number) {
    const targetColor = new ImageFilter(r, g, b); // Ziel Farbe in RGB

    const solver = new Solver(targetColor);
    const solution = solver.solve();
    const cssFilter = solution.filter;

    if (solution.loss < 10) {
      const style = document.createElement('style');
      style.type = 'text/css';

      this.setDynamicCssVariabel(cssFilter);

      style.innerHTML = `.img-color { ${cssFilter} }`; //! works by creating child component classes
      document.head.appendChild(style);
    } else {
      this.imageColor(r, g, b);
      return;
    }
  }

  setDynamicCssVariabel(cssFilter: string) {
    const cleanedCss = cssFilter.replace('filter: ', '').replace(/;$/, '');
    document.documentElement.style.setProperty(
      '--dynamic-img-color',
      `${cleanedCss}`
    );
  }

  toggleMenu() {
    if (this.toggledMenu) {
      this.toggledMenu = false;
    } else {
      this.toggledMenu = true;
    }
  }

  private checkScreenSize() {
    if (window.innerWidth === this.screenWidth) {
      return;
    }
    this.toggledMenu = window.innerWidth > 768;
    this.screenWidth = window.innerWidth;

    this.cdRef.detectChanges();
  }

  get showMenu(): boolean {
    const url = this.router.url;
    return !(
      url === '/login' ||
      url === '/register' ||
      url.startsWith('/forgot-password') ||
      url.startsWith('/reset-password') ||
      url.startsWith('/play')
    );
  }
}
