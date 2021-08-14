import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { WorkoutsService } from '../shared/services/workouts.service';

@Component({
  selector: 'app-fitness-plan-type',
  templateUrl: './fitness-plan-type.page.html',
  styleUrls: ['./fitness-plan-type.page.scss'],
})
export class FitnessPlanTypePage implements OnInit {
  PlanType: any = [];
  constructor(public http: HttpClient, private workoutService: WorkoutsService,) {
    this.PlanType = this.workoutService.getProducts();
    
   }

  ngOnInit() {
    this.getPlan();
  }

  async getPlan(){
    var url = 'https://buddyfind.herokuapp.com/fitness-plan-type';
    this.http.get(url).subscribe(data => {
    this.PlanType=data
  })
}

}
