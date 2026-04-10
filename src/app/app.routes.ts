import { Routes } from '@angular/router';
import { PageMain } from '@/app/pages/page-main/page-main';

export const routes: Routes = [
  {
    path: '',
    component: PageMain,
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/enter-leave/enter-leave').then((c) => c.EnterLeave),
      },
      {
        path: 'layout',
        loadComponent: () => import('./pages/layout-page/layout-page').then((c) => c.LayoutPage),
      },
    ],
  },
];
