import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../user.service';
import {ModalDirective} from 'angular-bootstrap-md';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {

  failedLogin : boolean = false;
  usernameToDisplay: string = "";
  @ViewChild('loginAsAdminModal') loginAdminModal: ModalDirective;
  @ViewChild('loginAsUserModal') loginUserModal: ModalDirective;
  @ViewChild('registerModal') registerModal: ModalDirective;
  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
  }

  isLoggedInAsAdmin(): boolean {
    return sessionStorage.getItem("loggedIn") == "admin";
  }
  isLoggedInAsUser(): boolean {
    return sessionStorage.getItem("loggedIn") == "user";
  }
  logInAdmin(username: any, password: any): void {
    window.console.log(username.value,password.value);
    this.userService.logInAsAdmin(username.value,password.value).subscribe(
      res => {
        sessionStorage.setItem("loggedIn","admin");
        this.closeAdminModal();
        this.router.navigate(["/admin-upload"]);
      },
      err => {
        this.failedLogin = true;
      }
    );
  }
  logInUser(username: any, password: any): void {
    window.console.log(username.value,password.value);
    this.userService.logInAsUser(username.value,password.value).subscribe(
      res => {
        sessionStorage.setItem("loggedIn","user");
        this.usernameToDisplay = username.value;
        this.closeUserModal();
      },
      err => {
        this.failedLogin = true;
      }
    );
  }
  registerUser(username: any, password: any): void {
    window.console.log(username.value,password.value);
    this.userService.registerUser(username.value,password.value).subscribe(
      res => {
        this.closeRegisterModal();
      },
      err => {
        this.failedLogin = true;
      }
    );
  }
  closeRegisterModal () {
    this.registerModal.hide();
    this.failedLogin = false;
  }
  closeAdminModal () {
    this.loginAdminModal.hide();
    this.failedLogin = false;
  }
  closeUserModal () {
    this.loginUserModal.hide();
    this.failedLogin = false;
  }
  logout(): void {
    sessionStorage.setItem("loggedIn", "");
    location.reload();
    location.pathname = "";
  }
}
