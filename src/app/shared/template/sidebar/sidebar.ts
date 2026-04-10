import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SIDEBAR_STATE } from '@/app/shared/template/sidebar/sidebar-state';
import { AngularLogo } from '@/app/shared/angular-logo/angular-logo';
import { NavigationStart, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LucideCombine, LucideLayoutTemplate, LucidePanelLeftClose } from '@lucide/angular';
import { FormsModule } from '@angular/forms';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-sidebar',
  imports: [
    AngularLogo,
    RouterLink,
    RouterLinkActive,
    LucideLayoutTemplate,
    LucideCombine,
    FormsModule,
    LucidePanelLeftClose,
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sidebar {
  expand = inject(SIDEBAR_STATE);

  router = inject(Router);

  constructor() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationStart),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.expand.set(false));
  }
}
