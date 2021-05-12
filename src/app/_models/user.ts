export interface Role {
    id: number;
    name: string;
    createAt: Date;
    updateAt: Date;
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
