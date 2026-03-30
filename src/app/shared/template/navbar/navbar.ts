import { AngularLogo } from '@/app/shared/angular-logo/angular-logo';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ThemeToggler } from '@/app/shared/template/navbar/theme-toggler/theme-toggler';

@Component({
  selector: 'app-navbar',
  imports: [AngularLogo, ThemeToggler],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Navbar {}
