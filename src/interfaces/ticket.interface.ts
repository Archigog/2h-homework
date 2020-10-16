import {User} from "./user.interface";

export interface Ticket {
    id: number;
    completed: boolean;
    assignee: User;
    description: string;
}
