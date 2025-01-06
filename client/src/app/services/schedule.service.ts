import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Job } from '../interfaces/job';
import { Schedule } from '../interfaces/schedule';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
private apiUrl = 'https://localhost:44330/api/user';

  constructor(
    private http: HttpClient,
    private router: Router,
    ) { }
  getScheduleOptions(): Observable<Schedule[]> {
      return this.http.get<Schedule[]>(`${this.apiUrl}/dashboard`);
    }
}
