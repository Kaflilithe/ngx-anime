import { AnimationCallbackEvent, Directive, HostListener, input, OnDestroy } from '@angular/core';
import { animate, Callback, JSAnimation, utils } from 'animejs';
import { AnimeParams } from './tools';

@Directive({
  selector: '[animeLeave]',
})
export class AnimeLeave implements OnDestroy {
  private animationTarget?: Element;
  readonly animeLeave = input<AnimeParams>();

  // FIXME: Angular shows an error with event: AnimationCallbackEvent
  @HostListener('animate.leave', ['$event'])
  onLeave(event: any) {
    const { target, animationComplete } = event as AnimationCallbackEvent;
    this.animationTarget = target;
    const params = this.animeLeave();

    const onComplete: Callback<JSAnimation> = (animation) => {
      params?.onComplete?.(animation);
      animationComplete();
    };

    animate(target, {
      ...params,
      onComplete,
    });
  }

  ngOnDestroy(): void {
    if (this.animationTarget) {
      utils.remove(this.animationTarget);
    }
  }
}
