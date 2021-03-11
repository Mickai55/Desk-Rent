import { RentRequest } from "./rent-request";

export interface Chair {
    _id: number;
    occupied: boolean;
    requests: RentRequest[];

    posX: number;
    posY: number;
}
