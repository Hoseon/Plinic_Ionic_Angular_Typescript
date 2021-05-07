import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CareZonePage } from './care-zone';
// import { IonicImageLoader } from 'ionic-image-loader';


@NgModule({
  declarations: [
    CareZonePage,
  ],
  imports: [
    // IonicImageLoader,
    IonicPageModule.forChild(CareZonePage),
  ],
})
export class CareZonePageModule {}
