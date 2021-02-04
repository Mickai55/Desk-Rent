export interface Chair {
    _id: number;
    occupied: boolean;
    occupied_by: string;
    arrival_date: Date;
    depart_date: Date;
    // time ???
}
