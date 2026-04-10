import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CodeExample } from '@/app/shared/code-example-tabs';
import { AsyncPipe, NgComponentOutlet } from '@angular/common';

@Component({
  selector: 'app-enter-leave',
  imports: [CodeExample, AsyncPipe, NgComponentOutlet],
  templateUrl: './enter-leave.html',
  styleUrl: './enter-leave.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnterLeave {
  animeLogo = {
    component: import('./anime-logo/anime-logo').then((c) => c.AnimeLogo),
    HTML: import('./anime-logo/anime-logo.html?raw', { with: { loader: 'text' } }).then(
      (m) => m.default,
    ),
    TS: import('./anime-logo/anime-logo.ts?raw', { with: { loader: 'text' } }).then(
      (m) => m.default,
    ),
  };
}
