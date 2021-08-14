import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditnewsfeedsPageRoutingModule } from './editnewsfeeds-routing.module';

import { EditnewsfeedsPage } from './editnewsfeeds.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditnewsfeedsPageRoutingModule,ReactiveFormsModule
  ],
  declarations: [EditnewsfeedsPage],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EditnewsfeedsPageModule {}
