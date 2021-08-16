import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlanDetailCountdownPage } from './plan-detail-countdown.page';

const routes: Routes = [
  {
    path: '',
    component: PlanDetailCountdownPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlanDetailCountdownPageRoutingModule {}
