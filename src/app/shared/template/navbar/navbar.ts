import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ThemeToggler } from '@/app/shared/template/navbar/theme-toggler/theme-toggler';
import { SIDEBAR_STATE } from '@/app/shared/template/sidebar/sidebar-state';
import { LucideMenu } from '@lucide/angular';

@Component({
  selector: 'app-navbar',
  imports: [ThemeToggler, LucideMenu],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Navbar {
  sidebar = inject(SIDEBAR_STATE);
}
