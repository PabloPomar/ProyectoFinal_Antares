import { Component, OnInit } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import jwtDecode from "jwt-decode";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

  userName: string;
  userType: string;
  isLogged: boolean = false;
  public faUser = faUser;
  constructor() { }

  get checkToken() {
    let token = localStorage.getItem('loggedInUser');
    if(token == null)
      return false;
    const tokenInfo = this.getDecodedAccessToken(token);
    const expireDate = tokenInfo.exp;
    this.userName = tokenInfo.userName;
    this.userType = tokenInfo.userType;
    this.isLogged = true;
    return true;
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch(Error) {
      return null;
    }
  }

  public logOut(){
    localStorage.removeItem('loggedInUser');
    this.isLogged = false;
  }

}
