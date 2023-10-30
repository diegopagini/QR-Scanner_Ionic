import { Injectable } from '@angular/core';

import { Coupon } from '../models/cupon.model';

@Injectable({
  providedIn: 'root',
})
export class CouponsService {
  async getCoupons(): Promise<Coupon[]> {
    try {
      const response = await fetch('./assets/data/data.json');
      return (await response.json()) as Coupon[];
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
