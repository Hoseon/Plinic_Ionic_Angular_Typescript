import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PostBoxPage } from './postbox';

@NgModule({
  declarations: [
    PostBoxPage,
  ],
  imports: [
    IonicPageModule.forChild(PostBoxPage),
  ],
})
export class PostBoxPagePageModule {}
