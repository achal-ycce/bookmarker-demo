import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { BookmarkerHeader } from './bookmarker-header/bookmarker-header';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BookmarkerHeader, MatCardModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('bookmarker-demo');
}
