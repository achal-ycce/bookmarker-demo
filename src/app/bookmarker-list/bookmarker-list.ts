import { Component, inject, OnInit } from '@angular/core';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Bookmarker } from '../models/bookmarker';
import { selectBookmarkers } from '../states/selector/app.selector';
import { Router, RouterOutlet} from '@angular/router';
import  Fuse from 'fuse.js';
import { SearchBookmarker } from '../services/search-bookmarker' 
import { GetBookmarkerService } from '../services/get-bookmarker-service'
export interface Section {
  name: string;
  updated: Date;
}

@Component({
  selector: 'app-bookmarker-list',
  imports: [MatListModule, MatIconModule, MatDividerModule, RouterOutlet],
  templateUrl: './bookmarker-list.html',
  styleUrl: './bookmarker-list.scss',
})
export class BookmarkerList implements OnInit {
  private store = inject(Store);
  private route = inject(Router);
  private bookmarkers$: Observable<Bookmarker[]> = this.store.select(selectBookmarkers);
  private bookmarkersList?: any;
  private searchService = inject(SearchBookmarker);
  private getBookmarkerService = inject(GetBookmarkerService);
  private today = new Date();
  public filteredBookmarkersList?: any;
  
  constructor() {
    const allBookmarkers = this.getBookmarkerService.getBookmarker().subscribe((response) => {
      console.log("response ", response);
    });
  }

  ngOnInit(): void {
    this.bookmarkers$.subscribe((bookmarker)=> {
      this.bookmarkersList = bookmarker;
    });
    let fuse = new Fuse(this.bookmarkersList, { keys: ['name', 'url'], threshold: 0.3 });
    this.searchService.searchTerm$.subscribe(term => {
      if (term) {
        this.filteredBookmarkersList = fuse.search(term).map(result => result.item);
      } 
      else {
        this.filteredBookmarkersList = [...this.bookmarkersList];
      }
    }); 
  }

  editBookmarker(id: Number) {
    this.route.navigate(['/new-bookmarker', id]);
  }

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

}
