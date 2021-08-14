import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddUpcomingPageRoutingModule } from './add-upcoming-routing.module';

import { AddUpcomingPage } from './add-upcoming.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    AddUpcomingPageRoutingModule
  ],
  declarations: [AddUpcomingPage]
})
export class AddUpcomingPageModule {}
