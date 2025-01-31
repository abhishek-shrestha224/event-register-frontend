export type Event = {
    id: number;
    name: string;
    venue: string;
    eventDate: string;
};

export type User = {
    id: number;
    name: string;
    venue: string;
    eventDate: string;
};

export type RegistrationType =
    | "ORGANIZER"
    | "VOLUNTEER"
    | "SPEAKER"
    | "VIP"
    | "ATTENDEE";

export type Badge = {
    id: number;
    event: Event;
    userEmail: string;
    photoPath: string;
    registrationType: RegistrationType;
};
