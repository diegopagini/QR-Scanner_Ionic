import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

type Position = 'top' | 'middle' | 'bottom';

interface Toast {
  duration: number;
  message: string;
  position: Position;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private readonly _toastController: ToastController) {}

  async presentToast({
    duration = 5000,
    message,
    position = 'top',
  }: Toast): Promise<void> {
    const toast: HTMLIonToastElement = await this._toastController.create({
      duration,
      message,
      position,
    });

    await toast.present();
  }
}
