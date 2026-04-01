import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  input,
  signal,
  viewChild
} from '@angular/core';
import { Tabs } from './tabs';
import { Tab } from '@/app/shared/code-example-tabs/tabs/tab/index';
import { Highlight } from '@/app/shared/highlight/highlight';
import { AnimeLeave } from 'ngx-animejs';
import { animate } from 'animejs';

enum TabType {
  HTML,
  TS,
  SCSS,
}

const tabTypeToLabel: Record<TabType, string> = {
  [TabType.HTML]: 'HTML',
  [TabType.TS]: 'Typescript',
  [TabType.SCSS]: 'SCSS',
};

@Component({
  selector: 'app-code-example',
  imports: [CommonModule, Tabs, Tab, Highlight, AnimeLeave],
  templateUrl: './code-example.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeExample {
  showCode = signal(false);
  activeTab = signal(0);

  html = input<string | null | {}>('');
  ts = input<string | null | {}>('');
  scss = input<string | null | {}>('');

  tabs = computed(() => {
    const output: TabType[] = [];

    if (this.html()) output.push(TabType.HTML);
    if (this.ts()) output.push(TabType.TS);
    if (this.scss()) output.push(TabType.SCSS);
    return output;
  });

  tabType = TabType;
  tabTypeToLabel = tabTypeToLabel;

  tabContent = viewChild<ElementRef<HTMLElement>>('tabContent');
  codeHeight = signal<string | number>(0);

  constructor() {
    effect(() => {
      const ref = this.tabContent();
      const height = ref?.nativeElement?.offsetHeight || 0;
      this.codeHeight.set(height);
    });

    effect(() => {
      this.activeTab();
      const tabContent = this.tabContent()?.nativeElement;

      if (tabContent) {
        setTimeout(() => {
          const height = Array.from(tabContent.children).reduce((height, child) => {
            if (child instanceof HTMLElement) {
              height += child.scrollHeight;
            }
            return height;
          }, 0);

          animate(tabContent, {
            height,
            ease: 'inOutSine',
            duration: 400,
          });
        });
      }
    });
  }
}
