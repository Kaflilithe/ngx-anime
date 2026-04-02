import { CodeExample } from '@/app/shared/code-example-tabs/index';
import { Navbar } from '@/app/shared/template/navbar/navbar';
import { AsyncPipe, NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-page-main',
  imports: [Navbar, AsyncPipe, NgComponentOutlet, CodeExample],
  templateUrl: './page-main.html',
  styleUrl: './page-main.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageMain {
  animeLogo = {
    component: import('./anime-logo/anime-logo').then((c) => c.AnimeLogo),
    HTML: import('./anime-logo/anime-logo.html?raw', { with: { loader: 'text' } }).then(
      (m) => m.default,
    ),
    TS: import('./anime-logo/anime-logo.ts?raw', { with: { loader: 'text' } }).then(
      (m) => m.default,
    ),
  };

  animeLayout = {
    component: import('./layout/layout').then((c) => c.Layout),
    HTML: import('./layout/layout.html?raw', { with: { loader: 'text' } }).then((m) => m.default),
    TS: import('./layout/layout.ts?raw', { with: { loader: 'text' } }).then((m) => m.default),
  };
}
