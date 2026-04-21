import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatError } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatGridListModule } from '@angular/material/grid-list';
import { TranslatePipe } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { Observable, switchMap } from 'rxjs';
import { Bookmarker } from '../models/bookmarker';
import {
  selectBookmarkerById,
  selectBookmarkers,
} from '../states/selector/app.selector';
import { add, edit } from '../states/action/app.action';
import { ToasterMessage } from '../services/toaster-message';
@Component({
  selector: 'app-new-bookmarker',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatError,
    MatCardModule,
    MatChipsModule,
    MatProgressBarModule,
    MatGridListModule,
    TranslatePipe,
  ],
  templateUrl: './new-bookmarker.html',
  styleUrl: './new-bookmarker.scss',
})
export class NewBookmarker implements OnInit {
  private route = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private store = inject(Store);
  public isEditMode: Boolean = false;
  private toasterMessage = inject(ToasterMessage);
  form: FormGroup;

  selectedBookmarkerId?: Number;
  bookmarkers$?: Observable<Bookmarker[]>;
  bookmarker?: Bookmarker;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      datetime: [''],
      bookmarkerId: [''],
      name: ['', [Validators.required, Validators.minLength(3)]],
      url: ['', [Validators.required, Validators.pattern(/^https:\/\/.+$/)]],
    });
  }

  onCancel() {
    this.route.navigate(['/bookmarker-list']);
  }

  onSubmit() {
    if (this.form.valid) {
      const newBookmarker: Bookmarker = this.form.value;
      if (this.isEditMode) {
        this.store.dispatch(edit({ bookmarker: newBookmarker }));
        this.toasterMessage.openSnackBar('Bookmarker updated successfully.');
      } else {
        this.store.dispatch(add({ bookmarker: newBookmarker }));
        this.toasterMessage?.openSnackBar('Bookmarker added successfully.');
      }
      this.route.navigate(['/bookmarker-list']);
    }
  }

  disableSubmit() {
    return this.isEditMode
      ? (!this.form.dirty && this.form.pristine) || this.form.invalid
      : this.form.invalid;
  }

  ngOnInit() {
    this.activatedRoute.paramMap
      .pipe(
        switchMap((params) => {
          const selectedBookmarkerId = Number(params.get('id'));
          if (selectedBookmarkerId) {
            this.isEditMode = true;
            return this.store.select(
              selectBookmarkerById(selectedBookmarkerId),
            );
          } else {
            const bookmarkers$ = this.store.select(selectBookmarkers);
            bookmarkers$.subscribe((bookmarker) => {
              this.form.controls['bookmarkerId'].setValue(
                bookmarker.length + 1,
              );
            });
            this.form.controls['datetime'].setValue(new Date());
            return [];
          }
        }),
      )
      .subscribe((bookmarker) => {
        if (bookmarker) {
          this.form.patchValue(bookmarker);
        }
      });
  }
}
