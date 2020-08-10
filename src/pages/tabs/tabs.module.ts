import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabsPage } from './tabs';
import { CustomIconsModule } from 'ionic2-custom-icons'

@NgModule({
  declarations: [
    TabsPage,
  ],
  imports: [
    IonicPageModule.forChild(TabsPage),
    CustomIconsModule
  ]
})
export class TabsPageModule {}
