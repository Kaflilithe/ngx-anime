import {
  DOCUMENT,
  effect,
  inject,
  InjectionToken,
  PLATFORM_ID,
  signal,
  type WritableSignal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { WA_LOCAL_STORAGE, WA_WINDOW } from '@ng-web-apis/common';
import { filter, fromEvent } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

export const DARK_MODE_DEFAULT_KEY = 'DARK_MODE_DEFAULT_KEY';
export const DARK_MODE_KEY = new InjectionToken(ngDevMode ? 'DARK_MODE_KEY' : '', {
  factory: () => DARK_MODE_DEFAULT_KEY,
});

export const DARK_MODE = new InjectionToken<WritableSignal<boolean>>(ngDevMode ? 'DARK_MODE' : '', {
  factory: () => {
    const platformId = inject(PLATFORM_ID);
    const doc = inject(DOCUMENT);
    const isBrowser = isPlatformBrowser(platformId);
    let automatic = true;
    const storage = isBrowser ? inject(WA_LOCAL_STORAGE) : null;
    const media = isBrowser ? inject(WA_WINDOW)?.matchMedia('(prefers-color-scheme: dark)') : null;
    const key = inject(DARK_MODE_KEY);
    const saved = storage?.getItem(key);
    const result = signal(saved ? JSON.parse(saved) : (media?.matches ?? false));

    if (isBrowser && media) {
      fromEvent(media, 'change')
        .pipe(
          filter(() => !storage?.getItem(key)),
          takeUntilDestroyed(),
        )
        .subscribe(() => {
          automatic = true;
          result.set(media.matches);
        });
    }

    effect(() => {
      const value = String(result());

      if (isBrowser) {
        doc.documentElement.dataset['theme'] = result() ? 'dark' : 'light';
      }

      if (automatic) {
        automatic = false;
      } else {
        storage?.setItem(key, value);
      }
    });

    return result;
  },
});
