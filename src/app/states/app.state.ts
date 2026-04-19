import { Bookmarker } from "../models/bookmarker";
export interface AppState {
    bookmarkers: Bookmarker[],
    loading: Boolean;
}