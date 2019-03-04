import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }
    apiRoot = 'https://sheltered-hamlet-44592.herokuapp.com:8080'

    getAll() {
        return this.http.get<User[]>(this.apiRoot + '/users');
    }

    getById(id: number) {
        return this.http.get<User>(this.apiRoot + '/users' + '${id}');
    }
}
