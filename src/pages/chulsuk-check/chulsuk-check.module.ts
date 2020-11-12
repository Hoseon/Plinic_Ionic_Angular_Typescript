import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChulsukCheckPage } from './chulsuk-check';
import { NgCalendarModule } from 'ionic2-calendar'

@NgModule({
  declarations: [
    // ChulsukCheckPage,
  ],
  imports: [
    // IonicPageModule.forChild(ChulsukCheckPage),
    NgCalendarModule
  ],
})
export class ChulsukCheckPageModule {}
