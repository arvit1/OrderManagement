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
  // tslint:disable-next-line:variable-name
    first_name: string;
  // tslint:disable-next-line:variable-name
    last_name: string;
    roles: Role[];
    token?: string;
}
