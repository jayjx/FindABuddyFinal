import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditnewsfeedsPage } from './editnewsfeeds.page';

const routes: Routes = [
  {
    path: '',
    component: EditnewsfeedsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditnewsfeedsPageRoutingModule {}
