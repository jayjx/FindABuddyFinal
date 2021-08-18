import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NewsfeedsService } from '../shared/services/newsfeeds.service';
import { NewsfeedsLikesService } from '../shared/services/newsfeedslikes.service';
import { Storage } from '@capacitor/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { IonSearchbar, ToastController } from '@ionic/angular';
import { Newsfeeds } from '../shared/model/Newsfeeds';
import { WorkoutsService } from '../shared/services/workouts.service';

@Component({
  selector: 'app-shoulderworkouts',
  templateUrl: './shoulderworkouts.page.html',
  styleUrls: ['./shoulderworkouts.page.scss'],
})

export class ShoulderworkoutsPage{

  FitnessList: any = [];
  isShown : boolean = false;
  id: string

  constructor(public http: HttpClient, private workoutService: WorkoutsService, private Snaprouter:ActivatedRoute, public newsfeedService: NewsfeedsService,
    public toastController: ToastController,public router: Router, public newsfeedlikesService : NewsfeedsLikesService) {
    this.FitnessList = this.workoutService.getProducts();
   }

  ngOnInit() {
    this.getShoulder();
    this.loginUser()
  }

  async getShoulder(){
    var url = 'https://buddyfind.herokuapp.com/shoulderworkouts';
    this.http.get(url).subscribe(data => {
    this.FitnessList=data
  })
}
checkadmin1(){
  console.log(this.isShown)
  console.log(this.id)
  if (this.id == "7")
  {
    this.isShown = true
    
  }

}

  async loginUser() {
    const { value } = await Storage.get({ key: 'userID' });
    this.id = value;
    console.log('tab5userid: ', this.id);
    this.checkadmin1()

  }
}




