import { AnimationCallbackEvent, ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AnimeEnter, AnimeLeave } from '../../projects/ngx-anime/src/public-api';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AnimeEnter, AnimeLeave],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  onLeave(event: AnimationCallbackEvent) {
    console.log({ event });
  }

  dialog = signal(false);
  show = signal(true);

  onComplete = () => console.log('COMPLETE ANIMATION SUKA!');
}
