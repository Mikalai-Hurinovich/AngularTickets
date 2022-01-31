import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieComponent } from '../pages/home/components/movie/movie.component';

describe('MovieComponent', () => {
  let component: MovieComponent;
  let fixture: ComponentFixture<MovieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovieComponent],
    });

    fixture = TestBed.createComponent(MovieComponent);
    component = fixture.componentInstance;
  });

  describe('initial display', () => {
    it('should have correct data', () => {
      component.movie = {
        id: 4,
        preview: 'preview',
        title: 'title',
        genre: 'genre',
        description: 'description',
      };
      fixture.detectChanges();
      expect(component.movie?.title).toBe('title');
      expect(component.movie?.preview).toBe('preview');
      expect(component.movie?.genre).toBe('genre');
      expect(component.movie?.description).toBe('description');
    });
  });
});
