import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecommendedPlanDetailPage } from './recommended-plan-detail.page';

const routes: Routes = [
  {
    path: '',
    component: RecommendedPlanDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecommendedPlanDetailPageRoutingModule {}
