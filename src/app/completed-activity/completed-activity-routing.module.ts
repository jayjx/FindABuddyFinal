import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompletedActivityPage } from './completed-activity.page';

const routes: Routes = [
  {
    path: '',
    component: CompletedActivityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompletedActivityPageRoutingModule {}
