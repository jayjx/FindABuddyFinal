import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddchestworkoutPageRoutingModule } from './addchestworkout-routing.module';

import { AddchestworkoutPage } from './addchestworkout.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddchestworkoutPageRoutingModule
  ],
  declarations: [AddchestworkoutPage]
})
export class AddchestworkoutPageModule {}
