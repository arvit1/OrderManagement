export interface Role {
    id: number;
    name: string;
    create_at: Date;
    update_at: Date;
}

export class User {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    roles: Role[];
    token?: string;
}