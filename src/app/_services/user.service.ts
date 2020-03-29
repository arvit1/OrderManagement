import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from './../_models';
import { AuthenticationService } from './authentication.service';

@Injectable({ providedIn: 'root' })
export class UserService {
    header: any;
    constructor(private http: HttpClient,
                private authenticationService: AuthenticationService) {

        this.header = {
            headers: new HttpHeaders()
                .set('Authorization', `Bearer ${this.authenticationService.currentUserValue.token}`),
            withCrendentials: true
        };
    }

    getAll() {
        return this.http.get<User[]>(`http://5.189.155.214:3000/api/users`, { headers: this.header });
    }

    getById(id: number) {
        return this.http.get<User>(`http://5.189.155.214:3000/api/users/${id}`, { headers: this.header });
    }
}
