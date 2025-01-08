import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import * as moment from 'moment';
import { Job } from 'src/app/interfaces/job';
import { Schedule } from 'src/app/interfaces/schedule';
import { ScheduleService } from 'src/app/services/schedule.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  faCheck = faCheck;
  faTrash = faTrash;

  weekDates: string[] = [];
  weekDays: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  jobs: Job[] = [];
  schedules: Schedule[] = [];
  requestForm!:FormGroup;
  shiftOptions=["Morning", "Evening"];
  datePipe:DatePipe=new DatePipe('en-US','+0400');

  organizedSchedules: { [date: string]: { [jobId: number]: { morning: Schedule[], night: Schedule[] } } } = {};
  currentWeek: moment.Moment = moment();

  ngOnInit(): void {
    this.generateCurrentWeek();
    this.getJobs();
    this.getSchedules();
    this.createForm();
  }

  constructor(
    private router: Router,
    private fb: FormBuilder,
    protected userService: UserService,
    private scheduleService: ScheduleService
  ){}

  generateCurrentWeek(): void {
    const startOfWeek = this.currentWeek.clone().startOf('isoWeek');
    const endOfWeek = this.currentWeek.clone().endOf('isoWeek');

    this.weekDates = [];
    for (let date = startOfWeek; date.isSameOrBefore(endOfWeek); date.add(1, 'day')) {
      this.weekDates.push(date.format('MMM D'));
    }
  }

  getJobs(): void{
    this.userService.getJobOptions().subscribe((jobs: Job[]) => {
      this.jobs = jobs;
    })
  }

  getSchedules(): void {
    this.userService.getSchedules().subscribe((schedules: Schedule[]) => {
      this.schedules = schedules;
      this.organizeSchedules();
    });
  }

  organizeSchedules(): void {
    this.organizedSchedules = {};

    this.schedules.forEach(schedule => {
      const date = moment(schedule.startTime).format('MMM D');
      const shiftType = (moment(schedule.startTime).hour() < 16 && moment(schedule.startTime).hour()>=8)? 'morning' : 'night';
      
      if (!this.organizedSchedules[date]) {
        this.organizedSchedules[date] = {};
      }

      if (!this.organizedSchedules[date][schedule.jobId]) {
        this.organizedSchedules[date][schedule.jobId] = { morning: [], night: [] };
      }

      if(this.userService.isAdmin()){
        this.organizedSchedules[date][schedule.jobId][shiftType].push(schedule);
      }else if(!this.userService.isAdmin()&&schedule.isApproved==true){
        this.organizedSchedules[date][schedule.jobId][shiftType].push(schedule);
      }
    });
  }

  goToNextWeek(): void {
    this.currentWeek.add(1, 'week');
    this.generateCurrentWeek();
    this.getSchedules();
  }

  goToPreviousWeek(): void {
    this.currentWeek.subtract(1, 'week');
    this.generateCurrentWeek();
    this.getSchedules();
  }

  goToCurrentWeek(): void {
    this.currentWeek = moment();
    this.generateCurrentWeek();
    this.getSchedules();
  }

  approveScheduleRequest(schedule:Schedule){
    if(!schedule.isApproved&&this.userService.isAdmin()){
      this.scheduleService.approveScheduleRequest(schedule).subscribe();
      location.reload()
    }
  }

  createForm(): void {
    this.requestForm = this.fb.group({
      requestDate: [null,Validators.required],
      shift: ["",Validators.required]
    });
  }

  requestSchedule(): void {
    if (this.requestForm.valid) {
      const requestDate=this.requestForm.get("requestDate")?.value;
      const shift=this.requestForm.get("shift")?.value;
      let startTime:Date=new Date(requestDate);
      let endTime:Date=new Date(requestDate);
      if(shift=="Morning"){
        startTime.setHours(8);
        startTime.setMinutes(0);
        startTime.setSeconds(0);
        startTime.setMilliseconds(0);
        endTime.setHours(16);
        endTime.setMinutes(0);
        endTime.setSeconds(0);
        endTime.setMilliseconds(0);
      }else if(shift=="Evening"){
        startTime.setHours(16);
        startTime.setMinutes(0);
        startTime.setSeconds(0);
        startTime.setMilliseconds(0);
        endTime.setHours(22);
        endTime.setMinutes(0);
        endTime.setSeconds(0);
        endTime.setMilliseconds(0);
      }
      const uid = this.userService.getUserId();
      let requestData={startTime:startTime,endTime:endTime,userId:uid};
      this.scheduleService.addScheduleRequest(requestData).subscribe({
        next: (response) => {
          console.log("Schedule requested: ",response);
          alert("Schedule requested successfully.");
        },
        error: (error) => {
          console.log('Request failed: ', error);
        }
      });
    }
  }

  deleteSchedule(scheduleId: any): void{
    this.scheduleService.deleteSchedule(scheduleId).subscribe({
      next: () => {
        console.log("Schedule Deleted");
        location.reload()
      },
      error: (err) => {
        console.error('Error deleting schedule: ', err);
      }
    })
  }
}
