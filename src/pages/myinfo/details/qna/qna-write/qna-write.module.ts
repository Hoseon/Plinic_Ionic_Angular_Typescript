import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QnaWritePage } from './qna-write';

@NgModule({
  declarations: [
    QnaWritePage,
  ],
  imports: [
    IonicPageModule.forChild(QnaWritePage),
  ],
})
export class QnaWritePageModule {}
