import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Coupon } from 'src/app/models/cupon.model';
import { CouponsService } from 'src/app/services/coupons.service';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.page.html',
  styleUrls: ['./coupons.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class CouponsPage implements OnInit {
  coupons: Coupon[];
  couponsActive = false;
  showCamera = false;

  constructor(
    private readonly _couponsService: CouponsService,
    private readonly _router: Router
  ) {}

  ngOnInit(): void {
    this._couponsService.getCoupons().then((value: Coupon[]) => {
      this.coupons = value;
    });
  }

  changeActive(coupon: Coupon): void {
    coupon.active = !coupon.active;
    this.couponsActive = this.coupons.some((el: Coupon) => el.active);
  }

  goToCard(): void {
    this._couponsService.setActiveCoupons(
      this.coupons.filter((el: Coupon) => el.active)
    );
    this._router.navigate(['card-coupon']);
  }

  startCamera(): void {
    this.showCamera = true;
  }

  hideCamera(): void {
    this.showCamera = false;
  }
}
