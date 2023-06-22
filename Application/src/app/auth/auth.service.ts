import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, NullUser } from './auth.model';
import {tap} from "rxjs";
import {map} from "rxjs/operators";

interface LoginStatusResponse {
  loggedIn: boolean;
  user?: any; // Replace 'any' with the type of user if you know it.
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: User;

  constructor(private http: HttpClient) {
    this.currentUser = new NullUser();
  }

  googleLogin(): void {
    window.location.href = "http://localhost:3000/api/auth/google";
  }

  logout(): void {
    this.http.get('http://localhost:3000/api/auth/logout')
      .subscribe(() => {
        this.currentUser = new NullUser();
      });
  }

  checkLoginStatus() {
    return this.http.get<LoginStatusResponse>('http://localhost:3000/api/auth/check', {withCredentials: true})
      .pipe(
        map(response => {
          console.log(response)
          if(response.user){
            this.currentUser = response.user;
          }
          return response.loggedIn;
        })
      );
  }
}
