import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddworkouttoplanPage } from './addworkouttoplan.page';

const routes: Routes = [
  {
    path: '',
    component: AddworkouttoplanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddworkouttoplanPageRoutingModule {}
