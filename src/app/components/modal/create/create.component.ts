import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {
  @Input() public day: string;
  @Input() public date: string;
  @Input() public note: string;
  @Input() public title: string;
  @Input() public modalStateCreate: false;
  @Output() public submit = new EventEmitter<boolean>();

  constructor() { }

  public onSubmit(form: any) {
    localStorage.setItem(this.day, JSON.stringify(form.value));
    this.submit.emit(true);
  }

}
