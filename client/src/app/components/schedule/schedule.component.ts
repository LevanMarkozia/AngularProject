import { DatePipe, formatDate, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import * as moment from 'moment';
import { Schedule } from 'src/app/interfaces/schedule';
import { ScheduleService } from 'src/app/services/schedule.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent {
  constructor(private scheduleService: ScheduleService){}
  dummyDate:Date=new Date;
  // currDate:Date=new Date;
  currDate=moment().startOf('week').isoWeekday(1);
  mon=moment().isoWeekday(1);
  tue=moment().isoWeekday(2);
  wed=moment().isoWeekday(3);
  thu=moment().isoWeekday(4);
  fri=moment().isoWeekday(5);
  sat=moment().isoWeekday(6);
  sun=moment().isoWeekday(7);
  currWeek=moment().isoWeek();
  // currWeekDates:String[]=[];
  allSchedules:Schedule[]=[];
  currWeekSchedules:Schedule[]=[];

  ngOnInit(){
    // this.currDate=new Date;
    // this.currDate.setHours(0);
    // this.currDate.setMinutes(0);
    // this.currDate.setSeconds(0);
    
    // this.getCurrWeek();
  }

  //Albat amis gaketebis rame uketesi metodi arsebobs magram ravi, rac aris aris
  //amas da previousWeek()s ubralod currentDate gadaaqvs erti kvirit win an ukan rom getCurrWeek()ma tavisi saqme gaaketos
  nextWeek(){
    // this.currDate=new Date(this.currDate.setDate(this.currDate.getDate()-this.currDate.getDay()+7));
    this.currDate=this.currDate.add(1,"week");
    this.mon=this.mon.add(1,'week');
    this.tue=this.tue.add(1,'week');
    this.wed=this.wed.add(1,'week');
    this.thu=this.thu.add(1,'week');
    this.fri=this.fri.add(1,'week');
    this.sat=this.sat.add(1,'week');
    this.sun=this.sun.add(1,'week');
    this.getCurrWeekSchedules();
  }

  previousWeek(){
    // this.currDate=new Date(this.currDate.setDate(this.currDate.getDate()-this.currDate.getDay()-7));
    this.currDate=this.currDate.subtract(1,"week");
    this.mon=this.mon.subtract(1,'week');
    this.tue=this.tue.subtract(1,'week');
    this.wed=this.wed.subtract(1,'week');
    this.thu=this.thu.subtract(1,'week');
    this.fri=this.fri.subtract(1,'week');
    this.sat=this.sat.subtract(1,'week');
    this.sun=this.sun.subtract(1,'week');
    this.getCurrWeekSchedules();
  }

  //Kviris dgheebis mixedvit tarighebis gamotvla, currWeek aris raw Date obieqti da currWeekDates aris string formatshi rata cxrilshi pirdapir chavsvat
  // getCurrWeek(){
  //   let weekStart=new Date(this.currDate.setDate(this.currDate.getDate()-(7-this.currDate.getDay())+1));
  //   //TODO mosashorebelia console.log
  //   console.log(this.currDate);
  //   this.currWeek.push(new Date(weekStart.setDate(weekStart.getDate())));
  //   this.currWeekDates.push(formatDate(weekStart,'mediumDate','en'));
  //   this.currWeek.push(new Date(weekStart.setDate(weekStart.getDate()+1)));
  //   this.currWeekDates.push(formatDate(weekStart,'mediumDate','en'));
  //   this.currWeek.push(new Date(weekStart.setDate(weekStart.getDate()+1)));
  //   this.currWeekDates.push(formatDate(weekStart,'mediumDate','en'));
  //   this.currWeek.push(new Date(weekStart.setDate(weekStart.getDate()+1)));
  //   this.currWeekDates.push(formatDate(weekStart,'mediumDate','en'));
  //   this.currWeek.push(new Date(weekStart.setDate(weekStart.getDate()+1)));
  //   this.currWeekDates.push(formatDate(weekStart,'mediumDate','en'));
  //   this.currWeek.push(new Date(weekStart.setDate(weekStart.getDate()+1)));
  //   this.currWeekDates.push(formatDate(weekStart,'mediumDate','en'));
  //   this.currWeek.push(new Date(weekStart.setDate(weekStart.getDate()+1)));
  //   this.currWeekDates.push(formatDate(weekStart,'mediumDate','en'));
  //   //TODO mosashorebelia console.log
  //   console.log(this.currWeek);
  //   console.log(this.currWeekDates);
  //   this.getCurrWeekSchedules();
  //   return this.currWeekDates;
  // }

  fetchAllSchedules(): void {
    this.scheduleService.getScheduleOptions().subscribe({
      next: (response) => {
        this.allSchedules = response;
        console.log("All schedules:", this.allSchedules);
      },
      error: (error) => {
        console.error('Error fetching schedules:', error);
      }
    });
  }
  
  getCurrWeekSchedules(){
    this.allSchedules.forEach(element => {
      if(this.currWeek===moment(element.startTime).isoWeek()){
        this.currWeekSchedules.push(element);
      }
    });
    console.log("Current week's schedules:", this.currWeekSchedules);
  }


}
