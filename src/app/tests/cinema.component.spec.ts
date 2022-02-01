import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CinemaComponent } from '../pages/home/components/cinema/cinema.component';

describe('CinemaComponent', () => {
  let component: CinemaComponent;
  let fixture: ComponentFixture<CinemaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CinemaComponent],
    });

    fixture = TestBed.createComponent(CinemaComponent);
    component = fixture.componentInstance;
  });

  describe('initial display', () => {
    it('should have correct data', () => {
      component.cinema = {
        id: 4,
        preview: 'preview',
        title: 'title',
        address: 'address',
        halls: 1,
        description: 'description',
      };
      fixture.detectChanges();
      expect(component.cinema?.title).toBe('title');
      expect(component.cinema?.preview).toBe('preview');
      expect(component.cinema?.address).toBe('address');
      expect(component.cinema?.description).toBe('description');
    });
  });
});
