import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common'
import { ActivatedRoute, Router, RouterOutlet, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatError } from '@angular/material/form-field';
import { Store } from '@ngrx/store';
import { Observable, switchMap } from 'rxjs';
import { Bookmarker } from '../models/bookmarker';
import { selectBookmarkerById, selectBookmarkers } from '../states/selector/app.selector';
//import { BookmarkerReducer } from '../states/reducer/app.reducer';
import { add, edit } from '../states/action/app.action';
@Component({
  selector: 'app-new-bookmarker',
  imports: [ ReactiveFormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatError],
  templateUrl: './new-bookmarker.html',
  styleUrl: './new-bookmarker.scss',
})
export class NewBookmarker implements OnInit {

  private route = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private store = inject(Store);
  private isEditMode:Boolean = false;
  form: FormGroup;
  
  selectedBookmarkerId?: Number;
  //bookmarker$?: Observable<Bookmarker | undefined>;
  bookmarkers$?: Observable<Bookmarker[]>;
  bookmarker?: Bookmarker;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({

      datetime: [''],
      bookmarkerId: [''],
      name: ['', [Validators.required, Validators.minLength(3)]],
      url: ['', [
        Validators.required,
        Validators.pattern(/^https:\/\/.+$/)
      ]]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Form Data:', this.form.value);
      const newBookmarker: Bookmarker = this.form.value;
      if (this.isEditMode) {
        this.store.dispatch(edit({bookmarker : newBookmarker}));
      } else {
        this.store.dispatch(add({bookmarker : newBookmarker}));
      } 
      this.route.navigate(['/bookmarker-list']);
    }
  }

  ngOnInit() {
    this.activatedRoute.paramMap.pipe(
      switchMap(params => {
        const selectedBookmarkerId = Number(params.get('id'));
        if (selectedBookmarkerId) {
          this.isEditMode = true;
          return this.store.select(selectBookmarkerById(selectedBookmarkerId));
        } else {
          const bookmarkers$ = this.store.select(selectBookmarkers);
          bookmarkers$.subscribe((bookmarker)=> {
            this.form.controls['bookmarkerId'].setValue(bookmarker.length+1);
          });
          this.form.controls['datetime'].setValue(new Date());
          return [];
        }
      })
    ).subscribe(bookmarker => {
      if (bookmarker) {
        this.form.patchValue(bookmarker);
        console.log('selected bookmarker', bookmarker);
      }
    });
  }

}
