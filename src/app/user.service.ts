import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }
  basePath: string = "http://localhost/PWeMAG/api/";
  userPath: string = "users.php";

  logInAsAdmin(username: string, password: string): Observable<any> {

    var logIn = {
      "username" : username,
      "password" : password,
      "type"  : "login",
      "role" : "admin"
    };

    return this.http.post(this.basePath + this.userPath,logIn);
  }

  logInAsUser(username: string, password: string): Observable<any> {
    var logIn = {
      "username" : username,
      "password" : password,
      "type"  : "login",
      "role" : "user"
    };

    return this.http.post(this.basePath + this.userPath,logIn);
  }
  registerUser(username: string, password: string): Observable<any> {
    var logIn = {
      "username" : username,
      "password" : password,
      "type"  : "register",
      "role" : "user"
    };

    return this.http.post(this.basePath + this.userPath,logIn);
  }
}
