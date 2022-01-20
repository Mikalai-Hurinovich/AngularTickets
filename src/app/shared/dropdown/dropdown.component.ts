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
  @Input() listOfData: [{ movies: IMovie[] }, { cinemas: ICinema[] }];

  searchGroup: FormGroup;

  searchControl: FormControl;

  movies: Array<IMovie>;

  cinemas: Array<ICinema>;

  currentSearch: string = '';

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
  }


  handleOnInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.value) return;
    let searchTerm = input.value.toLocaleLowerCase().trim();
    this.movies = this.listOfData[0].movies.filter((data: IMovie | ICinema) => data.title.toLocaleLowerCase().includes(searchTerm));
    this.cinemas = this.listOfData[1].cinemas.filter((data: IMovie | ICinema) => data.title.toLocaleLowerCase().includes(searchTerm));
    this.cdr.markForCheck();
  }

  handleSelectClick(option: IMovie | ICinema, linkTo: string) {
    this.selectedItem = option;
    this.router.navigate([`${linkTo}/${option.id}`]);
    this.currentSearch = '';
    this.cdr.markForCheck();
  }
}
