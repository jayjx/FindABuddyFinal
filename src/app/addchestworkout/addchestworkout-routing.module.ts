import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddchestworkoutPage } from './addchestworkout.page';

const routes: Routes = [
  {
    path: '',
    component: AddchestworkoutPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddchestworkoutPageRoutingModule {}
