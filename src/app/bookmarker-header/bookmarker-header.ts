import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SearchBookmarker } from '../services/search-bookmarker' 

@Component({
  selector: 'app-bookmarker-header',
  imports: [MatToolbarModule, MatIconModule,  MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule],
  templateUrl: './bookmarker-header.html',
  styleUrl: './bookmarker-header.scss',
})
export class BookmarkerHeader {
  private route = inject(Router);
  private searchService = inject(SearchBookmarker);
  searchBookmarker: string = '';

  addBookmarker() {
    this.route.navigate(['/new-bookmarker']);
  }

  onSearchBookmarker() {
    console.log("onSearchBookmarker....", this.searchBookmarker);
    this.searchService.setSearchTerm(this.searchBookmarker);
  }

}
