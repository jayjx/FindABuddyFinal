import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompletedActivityPageRoutingModule } from './completed-activity-routing.module';

import { CompletedActivityPage } from './completed-activity.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompletedActivityPageRoutingModule
  ],
  declarations: [CompletedActivityPage]
})
export class CompletedActivityPageModule {}
