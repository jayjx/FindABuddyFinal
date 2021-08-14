import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Workout } from '../shared/model/workout';
import { WorkoutsService } from '../shared/services/workouts.service';

@Component({
  selector: 'app-addchestworkout',
  templateUrl: './addchestworkout.page.html',
  styleUrls: ['./addchestworkout.page.scss'],
})
export class AddchestworkoutPage implements OnInit {
  addChestworkoutForm: FormGroup;
  workouts: any = [];


  constructor(private workoutsService: WorkoutsService, private router: Router, public http: HttpClient)
     {
    this.addChestworkoutForm = new FormGroup({
      bodypart: new FormControl(''),
      name: new FormControl(''),
      description: new FormControl(''),
     sets: new FormControl(0),
     reps: new FormControl(0),
     duration: new FormControl(''),
     difficulty: new FormControl('')
     });
   }

  ngOnInit() {}

  
    add(){
      var url = 'https://buddyfind.herokuapp.com/addchestworkouts';
      var postData = JSON.stringify({
  
        bodypart: this.addChestworkoutForm.value['bodypart'],
        name: this.addChestworkoutForm.value['name'],
        description: this.addChestworkoutForm.value['description'],
        sets: this.addChestworkoutForm.value['sets'],
        reps: this.addChestworkoutForm.value['reps'],
        duration: this.addChestworkoutForm.value['duration'],
        difficulty: this.addChestworkoutForm.value['difficulty'],
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
