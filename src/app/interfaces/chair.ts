import { RentRequest } from './rent-request';

export interface Chair {
  _id: number;
  occupied: boolean;
  occupiedDays: Date[];
  requests: RentRequest[];

  posX: number;
  posY: number;
}
