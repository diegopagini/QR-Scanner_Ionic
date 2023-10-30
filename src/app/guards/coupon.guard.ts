import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { Coupon } from '../models/cupon.model';
import { CouponsService } from '../services/coupons.service';

@Injectable({
  providedIn: 'root',
})
export class CouponGuard implements CanActivate {
  constructor(
    private readonly _couponsService: CouponsService,
    private readonly _router: Router
  ) {}

  canActivate(): boolean {
    const isAnyCouponActinve = this._couponsService
      .getActiveCoupons()
      .some((el: Coupon) => el.active);

    if (!isAnyCouponActinve) this._router.navigate(['coupons']);

    return isAnyCouponActinve;
  }
}
