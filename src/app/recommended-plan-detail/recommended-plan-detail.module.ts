import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecommendedPlanDetailPageRoutingModule } from './recommended-plan-detail-routing.module';

import { RecommendedPlanDetailPage } from './recommended-plan-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecommendedPlanDetailPageRoutingModule
  ],
  declarations: [RecommendedPlanDetailPage]
})
export class RecommendedPlanDetailPageModule {}
