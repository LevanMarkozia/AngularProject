import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import * as moment from 'moment';
import { Job } from 'src/app/interfaces/job';
import { Schedule } from 'src/app/interfaces/schedule';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  weekDates: string[] = [];
  weekDays: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  jobs: Job[] = [];
  schedules: Schedule[] = [];

  organizedSchedules: { [date: string]: { [jobId: number]: { morning: Schedule[], night: Schedule[] } } } = {};
  currentWeek: moment.Moment = moment();

  ngOnInit(): void {
    this.generateCurrentWeek();
    this.getJobs();
    this.getSchedules();
  }

  constructor(
    private userService: UserService
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
      const shiftType = moment(schedule.startTime).hour() < 12 ? 'morning' : 'night';
      
      if (!this.organizedSchedules[date]) {
        this.organizedSchedules[date] = {};
      }

      if (!this.organizedSchedules[date][schedule.jobId]) {
        this.organizedSchedules[date][schedule.jobId] = { morning: [], night: [] };
      }

      this.organizedSchedules[date][schedule.jobId][shiftType].push(schedule);
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
}
