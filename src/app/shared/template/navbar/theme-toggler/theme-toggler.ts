import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DARK_MODE } from '@/app/core/tokens/dark-mode';

@Component({
  selector: 'app-theme-toggler',
  imports: [FormsModule],
  templateUrl: './theme-toggler.html',
  styleUrl: './theme-toggler.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeToggler {
  protected darkMode = inject(DARK_MODE);
}
