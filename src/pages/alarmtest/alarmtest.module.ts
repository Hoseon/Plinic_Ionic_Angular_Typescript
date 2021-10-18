import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AlarmTestPage } from './alarmtest';

@NgModule({
  declarations: [
    AlarmTestPage,
  ],
  imports: [
    IonicPageModule.forChild(AlarmTestPage),
  ],
})
export class AlarmTestPageModule {}
