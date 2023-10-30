import { Routes } from '@angular/router';

import { CouponGuard } from './guards/coupon.guard';

export const routes: Routes = [
  {
    path: 'coupons',
    loadComponent: () =>
      import('./pages/coupons/coupons.page').then((m) => m.CouponsPage),
  },
  {
    path: 'card-coupon',
    loadComponent: () =>
      import('./pages/card-coupon/card-coupon.page').then(
        (m) => m.CardCouponPage
      ),
    canActivate: [CouponGuard],
  },
  {
    path: '',
    redirectTo: 'coupons',
    pathMatch: 'full',
  },
];
