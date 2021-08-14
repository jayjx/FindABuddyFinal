import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddUpcomingPage } from './add-upcoming.page';

const routes: Routes = [
  {
    path: '',
    component: AddUpcomingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddUpcomingPageRoutingModule {}
