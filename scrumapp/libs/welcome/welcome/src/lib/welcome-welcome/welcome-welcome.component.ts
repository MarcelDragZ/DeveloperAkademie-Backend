import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'scrumapp-welcome-welcome',
  standalone: true,
  imports: [CommonModule],
  template: ` <div
    class="absolute right-0 bottom-0 left-0 top-0 welcome-animation-background"
  >
    <img
      class="absolute left-5 top-5 w-28 object-contain welcome-animation-logo img-color"
      src="/assets/logo_simply_black.png"
    />
  </div>`,

  styles: [
    `
      .welcome-animation-logo {
        animation: welcome-animation-logo 2s;
      }

      .welcome-animation-background {
        z-index: -1;
        animation: welcome-animation-background 2s;
      }

      @keyframes welcome-animation-logo {
        0%,
        45% {
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(4);
          filter: none;
        }
        100% {
          transform: scale(1);
        }
      }

      @keyframes welcome-animation-background {
        0%,
        45% {
          z-index: 1;
          background-color: rgb(var(--dynamic-color));
        }
        100% {
          z-index: 1;
          background-color: transparent;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomeWelcomeComponent {}
