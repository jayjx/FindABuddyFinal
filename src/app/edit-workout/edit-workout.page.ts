import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Workout } from '../shared/model/workout';

@Component({
  selector: 'app-edit-workout',
  templateUrl: './edit-workout.page.html',
  styleUrls: ['./edit-workout.page.scss'],
})
export class EditWorkoutPage implements OnInit {

  editworkoutForm: FormGroup;
  fitnessID: string;

  constructor(private route: ActivatedRoute, public http: HttpClient, private router: Router) { 
    this.fitnessID = this.route.snapshot.params.id;
    this.editworkoutForm = new FormGroup({
      bodypart: new FormControl(''),
      name: new FormControl(''),
      description: new FormControl(''),
     sets: new FormControl(0),
     reps: new FormControl(0),
     duration: new FormControl(''),
     difficulty: new FormControl('')
     });

  }

  ngOnInit() {

  }



 update(){
      var url = 'https://buddyfind.herokuapp.com/editItem';
      var postData = JSON.stringify({
  
        bodypart: this.editworkoutForm.value['bodypart'],
        name: this.editworkoutForm.value['name'],
        description: this.editworkoutForm.value['description'],
        sets: this.editworkoutForm.value['sets'],
        reps: this.editworkoutForm.value['reps'],
        duration: this.editworkoutForm.value['duration'],
        difficulty: this.editworkoutForm.value['difficulty'],
        id: this.fitnessID
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

    workouts: any = [];


 getWorkout(){
  var url = 'https://buddy-shawn.herokuapp.com/getWorkout';
  var postData = JSON.stringify({
    id: this.fitnessID
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
    if (data != null) {
      this.workouts = data;
    } else {
      // this.successful()
      
       console.log(data)
    }
  }, error => {
    console.log(error);
  });
}

}
