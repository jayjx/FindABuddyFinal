import { HttpClient } from '@angular/common/http';
import { Component,} from '@angular/core';
import { WorkoutsService } from '../shared/services/workouts.service';

@Component({
  selector: 'app-legworkouts',
  templateUrl: './legworkouts.page.html',
  styleUrls: ['./legworkouts.page.scss'],
})
export class LegworkoutsPage{

  FitnessList: any = [];

  constructor(public http: HttpClient, private workoutService: WorkoutsService,) {
    this.FitnessList = this.workoutService.getProducts();
   }

  ngOnInit() {
    this.getLegs();
  }

  async getLegs(){
    var url = 'https://buddyfind.herokuapp.com/legworkouts';
    this.http.get(url).subscribe(data => {
    this.FitnessList=data
  })
}

}



