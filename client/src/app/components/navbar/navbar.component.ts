import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private userService:UserService){}
  
  loggedIn!:boolean;
  ngOnInit(){
    const jwtToken=localStorage.getItem('token');
      if(jwtToken){
        this.loggedIn=true;
      }else{
        this.loggedIn=false;
      }
      this.ngOnInit();
  }
  
  logOut(){
    this.userService.logOut();
    this.ngOnInit()
  }
}
