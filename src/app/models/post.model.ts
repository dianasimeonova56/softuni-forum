import { Theme } from "./theme.model";
import { User } from "./user.model";

export interface Post {
    id: string;
    text: string;
    userId: User;
    created_at: Date;
}