import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { QRCodeModule } from 'angularx-qrcode';
import { CouponsService } from 'src/app/services/coupons.service';

@Component({
  selector: 'app-card-coupon',
  templateUrl: './card-coupon.page.html',
  styleUrls: ['./card-coupon.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, QRCodeModule],
})
export class CardCouponPage implements OnInit {
  qrCode: string;

  constructor(
    private readonly _couponsService: CouponsService,
    private readonly _router: Router
  ) {}

  ngOnInit(): void {
    this.qrCode = JSON.stringify(this._couponsService.getActiveCoupons());
  }

  back(): void {
    this._router.navigate(['coupons']);
  }
}
