import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DateUtils {
  private today = new Date();
  private dateFormat(date: Date) {
    return new Date(date);
  }
  isToday(date: Date): boolean {
    const formattedDate = this.dateFormat(date);
    return (
      formattedDate.getDate() === this.dateFormat(this.today).getDate() &&
      formattedDate.getMonth() === this.dateFormat(this.today).getMonth() &&
      formattedDate.getFullYear() === this.dateFormat(this.today).getFullYear()
    );
  }

  isYesterday(date: Date): boolean {
    const yesterday = new Date(this.today);
    yesterday.setDate(this.today.getDate() - 1);
    const yesterdayFormattedDate = this.dateFormat(yesterday);
    const formattedDate = this.dateFormat(date);
    return (
      yesterdayFormattedDate.getDate() ===
        this.dateFormat(formattedDate).getDate() &&
      yesterdayFormattedDate.getMonth() ===
        this.dateFormat(formattedDate).getMonth() &&
      yesterdayFormattedDate.getFullYear() ===
        this.dateFormat(formattedDate).getFullYear()
    );
  }

  isOlder(date: Date): boolean {
    const yesterday = new Date(this.today);
    yesterday.setDate(this.today.getDate() - 1);
    return date < yesterday;
  }
}
