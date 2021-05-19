import { ChairRequest } from './chair-request';
import { User } from './user';

export interface RentRequest {
    // rent request made by an user which can contain multiple days requested for a specific chair
    _id: number;
    user: User;
    requests: number[]; //ChairRequest[];
    status: string;
    timestamp: any; //string
}
