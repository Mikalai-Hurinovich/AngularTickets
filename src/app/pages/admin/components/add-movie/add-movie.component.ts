import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IMovie, MoviesService } from '../../../../core/services/movies.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss'],
})
export class AddMovieComponent implements OnInit, OnDestroy {
  movieForm: FormGroup;

  subscription: Subscription;

  mouseoverLogin: boolean;

  private preview: FormControl;

  private title: FormControl;

  private description: FormControl;

  private genre: FormControl;

  constructor(private readonly fb: FormBuilder, private readonly toastr: ToastrService,
    private readonly movieService: MoviesService, private readonly router: Router) {
  }

  ngOnInit(): void {
    this.preview = new FormControl('', [Validators.required]);
    this.title = new FormControl('', [Validators.required]);
    this.description = new FormControl('', [Validators.required]);
    this.genre = new FormControl('', [Validators.required]);

    this.movieForm = this.fb.group({
      preview: this.preview,
      title: this.title,
      description: this.description,
      genre: this.genre,
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

    this.subscription = this.movieService.addMovie(data).subscribe({
      next: () => {
        this.toastr.success('Movie was successfully added');
        this.router.navigate(['/admin']);
      },
      error: () => {
        this.toastr.error('Something went wrong');
      },
    });
  }

  handleCancelButtonClick(): void {
    this.router.navigate(['/admin']);
  }
}
