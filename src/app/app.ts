import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import { StoreModule } from '@ngrx/store';

import { BookmarkerHeader } from './bookmarker-header/bookmarker-header';
import { BookmarkerList } from './bookmarker-list/bookmarker-list';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BookmarkerHeader, BookmarkerList, MatCardModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('bookmarker-demo');
}