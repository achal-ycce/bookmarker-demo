import { Component, inject } from '@angular/core';
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Bookmarker } from '../models/bookmarker';
@Component({
  selector: 'app-bookmarker-header',
  imports: [MatToolbarModule, MatIconModule],
  templateUrl: './bookmarker-header.html',
  styleUrl: './bookmarker-header.scss',
})
export class BookmarkerHeader {
  private store = inject(Store);
  private route = inject(Router);
  //bookmarkers$: Observable<Bookmarker[]> = this.store.select(selectBookmarkers);


  addBookmarker() {
    console.log("addBookmarker....");
          this.route.navigate(['/new-bookmarker']);
  }

}
