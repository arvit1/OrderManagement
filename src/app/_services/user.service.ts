import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {User} from './../_models';
import {AuthenticationService} from './authentication.service';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient,
                private authenticationService: AuthenticationService) {}

    getAll() {
        return this.http.get<User[]>(`http://5.189.155.214:3000/api/users`);
    }

    getById(id: number) {
        return this.http.get<User>(`http://5.189.155.214:3000/api/users/${id}`);
    }
}
