import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ObservableLike, Subject } from 'rxjs';
import { Day } from '../shared/models/day';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { MenuItem } from '../shared/models/menu-item';

@Injectable({
  providedIn: 'root'
})
export class DayService {

  selectedWeekNumberChanged$ = new BehaviorSubject<number>(this.getWeekNumberOfToday());
  selectedWeekChanged$ = new BehaviorSubject<Day[]>([]);

  constructor(private http: HttpClient) 
  { 
    // on init set week number of today 
    this.selectedWeekNumberChanged$.next(this.getWeekNumberOfToday())
  }

  setSelectedWeekNumber(weekNumber: number)
  {
    this.selectedWeekNumberChanged$.next(weekNumber)

    //when selected week number changes, update the selected week as well 
    this.getWeek(weekNumber)
  }

  setSelectedWeekNumberToThisWeek()
  {
    this.setSelectedWeekNumber(this.getWeekNumberOfToday())
  }

  getWeek(weekNumber: number)
  {
    //when selected week number changes, update the selected week as well 
    this.fetchWeek(weekNumber).subscribe(week => {
      console.log("fetching week")
      this.selectedWeekChanged$.next(week)
    })
  }

  setMenuItem(pDayID: number, pDayProperties: {date: Date, menuItemID: number}) : Observable<Day>
  {
    console.log("setting menu item")
    console.log(pDayProperties)
    return this.http.post<Day>("http://localhost:8000/api/day/" + pDayID, pDayProperties);
  }

  private getWeekNumberOfToday()
  {
    var date = new Date();
    date.setHours(0, 0, 0, 0);
    //thursday in current week decides the year. 
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7); // this sets date to the thursday in the week of date
    //January 4 is always in week 1. 
    var jan4th = new Date(date.getFullYear(), 0, 4)
    //adjust to Thursday in week 1 and count number of weeks from date to jan4th
    var diffInDays = (date.getTime() - jan4th.getTime()) / 86400000;
    return 1 + Math.round( ( diffInDays - 3 + (jan4th.getDay() + 6) % 7) /7 );
  }

  private fetchWeek(pWeekNumber: number) : Observable<Day[]>
  {   
    return this.http
      .get<Day[]>("http://localhost:8000/api/week/" + pWeekNumber)
      .pipe(map( responseDataArray => {
        const dayArray: Day[] = [];
        responseDataArray.forEach((responseData) => {
          dayArray.push(new Day(responseData.id, new Date(responseData.date), responseData.menu_item))
        })
        return dayArray;
      }));
    
  }

}
