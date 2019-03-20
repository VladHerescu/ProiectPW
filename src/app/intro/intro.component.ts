import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  isLoggedInAsAdmin(): boolean {
    return sessionStorage.getItem("loggenIn") == "admin";
  }
  isLoggedInAsUser(): boolean {
    return sessionStorage.getItem("loggedIn") == "user";
  }
  logInAdmin(): void {
    sessionStorage.setItem("loggenIn","admin");
    this.router.navigate(["/admin-upload"]);
  }
  logout(): void {
    this.router.navigate([""]);
    sessionStorage.setItem("loggenIn", "");
    location.reload();
  }
}
