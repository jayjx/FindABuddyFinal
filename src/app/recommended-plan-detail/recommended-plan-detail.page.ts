import { Component, OnInit } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  JsonpClientBackend,
} from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recommended-plan-detail',
  templateUrl: './recommended-plan-detail.page.html',
  styleUrls: ['./recommended-plan-detail.page.scss'],
})
export class RecommendedPlanDetailPage implements OnInit {
  planTypeName: any;
  recommendedPlanDetails: any = [];
  sum: number = 0;
  recommendedString: any;

  planName: any;

  constructor(
    public route: ActivatedRoute,
    public http: HttpClient,
    public navCtrl: NavController,
    public router: Router
  ) {
    this.planTypeName = this.route.snapshot.params.planTypeName;
  }

  ngOnInit() {
    console.log('GIOEOGNSNNDNGSNODGGMN', this.planTypeName);
    this.getPlanDetail();
    this.calculationOfTime();
  }

  getPlanDetail() {
    var url = 'https://buddyfind.herokuapp.com/recommendedPlanDetails';
    var PlanTypeStatus = JSON.stringify({
      PlanTypeStatus: this.planTypeName,
    });

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
      }),
    };

    this.http.post(url, PlanTypeStatus, httpOptions).subscribe(
      (data) => {
        var newData;

        if (data != null) {
          this.recommendedPlanDetails = data;
          console.log(
            'RESULTS RECOMMENDED PLAN ARRAY :',
            this.recommendedPlanDetails
          );

          console.log('XXX', JSON.stringify(this.recommendedPlanDetails[0]));

          this.recommendedString = JSON.parse(
            JSON.stringify(this.recommendedPlanDetails)
          );

          console.log('FFFFFF', this.recommendedString);

          for (var i = 0; i < this.recommendedString.length; i++) {
            console.log('0000', this.recommendedString[i]['fitnessDuration']);

            // sum = sum + recommendedString[i]['fitnessDuration'];
            //  var valuedMember : BigInteger  = recommendedString[i]['fitnessDuration'].parseInt;
            var valuedMember = parseInt(
              this.recommendedString[i]['fitnessDuration']
            );
            this.sum = this.sum + valuedMember;

            console.log('Sum of numbers', valuedMember);
            console.log('Valued Member', this.sum);
          }
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  calculationOfTime() {
    let list: string[] = [];
  }

  passingTheDataToNextPage() {
    console.log('Countdown button clicked');
    var jsonDataSent = JSON.stringify(this.recommendedPlanDetails);

    this.router.navigate(['plan-detail-countdown', jsonDataSent]);
  }
}
