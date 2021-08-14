import { Route } from '@angular/compiler/src/core';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Plugins } from '@capacitor/core';
import { ToastController } from '@ionic/angular';

const { Storage } = Plugins;

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  user: any = [];
  submitted: boolean = false;
  send: boolean = true;
  searchBuddy: FormGroup;

  id: string;
  userEmail: string; 


  imageUrl = null;
 photo: Blob;


  constructor(private route: ActivatedRoute, public http: HttpClient, private router: Router, private toastController: ToastController) {

    this.searchBuddy = new FormGroup({
      age: new FormControl(),
      gender: new FormControl(''),
      location: new FormControl('', [Validators.required]),
    })
    
  }

  async loginUser() {
    const { value } = await Storage.get({ key: 'userID' });
    console.log('tab3userid: ', value);
    this.id = value;
  }

  ngOnInit(){
    this.loginUser()

  }

  search(){
    this.submitted =true;
    var url = 'https://buddyfind.herokuapp.com/getUser';

    var postData = JSON.stringify({
      currentUser: this.id,

      location: this.searchBuddy.value['location']
      //front end value
    });

 
    console.log(postData)
 
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE'
      })
    };

    this.http.post(url, postData, httpOptions).subscribe((data) => {
      console.log('postData:', postData)
      console.log('data', data);
      this.user = data

      if (this.user.length != 0){
        console.log("pass")
      }else{
        this.noUserFound();
      }
      
      }, error => {
          console.log(error);
      });


  }

  

  sendRequest(){
    this.submitted =true;
    var url = 'https://buddyfind.herokuapp.com/sendRequest';

    var postData = JSON.stringify({
     currentUser: this.id,
     receiverId: document.getElementById('label1').textContent

     //front end value
    });

 
    console.log(postData)
 
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE'
      })
    };

    this.http.post(url, postData, httpOptions).subscribe((data) => {
      console.log('postData:', postData)
      console.log('data', data);
      
      }, error => {
          console.log(error);
      });


      this.router.navigate(['tabs/tab3']); //Navigate to tab3
    }


    async noUserFound() {
      //var requester = document.getElementById("username").textContent;
      const toast = await this.toastController.create({
      message: 'There is no users found based on the selected location.',
      duration: 2000,
      position: 'top',
      color: 'primary'
      });
      toast.present();
      }


  }




