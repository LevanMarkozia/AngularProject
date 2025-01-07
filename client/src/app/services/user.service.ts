import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Job } from '../interfaces/job';
import { Schedule } from '../interfaces/schedule';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'https://localhost:44330/api/user';

  constructor(
    private http: HttpClient,
    private router: Router,
    ) { }

  decodeToken(token: string | null): any{
    if(!token) return null;
    try{
      return JSON.parse(atob(token.split('.')[1]));
    }catch(e){
      console.error('Error decoding JWT token', e);
      return null;
    }
   }

  isAdmin():boolean{
    const jwtToken = localStorage.getItem('token');
    const decodedToken = this.decodeToken(jwtToken);
    const role= decodedToken?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
    if(role === '1'){
      return true;
    }else{
      return false;
    }
  }

  getUserId(){
    const jwtToken = localStorage.getItem('token');
    const decodedToken = this.decodeToken(jwtToken);
    const uid= decodedToken?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]
    return uid;
  }

  getUsers(): Observable<any>{
    return this.http.get(`${this.apiUrl}/users`);
  }

  getJobOptions(): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.apiUrl}/jobs`);
  }

  getSchedules(): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(`${this.apiUrl}/dashboard`);
  }  

  registerUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  logInUser(userData: any): Observable<any>{
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<string>(`${this.apiUrl}/login`, userData, 
    {headers, responseType: 'text' as 'json'});
    
  }

  logOut(){
    localStorage.removeItem('token');
    this.router.navigate(['/login'])
  }

  goToWorker(){
    this.router.navigate(['/worker']);
  }

  goToAdmin(){
    this.router.navigate(['/admin']);
  }

  goToJobs(){
    this.router.navigate(['/jobs']);
  }
  
  goToLogin(){
    this.router.navigate(['/login']);
  }
  
  goToRegister(){
    this.router.navigate(['/register']);
  }

  goToSchedule(){
    this.router.navigate(['/schedule'])
  }
}
