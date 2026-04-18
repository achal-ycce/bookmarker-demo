import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetBookmarkerService {
  private itemsUrl = 'api/bookmarkers';  // URL to web api

  constructor(private http: HttpClient) { }

  getBookmarker(): Observable<any[]> {
    return this.http.get<any[]>('api/bookmarkers/');
  }

  // Add more CRUD operations as needed
}