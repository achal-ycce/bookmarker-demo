import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Bookmarker } from '../models/bookmarker';
import { selectBookmarkers } from '../states/selector/app.selector';
import { Router, RouterOutlet} from '@angular/router';
import  Fuse from 'fuse.js';
import { SearchBookmarker } from '../services/search-bookmarker' 
import { GetBookmarkerService } from '../services/get-bookmarker-service'
import { loadItems } from '../states/action/app.action';
export interface Section {
  name: string;
  updated: Date;
}

@Component({
  selector: 'app-bookmarker-list',
  imports: [CommonModule, MatListModule, MatIconModule, MatProgressSpinnerModule, MatDividerModule, RouterOutlet],
  templateUrl: './bookmarker-list.html',
  styleUrl: './bookmarker-list.scss',
})
export class BookmarkerList implements OnInit {
  private store = inject(Store);
  private route = inject(Router);
  private bookmarkers$?: Observable<Bookmarker[]> ;
  private bookmarkersList?: any;
  private searchService = inject(SearchBookmarker);
  private getBookmarkerService = inject(GetBookmarkerService);
  private today = new Date();
  public filteredBookmarkersList?: any;
  loading$?: Observable<boolean>;
  configureSearch() {
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

  ngOnInit(): void {
    this.loading$ = this.store.select(state => state.bookmarkers.loading);
    this.bookmarkers$ = this.store.select(selectBookmarkers);
    this.bookmarkers$.subscribe((bookmarker)=> {
      this.bookmarkersList = bookmarker;
      if (this.bookmarkersList.length === 0) {
        this.store.dispatch(loadItems());
      }
      this.configureSearch();
    });    
  }

  editBookmarker(id: Number) {
    this.route.navigate(['/new-bookmarker', id]);
  }

  private dateFormat(date: Date) {
    return new Date(date);
  }

  isToday(date: Date): boolean {
    const formattedDate = this.dateFormat(date);
    return (formattedDate.getDate() === this.dateFormat(this.today).getDate() &&
            formattedDate.getMonth() === this.dateFormat(this.today).getMonth() &&
            formattedDate.getFullYear() === this.dateFormat(this.today).getFullYear()
          );
  }

  isYesterday(date: Date): boolean {
    const yesterday = new Date(this.today);
    yesterday.setDate(this.today.getDate() - 1);
    const formattedDate = this.dateFormat(yesterday);
    return (formattedDate.getDate() === this.dateFormat(this.today).getDate() &&
            formattedDate.getMonth() === this.dateFormat(this.today).getMonth() &&
            formattedDate.getFullYear() === this.dateFormat(this.today).getFullYear()
          );
  }

  isOlder(date: Date): boolean {
    const yesterday = new Date(this.today);
    yesterday.setDate(this.today.getDate() - 1);
    return date < yesterday;
  }

}
