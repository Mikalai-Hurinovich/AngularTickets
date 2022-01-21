import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { IMovie } from '../../core/services/movies.service';
import { ICinema } from '../../pages/home/components/cinema/cinema.model';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownComponent implements OnInit {
  @Input() searchDatabase: [{ movies: IMovie[] }, { cinemas: ICinema[] }];

  searchControl: FormControl = new FormControl();

  movies: Array<IMovie>;

  cinemas: Array<ICinema>;

  selectedItem: (IMovie | ICinema) | string;

  constructor(
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.searchControl.valueChanges
      .subscribe(currentValue => {
        let searchTerm = currentValue.toLocaleLowerCase().trim();
        this.movies = this.searchDatabase[0].movies.filter((data: IMovie) => data.title.toLocaleLowerCase().includes(searchTerm));
        this.cinemas = this.searchDatabase[1].cinemas.filter((data: ICinema) => data.title.toLocaleLowerCase().includes(searchTerm));
        this.cdr.markForCheck();
      });
  }

  handleMovieClick(option: IMovie) {
    this.selectedItem = option;
    this.router.navigate([`movie/${option.id}`]);
    this.searchControl.setValue('');
  }

  handleCinemaClick(option: ICinema) {
    this.selectedItem = option;
    this.router.navigate([`cinema/${option.id}`]);
    this.searchControl.setValue('');
  }
}
