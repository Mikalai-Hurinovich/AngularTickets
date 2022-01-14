export interface IHallSeat {
  id: number;
  seatNumber: number;
  seatStatus: 'AVAILABLE' | 'BOOKED' | 'DRAFT';
  type?: string;
  price?: number;
}

export interface IHall {
  id: number;
  title: string;
  capacity: number;
  cinemaId: number;
}
