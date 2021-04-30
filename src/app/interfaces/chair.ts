import { ChairRequest } from './chair-request';

export interface Chair {
  _id: number;
  desk_id: number;
  occupied: boolean;
  occupiedDays: Date[];
  requests: ChairRequest[];

  posX: number;
  posY: number;
}
