import { HttpClient } from '@angular/common/http';
import { Component,} from '@angular/core';
import { WorkoutsService } from '../shared/services/workouts.service';

@Component({
  selector: 'app-armsworkouts',
  templateUrl: './armsworkouts.page.html',
  styleUrls: ['./armsworkouts.page.scss'],
})
export class ArmsworkoutsPage{

  FitnessList: any = [];

  constructor(public http: HttpClient, private workoutService: WorkoutsService,) {
    this.FitnessList = this.workoutService.getProducts();
   }

  ngOnInit() {
    this.getArms();
  }

  async getArms(){
    var url = 'https://buddyfind.herokuapp.com/armsworkouts';
    this.http.get(url).subscribe(data => {
    this.FitnessList=data
  })
}

}



