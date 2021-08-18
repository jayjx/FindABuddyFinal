import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  
  authentication: any = [];
  email: string = "";
  password: string = "";
  submitted: boolean = false;
  loginForm: FormGroup;
  id: string;
  userEmail: string; 
  username: string; 

  constructor(private route: ActivatedRoute, public http: HttpClient, private router: Router, private modalController:ModalController, private toast:ToastController,) { 
    this.loginForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl(''),
  })
}

  ngOnInit() {
  }

  loginButton(){
    this.submitted =true;
    var url = 'https://itj-findabuddy.herokuapp.com/authentication';

    var email = this.loginForm.value['email']
    var password = this.loginForm.value['password']

  console.log("email " + email + " pwd " + password) 
 
  var postData = JSON.stringify({
    email: email,
    password: password,
  }); 
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE'
      })
    };

    
    this.http.post(url, postData, httpOptions).subscribe((data) => {  
      console.log("test: " + data)
      console.log(postData)
      if (data[0] != null) {   
        console.log(data)
       
        this.authentication= data        
      for (let userId of this.authentication ) {
        this.id = userId.userID;
        this.username = userId.username
        console.log('id: ' + this.id)
        console.log('id: ' + this.username)
        this.setLogin()//session
       // this.modalController.dismiss();
        console.log(this.id)
        this.router.navigate(['tabs/tab1/'+this.id]); //Navigate to tab1
   }
      } else {
        this.loginFail();
        console.log("Login Failed") 
        console.log(data)  
      }
     }, error => {
        console.log(error);
    });
  
  
  }
  async setLogin() {
    await Storage.set({
      key: 'userID', 
      value: this.id, 
      
    });
    await Storage.set({
      key: 'username', 
      value: this.username,
    });
  
  
  }

  async loginFail() {

    let toast = await this.toast.create({
      message: 'Error! Login failed ' ,
      duration: 3000,
      position: 'top'
    });
    return await toast.present();
  
  }

  async loginUser() {
    const { value } = await Storage.get({ key: 'userID' });
    console.log('Got item: ', value);
    this.id = value;
    console.log(this.id)
  }

  
}





