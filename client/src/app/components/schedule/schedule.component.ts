import { DatePipe, formatDate, NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent {
  currDate:Date=new Date;
  currWeek:Date[]=[];
  currWeekDates:String[]=[];
  ngOnInit(){
    this.currDate=new Date;
    this.getCurrWeek();
  }
  //Albat amis gaketebis rame uketesi metodi arsebobs magram ravi, rac aris aris
  //amas da previousWeek()s ubralod currentDate gadaaqvs erti kvirit win an ukan rom getCurrWeek()ma tavisi saqme gaaketos
  nextWeek(){
    this.currDate=new Date(this.currDate.setDate(this.currDate.getDate()-this.currDate.getDay()+7));
    this.getCurrWeek();
  }
  previousWeek(){
    this.currDate=new Date(this.currDate.setDate(this.currDate.getDate()-this.currDate.getDay()-7));
    this.getCurrWeek();
  }
  //Kviris dgheebis mixedvit tarighebis gamotvla, currWeek aris raw Date obieqti da currWeekDates aris string formatshi rata cxrilshi pirdapir chavsvat
  getCurrWeek(){
    let weekStart=new Date(this.currDate.setDate(this.currDate.getDate()-this.currDate.getDay()+1));
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
    return this.currWeekDates;
  }
}
