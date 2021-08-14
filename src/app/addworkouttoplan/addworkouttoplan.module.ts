import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddworkouttoplanPageRoutingModule } from './addworkouttoplan-routing.module';

import { AddworkouttoplanPage } from './addworkouttoplan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddworkouttoplanPageRoutingModule
  ],
  declarations: [AddworkouttoplanPage]
})
export class AddworkouttoplanPageModule {}
