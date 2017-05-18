import { Injectable, Inject } from '@angular/core';
import { BackendUri } from './settings.service';
import { Http } from '@angular/http';
import { User } from '../models/user';
import { Observable } from 'rxjs/Observable';
import { Post } from '../models/post';

export class UserService {

    //    useValue: "http://localhost:3004"

    constructor(
        private _http: Http) { }

    likeUser(user: User) {
        console.log(user.postLike);
        // return this._http
        //     .put(`http://localhost3004/post/${user.postLike[0]}/author/postLike`, user.postLike)
        //     .map(response => User.fromJson(response.json()));
    }
}