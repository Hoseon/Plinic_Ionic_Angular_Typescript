import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MovieTipPage } from './movieTip';

@NgModule({
  declarations: [
    MovieTipPage,
  ],
  imports: [
  IonicPageModule.forChild(MovieTipPage),
  ],
})
export class MovieTipPagePageModule {}
