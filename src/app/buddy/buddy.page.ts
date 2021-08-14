import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

@Component({
  selector: 'app-buddy',
  templateUrl: './buddy.page.html',
  styleUrls: ['./buddy.page.scss'],
})
export class BuddyPage {
  userID: string;
  buddy: any = [];

  constructor(public http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.loginUser();
  }

  async loginUser() {
    const { value } = await Storage.get({ key: 'userID' });
    console.log('tab3userid: ', value);
    this.userID = value;

    this.getBuddy();
  }

  getBuddy() {
    var url = 'https://buddy-deploy.herokuapp.com/getBuddy';
    var postData = JSON.stringify({
      userID: this.userID,
    });
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
      }),
    };
    console.log(this.userID);
    this.http.post(url, postData, httpOptions).subscribe(
      (data) => {
        console.log('postData:', postData);
        console.log(data);
        console.log(this.userID);
        if (data != null) {
          this.buddy = data;
        } else {
          // this.failed()
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
