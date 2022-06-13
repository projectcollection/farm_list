import { Timestamp } from "firebase/firestore";

export type Farm = {
    name: string;
    displayName: string;
    phone?: string;
    openHours?: string;
    image?: string;
    created_at?: Timestamp;
    updated_at?: Timestamp;
};
