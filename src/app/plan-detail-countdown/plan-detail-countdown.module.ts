import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlanDetailCountdownPageRoutingModule } from './plan-detail-countdown-routing.module';

import { PlanDetailCountdownPage } from './plan-detail-countdown.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlanDetailCountdownPageRoutingModule
  ],
  declarations: [PlanDetailCountdownPage]
})
export class PlanDetailCountdownPageModule {}
