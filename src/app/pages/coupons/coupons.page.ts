import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  BarcodeScanner,
  CheckPermissionResult,
  ScanResult,
} from '@capacitor-community/barcode-scanner';
import { AlertController, IonicModule } from '@ionic/angular';
import { Coupon } from 'src/app/models/cupon.model';
import { CouponsService } from 'src/app/services/coupons.service';
import { ToastService } from 'src/app/services/toast.service';

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
    private readonly _alertController: AlertController,
    private readonly _couponsService: CouponsService,
    private readonly _router: Router,
    private readonly _toastService: ToastService
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

  async startCamera(): Promise<void> {
    const permission: CheckPermissionResult =
      await BarcodeScanner.checkPermission({ force: true });

    if (permission.granted) {
      this.showCamera = true;
      const result: ScanResult = await BarcodeScanner.startScan();

      if (result.hasContent) {
        try {
          const coupon: Coupon = JSON.parse(result.content);

          if (this.isCouponValid(coupon)) {
            this._toastService.presentToast({
              message: 'QR escaneado correctamente',
            });
            this.coupons.push(coupon);
          } else this._toastService.presentToast({ message: 'QR error' });
        } catch (error) {
          this._toastService.presentToast({ message: 'QR error' });
        }
      }

      this.hideCamera();
    } else {
      const alert: HTMLIonAlertElement = await this._alertController.create({
        message: 'Esta app necesita la camara para funcionar',
      });

      await alert.present();
    }
  }

  async hideCamera(): Promise<void> {
    this.showCamera = false;
    BarcodeScanner.stopScan();
  }

  private isCouponValid(coupon: Coupon): boolean {
    return coupon &&
      coupon.id_pdroduct &&
      coupon.img &&
      coupon.name &&
      coupon.discount
      ? true
      : false;
  }
}
