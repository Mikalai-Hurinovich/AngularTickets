import { IHall, IHallSeat } from './hall';
import { ICinema } from '../pages/home/components/cinema/cinema.model';
import { IMovie } from '../core/services/movies.service';

export interface ISession {
  id: number;
  startsAt: string;
  endsAt: string;
  movie: IMovie;
  cinema: ICinema;
  hall: IHall;
  bookedSeats: IHallSeat[],
  availableSeats: IHallSeat[]
}

export interface IGroupedSessions {
  date: string;
  sessions: ISession[]
}
