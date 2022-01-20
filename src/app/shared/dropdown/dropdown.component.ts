import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { IMovie } from '../../core/services/movies.service';
import { ICinema } from '../../pages/home/components/cinema/cinema.model';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownComponent implements OnInit {
  @Input() searchDatabase: [{ movies: IMovie[] }, { cinemas: ICinema[] }];

  searchGroup: FormGroup;

  searchControl: FormControl;

  movies: Array<IMovie>;

  cinemas: Array<ICinema>;

  selectedItem: (IMovie | ICinema) | string;

  constructor(
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.searchGroup = new FormGroup({
      searchControl: new FormControl(),
    });

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.searchGroup.get('searchControl')?.valueChanges
      .subscribe(currentValue => {
        let searchTerm = currentValue.toLocaleLowerCase().trim();
        this.movies = this.searchDatabase[0].movies.filter((data: IMovie | ICinema) => data.title.toLocaleLowerCase().includes(searchTerm));
        this.cinemas = this.searchDatabase[1].cinemas.filter((data: IMovie | ICinema) => data.title.toLocaleLowerCase().includes(searchTerm));
        this.cdr.markForCheck();
      });
  }

  handleMovieClick(option: IMovie | ICinema) {
    this.selectedItem = option;
    this.router.navigate([`movie/${option.id}`]);
    this.searchGroup.controls['searchControl'].setValue('');
  }

  handleCinemaClick(option: IMovie | ICinema) {
    this.selectedItem = option;
    this.router.navigate([`cinema/${option.id}`]);
    this.searchGroup.controls['searchControl'].setValue('');
  }
}
