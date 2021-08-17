import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-addworkouttoplan',
  templateUrl: './addworkouttoplan.page.html',
  styleUrls: ['./addworkouttoplan.page.scss'],
})
export class AddworkouttoplanPage implements OnInit {
  fitnessID: string;
  addWorkoutForm: any;
  FitnessPlanType: string[];


  constructor( private router: Router, public http: HttpClient,public route: ActivatedRoute)
     {
      this.FitnessPlanType = ['Beginner Plan', 'Intermediate Plan', 'Advanced Plan'];
      this.fitnessID = this.route.snapshot.params.id;
      this.addWorkoutForm = new FormGroup({
        FitnessPlanType: new FormControl(''),
        workoutplan: new FormControl('')
        
       });
   }

  ngOnInit()
   {
    console.log("fitnessid",this.fitnessID)
   }

  
    add(){
      var url = 'https://buddy-shawn.herokuapp.com/addworkouttoplan';
      var postData = JSON.stringify({
        id :this.fitnessID,
        FitnessPlanType: this.addWorkoutForm.value['FitnessPlanType'],
      });
      var updatepostData = JSON.parse(postData);
      console.log("postdata", updatepostData)
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE'
        })
      };
      this.http.post(url, updatepostData, httpOptions).subscribe((data) => {
        console.log('postData:', updatepostData)
        console.log(updatepostData);
        
        if (data == false) {
          // this.failed()
        } else if (data == true) {
          // this.successful()
          window.location.reload();
        }
      }, error => {
        console.log(error);
      });
      this.router.navigate(['tabs/tab5']);
    }
  

}
