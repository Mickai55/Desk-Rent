import { RentRequest } from "./rent-request";

export interface User {
    _id: number;
    nickname: string;
    full_name: string;
    email: string;
    phone: string;
    location: string;
    website_link: string;

    requests_count: number;
}
