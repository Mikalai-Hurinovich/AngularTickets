import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IMovie, MoviesService } from '../../../../core/services/movies.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddMovieComponent implements OnInit, OnDestroy {
  movieForm: FormGroup;

  subscription: Subscription;

  mouseoverLogin: boolean;

  constructor(
    private readonly fb: FormBuilder,
    private readonly toastr: ToastrService,
    private readonly movieService: MoviesService,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.movieForm = this.fb.group({
      preview: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      genre: new FormControl('', [Validators.required]),
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  handleValidateFormControl(formControl: AbstractControl): boolean {
    return (formControl.touched || this.mouseoverLogin) && formControl.invalid;
  }

  handleAddMovie() {
    const formValue = this.movieForm.value;
    const data: IMovie = {
      id: 4,
      title: formValue.title,
      preview: formValue.preview,
      genre: formValue.genre,
      description: formValue.description,
    };

    this.subscription = this.movieService.createMovie(data).subscribe({
      next: () => {
        this.toastr.success('Movie was successfully added');
        this.router.navigate(['/admin']);
      },
      error: () => {
        this.toastr.error('Something went wrong');
        this.cdr.markForCheck();
      },
    });
  }

  handleCancelButtonClick(): void {
    this.router.navigate(['/admin']);
  }
}
