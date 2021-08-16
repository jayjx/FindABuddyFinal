import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NotificationPage } from '../notification/notification.page';
import { NotificationPageModule } from '../notification/notification.module';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {

  userProfile: any =[]; 

  constructor(public http: HttpClient, public modalController: ModalController) { 

  }

  
  ngOnInit() {

  }

  async getRequests(){
    var url = 'https://itj-findabuddy.herokuapp.com/UserProfile';
    this.http.get(url).subscribe(data => {
      this.userProfile = data
      console.log(data)
    })

  }

  close() {
    this.modalController.dismiss();
  }
}
