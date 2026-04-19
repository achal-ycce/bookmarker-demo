import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-toast-message',
  imports: [],
  templateUrl: './toast-message.html',
  styleUrl: './toast-message.scss',
})

export class ToastMessage {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: string) {}
}
