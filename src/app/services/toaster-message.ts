import { Injectable, inject } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ToastMessage} from '../toast-message/toast-message'

@Injectable({
  providedIn: 'root',
})
export class ToasterMessage {
  
  private _snackBar = inject(MatSnackBar);

  openSnackBar(notificationMsg: string) {
    this._snackBar.openFromComponent(ToastMessage, {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      data: notificationMsg
    });
  }

}
