import { Component, inject, OnInit } from '@angular/core';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Bookmarker } from '../models/bookmarker';
import { selectBookmarkers } from '../states/selector/app.selector';
import { AsyncPipe } from '@angular/common';
import { Router, RouterOutlet, RouterLink } from '@angular/router';

export interface Section {
  name: string;
  updated: Date;
}

@Component({
  selector: 'app-bookmarker-list',
  imports: [MatListModule, MatIconModule, MatDividerModule, AsyncPipe, RouterOutlet, RouterLink],
  templateUrl: './bookmarker-list.html',
  styleUrl: './bookmarker-list.scss',
})
export class BookmarkerList implements OnInit {
  private store = inject(Store);
  private route = inject(Router);
  bookmarkers$: Observable<Bookmarker[]> = this.store.select(selectBookmarkers);

  ngOnInit(): void {
      console.log("bookmarkers$ ", this.bookmarkers$);    
  }

  editBookmarker(id: Number) {
    console.log("editBookmarker ", id);  
    try {
      this.route.navigate(['/new-bookmarker', id]);
    } catch (e: any) {
      console.log("Error: ",Error);
    }

  }

  ////////// date filter ////////////
  today = new Date();

  private normalize(date: Date): string {
    return date.toDateString();
  }

  isToday(date: Date): boolean {
    return this.normalize(date) === this.normalize(this.today);
  }

  isYesterday(date: Date): boolean {
    const yesterday = new Date(this.today);
    yesterday.setDate(this.today.getDate() - 1);
    return this.normalize(date) === this.normalize(yesterday);
  }

  isOlder(date: Date): boolean {
    const yesterday = new Date(this.today);
    yesterday.setDate(this.today.getDate() - 1);
    return date < yesterday;
  }
  ////////// date filter ////////////
}
