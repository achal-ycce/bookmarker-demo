import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslatePipe } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Bookmarker } from '../models/bookmarker';
import { selectBookmarkers } from '../states/selector/app.selector';
import { Router, RouterOutlet } from '@angular/router';
import Fuse from 'fuse.js';
import { SearchBookmarker } from '../services/search-bookmarker';
import { loadItems } from '../states/action/app.action';
import { DateUtils } from '../services/dateUtils';

@Component({
  selector: 'app-bookmarker-list',
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    RouterOutlet,
    TranslatePipe,
    MatTooltipModule,
  ],
  templateUrl: './bookmarker-list.html',
  styleUrl: './bookmarker-list.scss',
})
export class BookmarkerList implements OnInit {
  private store = inject(Store);
  private route = inject(Router);
  private bookmarkers$?: Observable<Bookmarker[]>;
  private bookmarkersList?: any;
  public searchService = inject(SearchBookmarker);
  public filteredBookmarkersList?: any;
  public searchText?: string;
  public dateUtils = inject(DateUtils);
  public isTodayLabel: boolean = false;
  public isYesterdayLabel: boolean = false;
  public isOlderLabel: boolean = false;

  loading$?: Observable<boolean>;
  configureSearch() {
    let fuse = new Fuse(this.bookmarkersList, {
      keys: ['name', 'url'],
      threshold: 0.3,
    });
    this.searchService.searchTerm$.subscribe((term) => {
      if (term) {
        this.searchText = term;
        this.filteredBookmarkersList = fuse
          .search(term)
          .map((result) => result.item);
      } else {
        this.filteredBookmarkersList = [...this.bookmarkersList];
      }
      this.hideShowLabel(this.filteredBookmarkersList);
    });
  }

  hideShowLabel(filteredBookmarkersList: Bookmarker[]) {
    this.isTodayLabel = false;

    filteredBookmarkersList.forEach((bookmarker) => {
      if (this.dateUtils.isToday(bookmarker.datetime) && !this.isTodayLabel) {
        this.isTodayLabel = true;
      }
      if (
        this.dateUtils.isYesterday(bookmarker.datetime) &&
        !this.isYesterdayLabel
      ) {
        this.isYesterdayLabel = true;
      }
      if (this.dateUtils.isOlder(bookmarker.datetime) && !this.isOlderLabel) {
        this.isOlderLabel = true;
      }
    });
  }

  ngOnInit(): void {
    this.loading$ = this.store.select((state) => state.bookmarkers.loading);
    this.bookmarkers$ = this.store.select(selectBookmarkers);
    this.bookmarkers$.subscribe((bookmarker) => {
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
}
