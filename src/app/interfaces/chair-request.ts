export interface ChairRequest {
    // days requested for 1 specific chair 
    _id: number;
    desk_id: number;
    chair_id: number;
    status: string;
    days: string[];
}
