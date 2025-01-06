import { DatePipe, formatDate, NgFor } from '@angular/common';
import { Component } from '@angular/core';
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
  currDate:Date=new Date;
  currWeek:Date[]=[];
  currWeekDates:String[]=[];
  allSchedules:Schedule[]=[];
  currWeekSchedules:Schedule[]=[];

  ngOnInit(){
    this.currDate=new Date;
    this.currDate.setHours(0);
    this.currDate.setMinutes(0);
    this.currDate.setSeconds(0);
    this.getCurrWeek();
  }

  //Albat amis gaketebis rame uketesi metodi arsebobs magram ravi, rac aris aris
  //amas da previousWeek()s ubralod currentDate gadaaqvs erti kvirit win an ukan rom getCurrWeek()ma tavisi saqme gaaketos
  nextWeek(){
    this.currDate=new Date(this.currDate.setDate(this.currDate.getDate()-this.currDate.getDay()+7));
    this.getCurrWeek();
    this.getCurrWeekSchedules();
  }

  previousWeek(){
    this.currDate=new Date(this.currDate.setDate(this.currDate.getDate()-this.currDate.getDay()-7));
    this.getCurrWeek();
    this.getCurrWeekSchedules();
  }

  //Kviris dgheebis mixedvit tarighebis gamotvla, currWeek aris raw Date obieqti da currWeekDates aris string formatshi rata cxrilshi pirdapir chavsvat
  getCurrWeek(){
    let weekStart=new Date(this.currDate.setDate(this.currDate.getDate()-(7-this.currDate.getDay())+1));
    //TODO mosashorebelia console.log
    console.log(this.currDate);
    this.currWeek.push(new Date(weekStart.setDate(weekStart.getDate())));
    this.currWeekDates.push(formatDate(weekStart,'mediumDate','en'));
    this.currWeek.push(new Date(weekStart.setDate(weekStart.getDate()+1)));
    this.currWeekDates.push(formatDate(weekStart,'mediumDate','en'));
    this.currWeek.push(new Date(weekStart.setDate(weekStart.getDate()+1)));
    this.currWeekDates.push(formatDate(weekStart,'mediumDate','en'));
    this.currWeek.push(new Date(weekStart.setDate(weekStart.getDate()+1)));
    this.currWeekDates.push(formatDate(weekStart,'mediumDate','en'));
    this.currWeek.push(new Date(weekStart.setDate(weekStart.getDate()+1)));
    this.currWeekDates.push(formatDate(weekStart,'mediumDate','en'));
    this.currWeek.push(new Date(weekStart.setDate(weekStart.getDate()+1)));
    this.currWeekDates.push(formatDate(weekStart,'mediumDate','en'));
    this.currWeek.push(new Date(weekStart.setDate(weekStart.getDate()+1)));
    this.currWeekDates.push(formatDate(weekStart,'mediumDate','en'));
    //TODO mosashorebelia console.log
    console.log(this.currWeek);
    console.log(this.currWeekDates);
    this.getCurrWeekSchedules();
    return this.currWeekDates;
  }

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
      let nextWeekFirstDay:Date=new Date(this.dummyDate.setDate(this.currWeek[6].getDate()+1));
      console.log(element.startTime+" | "+this.currWeek[0]+" | "+element.endTime+" | "+nextWeekFirstDay);
      if(element.startTime.getTime()>=this.currWeek[0].getTime()&&element.endTime.getTime()<nextWeekFirstDay.getTime()){
        //Drois formatebi ar emtxveva, ase rom ver adarebs ertmanets da shesabamisad ver pushavs
        this.currWeekSchedules.push(element);

      }
    });
    console.log("Current week's schedules:", this.currWeekSchedules);
  }
}
