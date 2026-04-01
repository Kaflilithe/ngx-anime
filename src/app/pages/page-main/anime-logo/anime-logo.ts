import { ChangeDetectionStrategy, Component, effect, ElementRef, linkedSignal, signal, viewChild } from '@angular/core';
import { animate, spring } from 'animejs';
import { AnimeEnter, AnimeLeave } from 'ngx-animejs';

@Component({
  selector: 'app-anime-logo',
  imports: [AnimeEnter, AnimeLeave],
  templateUrl: './anime-logo.html',
  styleUrl: './anime-logo.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeLogo {
  readonly show = signal(true);
  readonly el = viewChild<ElementRef<HTMLElement>>('animeEl');
  readonly rotations = linkedSignal<boolean, number>({
    source: this.show,
    computation: (isShow, previous) => (!isShow ? 0 : (previous?.value ?? 0)),
  });

  readonly loopAnime = {
    scale: [
      { to: 1.25, ease: 'inOut(3)', duration: 200 },
      { to: 1, ease: spring({ bounce: 0.7 }) },
    ],
    loop: true,
    loopDelay: 250,
  };

  constructor() {
    effect(() => {
      const rotations = this.rotations();
      const el = this.el()?.nativeElement;

      if (el && rotations) {
        animate(el, {
          rotate: rotations * 360,
          ease: 'out(4)',
          duration: 1500,
        });
      }
    });
  }
}
