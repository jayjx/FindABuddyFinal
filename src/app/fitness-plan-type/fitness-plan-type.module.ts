import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FitnessPlanTypePageRoutingModule } from './fitness-plan-type-routing.module';

import { FitnessPlanTypePage } from './fitness-plan-type.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FitnessPlanTypePageRoutingModule
  ],
  declarations: [FitnessPlanTypePage]
})
export class FitnessPlanTypePageModule {}
