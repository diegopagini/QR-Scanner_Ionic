import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CouponsService } from 'src/app/services/coupons.service';

@Component({
  selector: 'app-card-coupon',
  templateUrl: './card-coupon.page.html',
  styleUrls: ['./card-coupon.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class CardCouponPage implements OnInit {
  constructor(private readonly _couponsService: CouponsService) {}

  ngOnInit(): void {
    console.log(this._couponsService.getActiveCoupons());
  }
}
