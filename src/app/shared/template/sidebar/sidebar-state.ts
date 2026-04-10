import { InjectionToken, signal, type WritableSignal } from '@angular/core';

export const SIDEBAR_STATE = new InjectionToken<WritableSignal<boolean>>('SIDEBAR_STATE', {
  factory: () => {
    return signal(false);
  },
});
