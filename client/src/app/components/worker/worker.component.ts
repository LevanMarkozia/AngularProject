import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-worker',
  standalone: false,
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.css']
})
export class WorkerComponent {

  constructor(protected userService: UserService,private router:Router){}

  logOut(){
    this.userService.logOut();
  }

}
