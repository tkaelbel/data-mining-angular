import { Injectable } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { MatSpinner } from '@angular/material/progress-spinner';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  private spinnerTopRef = this.cdkSpinnerCreate();
  private componentPortal:ComponentPortal<MatSpinner> | undefined = undefined;

  constructor(private overlay: Overlay) {
  }

  private cdkSpinnerCreate() {
    return this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'dark-backdrop',
      positionStrategy: this.overlay.position()
        .global()
        .centerHorizontally()
        .centerVertically()
    })
  }

  public showSpinner() {
    if(this.componentPortal === undefined){
      this.componentPortal = new ComponentPortal(MatSpinner);
      this.spinnerTopRef.attach(this.componentPortal);
    }
  }

  public stopSpinner() {
    this.spinnerTopRef.detach();
  }
}
