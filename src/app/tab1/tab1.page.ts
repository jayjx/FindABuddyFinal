import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
import * as HighCharts from 'highcharts';

const { Storage } = Plugins;

declare var require: any;
var hcharts = require('highcharts');
require('highcharts/modules/data')(hcharts);

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class Tab1Page {
  id: string;
  userDetails: any = [];
  completed: any = [];
  badges: any = [];

  completedAmt: string;

  completedAmtNum: number;

  compltedTotal: any = [];

  recommendedPlan: any = [];
  myFitnessLevel: string;

  fitnessLevel: string;

  constructor(public http: HttpClient, private router: Router) {}

  myPlanList: any = [];

  slidesOptions = {
    slidesPerView: 1.6,
  };

  badgeSlidesOptions = {
    slidesPerView: 3,
  };

  ngOnInit() {
    this.getDetails();
    this.loginUser();
    this.getBadge();
  }

  async loginUser() {
    const { value } = await Storage.get({ key: 'userID' });
    const { username } = await Storage.get({ key: 'username' });


    console.log('tab3userid: ', value);
    console.log('tab3userid: ', username);

    this.id = value;

    this.getUserDetails();
    this.getCompleted();
    this.getTotal();
  }

  async getUserDetails() {
    var url = 'https://buddy-deploy.herokuapp.com/getUserDetails';

    var postData = JSON.stringify({
      userID: this.id,
    });
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
          this.userDetails = data;
          this.myFitnessLevel = this.userDetails[0].fitnessLevel;
          console.log(this.userDetails[0].fitnessLevel);
          console.log('User Account Type check', this.userDetails);
          this.getRecommendedPlans();
        } else {
          // this.failed()
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  async getRecommendedPlans() {
    var url = 'https://buddyfind.herokuapp.com/recommendedPlan';

    console.log(this.myFitnessLevel);

    var recommendedValue = JSON.stringify({
      PlanTypeStatus: this.myFitnessLevel,
    });

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
          this.recommendedPlan = data;
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
          console.log(this.completed.length);
          this.completedAmt = this.completed.length;
          this.completedAmtNum = this.completed.length;

          this.updateLevel();
        } else {
          // this.failed()
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  async updateLevel() {
    console.log(this.completedAmtNum);
    if (this.completedAmtNum > 5) {
      this.fitnessLevel = 'Beginner';
      console.log(this.fitnessLevel);
    }
    if (this.completedAmtNum > 10) {
      this.fitnessLevel = 'Intermediate';
    }

    if (this.completedAmtNum > 20) {
      this.fitnessLevel = 'Expert';
    }
  }

  ionViewDidEnter() {
    setTimeout(() => {
      this.plotChart();
    }, 7000);
  }

  plotChart() {
    HighCharts.chart('activityChart', {
      data: {
        table: 'datatable',
      },
      chart: {
        type: 'line',
      },
      title: {
        text: 'Active Chart',
      },
      yAxis: {
        allowDecimals: false,
        title: {
          text: 'Minutes',
        },
      },
    });
    console.log();
  }

  getDetails() {
    var url = 'https://buddyfind.herokuapp.com/getUserPlanLists';

    var postData = JSON.stringify({});
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

        if (data != null) {
          this.myPlanList = data;
        } else {
          // this.failed()
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getBadge() {
    var url = 'https://buddy-deploy.herokuapp.com/getBadges';
    this.http.get(url).subscribe((data) => {
      this.badges = data;
      console.log(data);
    });
  }

  async getTotal() {
    var url = 'https://buddy-deploy.herokuapp.com/getTotal';

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
          this.compltedTotal = data;
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
