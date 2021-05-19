import { Chair } from "./chair";

export interface Desk {
    _id: number;
    name: string;
    address: string;
    available_spaces: number;
    total_spaces: number;
    chairs: Chair[];
    dimension: string;
    images: any[];
    has_location: boolean;
    lat: number;
    lon: number;
}
