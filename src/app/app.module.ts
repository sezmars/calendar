import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {ModalComponent} from './components/modal';
import {AngularSvgIconModule} from 'angular-svg-icon';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {CalendarComponent} from './components/calendar';
import {CreateComponent} from './components/modal/create';
import {ChangeComponent} from './components/modal/change';

@NgModule({
  declarations: [
    AppComponent,
    ModalComponent,
    CreateComponent,
    ChangeComponent,
    CalendarComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AngularSvgIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
