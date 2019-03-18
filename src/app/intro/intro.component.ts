import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {

  constructor() { }

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
  }
  logout(): void {
    sessionStorage.setItem("loggenIn", "");
    location.reload();
  }
}
