import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

@Component({
  selector: 'app-activity-details',
  templateUrl: './activity-details.page.html',
  styleUrls: ['./activity-details.page.scss'],
})
export class ActivityDetailsPage implements OnInit {
  userID: string;
  result: any = [];

  UpcomingID: string;

  fitnessName: string;
  workoutItems: any = [];

  constructor(
    private route: ActivatedRoute,
    public http: HttpClient,
    private router: Router
  ) {
    this.UpcomingID = this.route.snapshot.params.id;
  }

  slidesOptions = {
    slidesPerView: 1,
  };

  ngOnInit() {
    this.getDetails();
  }
  getDetails() {
    var url = 'https://buddy-deploy.herokuapp.com/getUpcomingDetails';

    var postData = JSON.stringify({
      UpcomingID: this.UpcomingID,
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
        console.log(this.UpcomingID);
        if (data != null) {
          this.result = data;
          this.fitnessName = this.result[0].PlanTypeid;
          this.getWorkoutItems();
        } else {
          // this.failed()
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getWorkoutItems() {
    var url = 'https://buddy-deploy.herokuapp.com/planDetails';

    var recommendedValue = JSON.stringify({
      PlanTypeStatus: this.fitnessName,
    });
    console.log(this.fitnessName);
    console.log(this.result[0].PlanTypeStatus);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
      }),
    };
    this.http.post(url, recommendedValue, httpOptions).subscribe(
      (data) => {
        if (data != null) {
          this.workoutItems = data;
          console.log(data);
        } else {
          console.log('Array are empty');
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  delete() {
    var url = 'https://buddy-deploy.herokuapp.com/deleteUpcomingDetails';

    var postData = JSON.stringify({
      UpcomingID: this.UpcomingID,
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
          window.location.reload();
          // this.failed()
        } else if (data == true) {
          // this.successful()
        }
      },
      (error) => {
        console.log(error);
      }
    );

    this.router.navigate(['tabs/tab2']);
  }

  async completed() {
    const { value } = await Storage.get({ key: 'userID' });
    console.log('tab3userid: ', value);
    this.userID = value;

    console.log(this.result[0]);

    var url = 'https://buddy-deploy.herokuapp.com/addCompleted';
    var postData = JSON.stringify({
      userID: this.userID,
      UpcomingID: this.result[0].PlanTypeName,
      buddy: this.result[0].buddyName,
      duration: this.result[0].PlanTypeDuration,
      date: this.result[0].date,
      location: this.result[0].location,
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
        }
      },
      (error) => {
        console.log(error);
      }
    );
    this.router.navigate(['tabs/tab2']);
  }
}
