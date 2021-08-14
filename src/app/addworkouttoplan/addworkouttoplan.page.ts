import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addworkouttoplan',
  templateUrl: './addworkouttoplan.page.html',
  styleUrls: ['./addworkouttoplan.page.scss'],
})
export class AddworkouttoplanPage implements OnInit {

 
  addWorkoutForm: any;
  workoutplan: string[];


  constructor( private router: Router, public http: HttpClient)
     {
      this.workoutplan = ['Beginner Plan', 'Intermediate Plan', 'Advanced Plan'];
      this.addWorkoutForm = new FormGroup({
        workoutplan: new FormControl('')
       });
   }

  ngOnInit() {}

  
    add(){
      var url = 'https://buddyfind.herokuapp.com/addworkouttoplan';
      var postData = JSON.stringify({
  
        workoutplan: this.addWorkoutForm.value['workoutplan'],
      });
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE'
        })
      };
      this.http.post(url, postData, httpOptions).subscribe((data) => {
        console.log('postData:', postData)
        console.log(data);
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
