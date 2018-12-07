import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {ITask} from '../../../models';

@Component({
  selector: 'app-change',
  templateUrl: './change.component.html',
  styleUrls: ['./change.component.scss']
})
export class ChangeComponent implements OnChanges {
  public complete = false;
  @Input() public day: string;
  @Input() public date: string;
  @Input() public note: string;
  @Input() public title: string;
  @Input() public dataTask: ITask;
  @Input() public modalStateChange: false;
  @Output() public change = new EventEmitter<boolean>();
  @Output() public closeState = new EventEmitter<boolean>();
  @Output() public removeState = new EventEmitter<boolean>();

  constructor() { }

  public ngOnChanges() {
    if (this.dataTask && this.dataTask.complete) {
      this.complete = true;
    }
  }

  public onRemove(event) {
    event.stopPropagation();
    localStorage.removeItem(this.day);
    this.removeState.emit(true);
  }

  public close() {
    this.closeState.emit();
  }

  public onSelected() {
    this.complete = !this.complete;
    this.complete ? this.dataTask.complete = true : this.dataTask.complete = false;
    localStorage.setItem(this.day, JSON.stringify(this.dataTask));
    this.change.emit(true);
  }
}
