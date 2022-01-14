import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ICinema } from '../../../home/components/cinema/cinema.model';
import { CinemaService } from '../../../../core/services/cinema.service';

@Component({
  selector: 'app-add-cinema',
  templateUrl: './add-cinema.component.html',
  styleUrls: ['./add-cinema.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AddCinemaComponent implements OnInit, OnDestroy {
  cinemaForm: FormGroup;

  subscription: Subscription;

  mouseoverLogin: boolean;

  constructor(private readonly fb: FormBuilder,
    private readonly toastr: ToastrService,
    private readonly cinemaService: CinemaService,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.cinemaForm = this.fb.group({
      preview: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  handleValidateFormControl(formControl: AbstractControl): boolean {
    return (formControl.touched || this.mouseoverLogin) && formControl.invalid;
  }

  handleAddCinema() {
    const formValue = this.cinemaForm.value;
    const data: ICinema = {
      id: 4,
      title: formValue.title,
      preview: formValue.preview,
      address: formValue.address,
      description: formValue.description,
      halls: 1,
    };

    this.subscription = this.cinemaService.addCinema(data).subscribe({
      next: () => {
        this.toastr.success('Cinema was successfully added');
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
