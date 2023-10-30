import { Injectable, signal } from '@angular/core';

import { Coupon } from '../models/cupon.model';

@Injectable({
  providedIn: 'root',
})
export class CouponsService {
  private readonly activeCoupons = signal<Coupon[]>([]);

  async getCoupons(): Promise<Coupon[]> {
    try {
      const response = await fetch('./assets/data/data.json');
      return (await response.json()) as Coupon[];
    } catch (error) {
      return Promise.reject(error);
    }
  }

  getActiveCoupons(): Coupon[] {
    return this.activeCoupons();
  }

  setActiveCoupons(coupons: Coupon[]): void {
    this.activeCoupons.set(coupons);
  }
}
