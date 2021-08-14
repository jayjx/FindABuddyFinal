import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;
@Component({
  selector: 'app-add-upcoming',
  templateUrl: './add-upcoming.page.html',
  styleUrls: ['./add-upcoming.page.scss'],
})
export class AddUpcomingPage implements OnInit {
  userID: string;

  addUpcomingForm: FormGroup;
  workouts: any = [];

  planName: any;

  constructor(
    private router: Router,
    public http: HttpClient,
    public route: ActivatedRoute
  ) {
    this.addUpcomingForm = new FormGroup({
      date: new FormControl(''),
      location: new FormControl('', [Validators.required]),
      activity: new FormControl(''),
    });

    this.planName = this.route.snapshot.params.planID;
  }

  async loginUser() {
    const { value } = await Storage.get({ key: 'userID' });
    console.log('tab3userid: ', value);
    this.userID = value;
  }

  ngOnInit() {
    this.getChest();
  }

  async add() {
    const { value } = await Storage.get({ key: 'userID' });
    console.log('tab3userid: ', value);
    this.userID = value;

    if (this.addUpcomingForm.valid) {
      var url = 'https://buddy-deploy.herokuapp.com/addUpcoming';
      var postData = JSON.stringify({
        userId: this.userID,
        upcomingDateTime: this.addUpcomingForm.value['date'],
        upcomingLocation: this.addUpcomingForm.value['location'],
        upcomingActivity: this.addUpcomingForm.value['activity'],
      });
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
        }),
      };
      this.http.post(url, postData, httpOptions).subscribe(
        (data) => {
          console.log('postData:', postData);
          console.log(data);
          if (data == false) {
            // this.failed()
          } else if (data == true) {
            // this.successful()
            window.location.reload();
          }
        },
        (error) => {
          console.log(error);
        }
      );
      this.router.navigate(['tabs/tab2']);
    }
  }

  async getChest() {
    var url = 'https://buddy-deploy.herokuapp.com/getChest';
    this.http.get(url).subscribe((data) => {
      this.workouts = data;
    });
  }
}
