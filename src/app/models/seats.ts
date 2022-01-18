export interface ISeat {
  id: number;
  seatNumber: number;
  seatStatus: 'AVAILABLE' | 'BOOKED' | 'DRAFT';
  type?: string;
  price?: number;
}

export interface IRows {
  id: number;
  rowNumber: number;
  seats: ISeat[];
}

export interface ISeats {
  id: number;
  rows: IRows[]
  hallId: number;
}
