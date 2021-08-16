
// Imported 
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, JsonpClientBackend } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';




@Component({
  selector: 'app-recommended-plan-detail',
  templateUrl: './recommended-plan-detail.page.html',
  styleUrls: ['./recommended-plan-detail.page.scss'],
})
export class RecommendedPlanDetailPage implements OnInit {


planTypeName : any; //Variable for Plan Type Name
recommendedPlanDetails :any = []; //Array to store the recommended plan details
sum : number  = 0; //Variable used to store total duration of the plan
recommendedString : any; //Variable used for JSON parsing


  constructor(public route : ActivatedRoute, public http:HttpClient, public navCtrl : NavController, public router : Router) {
    this.planTypeName = this.route.snapshot.params.planTypeName // Getting the Fitness Plan using constructors
   }

  ngOnInit() {
   // console.log('GIOEOGNSNNDNGSNODGGMN', this.planTypeName);
    this.getPlanDetail() // Calls this function to retrieve Plan Details
    this.calculationOfTime(); // Calls this function to calculate the total workout
  }

  getPlanDetail() {
    var url = "https://buddyfind.herokuapp.com/recommendedPlanDetails"; // Calling the server function from Heroku file online
    var PlanTypeStatus = JSON.stringify({
      PlanTypeStatus : this.planTypeName
    }); // Stringify this variable so it is sent to Heroku as it is a POST request!

    const httpOptions = {
      headers : new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE'
      })
    }; // Default HTTP Settings

    this.http.post(url, PlanTypeStatus, httpOptions).subscribe((data) => {

      var newData;

      if (data != null) { // If data received aint null, it will proceed further in this loop 
        this.recommendedPlanDetails = data // Data recevied from server function from Heroku server, will be stored in recommenedPlanDetails variable
         this.recommendedString = JSON.parse(JSON.stringify(this.recommendedPlanDetails)); // Parse the data to be readable by Ionic for other configurations
        console.log('FFFFFF', this.recommendedString); // Testing for console & debugging purposes

       for (var i = 0 ; i < this.recommendedString.length ; i++) { // For Loop to get the total duration of the workout
            var valuedMember  = parseInt(this.recommendedString[i]['fitnessDuration']); // Created a local variable to store current index fitness duration
            this.sum = this.sum + valuedMember; // When this iterates, the total duration of the plan is stored in sum
       }
      }


    }, error => {
      console.log(error); // If any error happens, this will catch it here and show it on console for debugging purposes
    });

    }




    calculationOfTime() {
    let list : string[] = []; //  Testing
    }

  passingTheDataToNextPage() { // This function is when the Countdown button is clicked
    console.log('Countdown button clicked') 
    var jsonDataSent = JSON.stringify(this.recommendedPlanDetails); // Strinify JSON data to a readable format by Ionic and jsondatasent is used to pass data to next view
    this.router.navigate(['plan-detail-countdown', jsonDataSent]) // This is the view once user taps on Countdown button
  }

  }


