import { HttpClient } from '@angular/common/http';
import { Component,} from '@angular/core';
import { WorkoutsService } from '../shared/services/workouts.service';

@Component({
  selector: 'app-absworkouts',
  templateUrl: './absworkouts.page.html',
  styleUrls: ['./absworkouts.page.scss'],
})

export class AbsworkoutsPage{

  FitnessList: any = [];

  constructor(public http: HttpClient, private workoutService: WorkoutsService,) {
    this.FitnessList = this.workoutService.getProducts();
   }

  ngOnInit() {
    this.getAbs();
  }

  async getAbs(){
    var url = 'https://buddyfind.herokuapp.com/absworkouts';
    this.http.get(url).subscribe(data => {
    this.FitnessList=data
  })
}

}




