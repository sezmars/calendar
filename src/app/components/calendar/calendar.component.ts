import {Component, OnInit} from '@angular/core';

import * as moment from 'moment';
import * as _ from 'lodash';
import {ITask} from '../../models';

export interface CalendarDate {
  mDate: moment.Moment;
  selected?: boolean;
  today?: boolean;
  task?: ITask;
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})

export class CalendarComponent implements OnInit {
  public currentDate = moment();
  public task: string;
  public dataTask: ITask;
  public closeFromChange: boolean;
  public modalStateChange = false;
  public modalStateCreate = false;
  public weeks: CalendarDate[][] = [];
  public dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  constructor() { }

  public ngOnInit() {
    this.generateCalendar();
  }

  public isToday(date: moment.Moment): boolean {
    return moment().isSame(moment(date), 'day');
  }

  isSelectedMonth(date: moment.Moment): boolean {
    return moment(date).isSame(this.currentDate, 'month');
  }

  public selectDate(day: CalendarDate, state: ITask): void {
    if (Boolean(state)) {
      this.modalStateChange = true;
      this.modalStateCreate = false;
    } else {
      this.modalStateCreate = true;
      this.modalStateChange = false;
    }
    this.weeks.filter((week) => {
      week.map((date) => {
        return date.mDate === day.mDate ? date.selected = true : date.selected = false;
      });
    });
    this.dataTask = JSON.parse(localStorage.getItem(day.mDate.format('D')));
  }

  public closeModal(event) {
    if (event) {
      this.weeks.filter((week) => {
        week.map((date) => {
          if (date.selected) {
            date.selected = !date.selected;
            return;
          }
          return;
        });
      });
    }
  }

  public closeStateForChange() {
    this.closeFromChange = true;
    this.modalStateCreate = false;
    this.modalStateChange = false;
  }

  public getTasks(weeks) {
    weeks.map((week) => {
      week.filter((date) => {
        if (localStorage.getItem(date.mDate.format('D'))) {
          if (Boolean(this.isSelectedMonth(date.mDate))) {
            date.task = JSON.parse(localStorage.getItem(date.mDate.format('D')));
          }
        }
      });
    });
    this.weeks = weeks;
  }

  public getCurrentTask(day) {
    return JSON.parse(localStorage.getItem(day.mDate.format('D')));
  }

  public updateDay($event) {
    if ($event) {
      this.generateCalendar();
    }
  }

  public generateCalendar(): void {
    const dates = this.fillDates(this.currentDate);
    const weeks: CalendarDate[][] = [];
    while (dates.length > 0) {
      weeks.push(dates.splice(0, 7));
    }
    this.weeks = weeks;
    this.getTasks(this.weeks);
  }

  private fillDates(currentMoment: moment.Moment): CalendarDate[] {
    const firstOfMonth = moment(currentMoment).startOf('month').day();
    const firstDayOfGrid = moment(currentMoment).startOf('month').subtract(firstOfMonth, 'days');
    const start = firstDayOfGrid.date();
    return _.range(start, start + 42)
      .map((date: number): CalendarDate => {
        const d = moment(firstDayOfGrid).date(date);
        return {
          today: this.isToday(d),
          selected: false,
          mDate: d,
        };
      });
  }
}
