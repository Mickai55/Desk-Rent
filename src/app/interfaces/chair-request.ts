export interface ChairRequest {
  // days requested for 1 specific chair 
  _id: number;
  user: string;
  desk_id: number;
  chair_id: number;
  days: Array<any>;
}
