import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FilterPopoverPage } from './filter-popover-page';

@NgModule({
  declarations: [
    FilterPopoverPage,
  ],
  imports: [
    IonicPageModule.forChild(FilterPopoverPage),
  ],
  exports: [
    FilterPopoverPage
  ]
})
export class FilterPopoverPageModule {}
