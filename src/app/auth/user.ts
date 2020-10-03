import { Role } from './role.enum';

export class User {
    id: number;
    username: string;
    password: string;
    roles?: Role[];
    token?: string;
}

