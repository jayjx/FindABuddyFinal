import { HttpClient } from '@angular/common/http';
import { Component,} from '@angular/core';
import { WorkoutsService } from '../shared/services/workouts.service';

@Component({
  selector: 'app-backworkouts',
  templateUrl: './backworkouts.page.html',
  styleUrls: ['./backworkouts.page.scss'],
})
export class BackworkoutsPage{

  FitnessList: any = [];

  constructor(public http: HttpClient, private workoutService: WorkoutsService,) {
    this.FitnessList = this.workoutService.getProducts();
    
   }

  ngOnInit() {
    this.getBack();
  }

  async getBack(){
    var url = 'https://buddyfind.herokuapp.com/backworkouts';
    this.http.get(url).subscribe(data => {
    this.FitnessList=data
  })
}

}
