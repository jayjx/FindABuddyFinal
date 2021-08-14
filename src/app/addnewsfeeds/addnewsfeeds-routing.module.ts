import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddnewsfeedsPage } from './addnewsfeeds.page';

const routes: Routes = [
  {
    path: '',
    component: AddnewsfeedsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddnewsfeedsPageRoutingModule {}
