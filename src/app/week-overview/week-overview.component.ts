import { Component, OnInit } from '@angular/core';
import { DayService } from '../services/day.service';
import { Day } from '../shared/models/day';
@Component({
  selector: 'app-week-overview',
  templateUrl: './week-overview.component.html',
  styleUrls: ['./week-overview.component.css']
})
export class WeekOverviewComponent implements OnInit {

  week: Day[] = [];
  selectedWeekNumber: number = 0;

  constructor(private dayService: DayService) { }

  ngOnInit(): void {
    this.dayService.selectedWeekChanged$.subscribe(week => { 
      this.week = week
    console.log(this.week) })
    this.dayService.selectedWeekNumberChanged$.subscribe(selectedWeekNumber => {this.selectedWeekNumber = selectedWeekNumber})
    this.dayService.setSelectedWeekNumberToThisWeek();
  }
  
  onPreviousWeekClicked()
  {
    this.dayService.setSelectedWeekNumber(this.selectedWeekNumber - 1)
  }

  onNextWeekClicked()
  {
    this.dayService.setSelectedWeekNumber(this.selectedWeekNumber + 1)
  }
}
