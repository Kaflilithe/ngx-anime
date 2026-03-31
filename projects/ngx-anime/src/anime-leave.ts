import { AnimationCallbackEvent, Directive, HostListener, input } from '@angular/core';
import { animate, Callback, JSAnimation } from 'animejs';
import { AnimeParams } from './tools';

@Directive({
  selector: '[animeLeave]',
})
export class AnimeLeave {
  readonly animeLeave = input<AnimeParams>();

  // FIXME: Angular shows an error with event: AnimationCallbackEvent
  @HostListener('animate.leave', ['$event'])
  onLeave(event: any) {
    try {
      const { target, animationComplete } = event as AnimationCallbackEvent;
      const params = this.animeLeave();

      const onComplete: Callback<JSAnimation> = (animation) => {
        params?.onComplete?.(animation);
        animationComplete();
      };

      animate(target, {
        ...params,
        onComplete,
      });
    } catch {
      if (event && typeof event === 'object') {
        if ('animationComplete' in event && typeof event.animationComplete === 'function') {
          event.animationComplete?.();
        }
      }
    }
  }
}
