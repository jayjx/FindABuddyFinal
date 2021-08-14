import { HttpClient } from '@angular/common/http';
import { Component,} from '@angular/core';
import { WorkoutsService } from '../shared/services/workouts.service';

@Component({
  selector: 'app-shoulderworkouts',
  templateUrl: './shoulderworkouts.page.html',
  styleUrls: ['./shoulderworkouts.page.scss'],
})

export class ShoulderworkoutsPage{

  FitnessList: any = [];

  constructor(public http: HttpClient, private workoutService: WorkoutsService,) {
    this.FitnessList = this.workoutService.getProducts();
   }

  ngOnInit() {
    this.getShoulder();
  }

  async getShoulder(){
    var url = 'https://buddyfind.herokuapp.com/shoulderworkouts';
    this.http.get(url).subscribe(data => {
    this.FitnessList=data
  })
}

}




