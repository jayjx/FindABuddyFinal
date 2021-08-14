import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddnewsfeedsPageRoutingModule } from './addnewsfeeds-routing.module';

import { AddnewsfeedsPage } from './addnewsfeeds.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,ReactiveFormsModule,
    AddnewsfeedsPageRoutingModule
  ],
  declarations: [AddnewsfeedsPage]
})
export class AddnewsfeedsPageModule {}
