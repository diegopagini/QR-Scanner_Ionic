import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Coupon } from 'src/app/models/cupon.model';
import { CouponsService } from 'src/app/services/coupons.service';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.page.html',
  styleUrls: ['./coupons.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class CouponsPage implements OnInit {
  coupons: Coupon[];

  constructor(private readonly _couponsService: CouponsService) {}

  ngOnInit(): void {
    this._couponsService.getCoupons().then((value) => {
      this.coupons = value;
    });
  }

  changeActive(coupon: Coupon): void {
    coupon.active = !coupon.active;
  }
}
