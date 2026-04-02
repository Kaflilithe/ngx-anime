import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { AnimeLayout } from 'ngx-animejs';

@Component({
  selector: 'app-layout',
  imports: [AnimeLayout],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Layout {
  className = signal('flex gap-2');
}
