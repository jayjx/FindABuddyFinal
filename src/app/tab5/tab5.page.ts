import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NewsfeedsService } from '../shared/services/newsfeeds.service';
import { NewsfeedsLikesService } from '../shared/services/newsfeedslikes.service';
import { Storage } from '@capacitor/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { IonSearchbar, ToastController } from '@ionic/angular';
import { Newsfeeds } from '../shared/model/Newsfeeds';


@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {
  isShown : boolean = false;
  
  id: string
  constructor(private Snaprouter:ActivatedRoute,public http: HttpClient, public newsfeedService: NewsfeedsService,
    public toastController: ToastController,public router: Router, public newsfeedlikesService : NewsfeedsLikesService) 
    { 
    this.id = this.Snaprouter.snapshot.params.id;

    
  }

  ngOnInit() {
    this.loginUser()
    
    
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
  

