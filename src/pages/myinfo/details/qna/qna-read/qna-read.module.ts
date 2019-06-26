import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QnaReadPage } from './qna-read';

@NgModule({
  declarations: [
    QnaReadPage,
  ],
  imports: [
    IonicPageModule.forChild(QnaReadPage),
  ],
})
export class QnaReadPageModule {}
