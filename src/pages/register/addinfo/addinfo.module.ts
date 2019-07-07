import { NgModule, NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddinfoPage } from './addinfo';
import { MultiPickerModule } from 'ion-multi-picker';


@NgModule({
  declarations: [
    AddinfoPage,
  ],
  imports: [
    IonicPageModule.forChild(AddinfoPage),
  ],
  schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
  ],
})
export class AddinfoPageModule {}
