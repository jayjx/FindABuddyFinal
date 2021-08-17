import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { IonSlides } from '@ionic/angular';

const { Storage } = Plugins;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  id: string;
  username: string;
  completed: any = [];

  upcomings: any = [];

  selectedSlide: any;
  segment = 0;
  sliderOptions = {
    initialSlide: 0,
    slidesPerView: 1,
    speed: 400,
  };

  constructor(public http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.loginUser();
  }

  async loginUser() {
    const { value } = await Storage.get({ key: 'userID' });
    console.log('tab3userid: ', value);
    this.id = value;

    
   
    this.getCompleted();
    this.getMyUpcoming();
  }
  

  async getCompleted() {
    var url = 'https://buddy-deploy.herokuapp.com/getCompleted';

    var postData = JSON.stringify({
      userID: this.id,
    });
    console.log(this.id);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
      }),
    };
    console.log(this.id);
    this.http.post(url, postData, httpOptions).subscribe(
      (data) => {
        console.log('postData:', postData);
        console.log(data);
        console.log(this.id);
        if (data != null) {
          this.completed = data;
        } else {
          // this.failed()
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  async getMyUpcoming() {
    var url = 'https://buddy-deploy.herokuapp.com/getUpcoming';

    const { value } = await Storage.get({ key: 'username' });
    console.log('tab3userid: ', value);
    this.username = value;

    var postData = JSON.stringify({
      userID: this.id,
      userName: this.username
    });
    console.log(this.id);
    console.log(this.username);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
      }),
    };
    console.log(this.id);
    this.http.post(url, postData, httpOptions).subscribe(
      (data) => {
        console.log('postData:', postData);
        console.log(data);
        console.log(this.id);
        if (data != null) {
          this.upcomings = data;
        } else {
          // this.failed()
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  details() {
    this.router.navigate(['/activity-details']);
  }

  async segmentChanged(ev) {
    await this.selectedSlide.slideTo(this.segment);
  }

  async slidesChange(slides: IonSlides) {
    this.selectedSlide = slides;
    slides.getActiveIndex().then((selectedIndex) => {
      this.segment = selectedIndex;
    });
  }

  notification = false;

  myNotification() {
    if (this.notification) {
      this.notification = false;
    } else {
      this.notification = true;
    }
  }
}
