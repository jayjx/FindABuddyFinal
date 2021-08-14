import { HttpClient } from '@angular/common/http';
import { Component,} from '@angular/core';
import { Workout } from '../shared/model/workout';
import { WorkoutsService } from '../shared/services/workouts.service';

@Component({
  selector: 'app-chestworkouts',
  templateUrl: './chestworkouts.page.html',
  styleUrls: ['./chestworkouts.page.scss'],
})
export class ChestworkoutsPage{

  FitnessList: any = [];
  
  
  constructor(public http: HttpClient, private workoutService: WorkoutsService,) {
    this.FitnessList = this.workoutService.getProducts();
    
   }

  ngOnInit() {
    this.getChest();
  }

  async getChest(){
    var url = 'https://buddyfind.herokuapp.com/chestworkouts';
    this.http.get(url).subscribe(data => {
    this.FitnessList=data
  })
}

}

