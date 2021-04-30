import { ChairRequest } from './chair-request';
import { User } from './user';

export interface RentRequest {
  user: User;
  number: number;
  requests: ChairRequest[];
  status: string;
  timestamp: Date;
}
