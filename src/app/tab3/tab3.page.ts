import { Route } from '@angular/compiler/src/core';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Plugins } from '@capacitor/core';
import { IonSearchbar, AlertController, ToastController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { ViewChild } from '@angular/core';


const { Storage } = Plugins;

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  user: any = [];
  check: any = [];

  @ViewChild('searchBar', {static: false}) searchBar: IonSearchbar;


  submitted: boolean = false;
  send: boolean = true;
  searchBuddy: FormGroup;

  id: string;
  userEmail: string; 


  imageUrl = null;
 photo: Blob;

 latitude: any = 0; //latitude
 longitude: any = 0; //longitude
 address: string = ''
currentLocation: string = '' 
 today: String = new Date().toISOString();


 year: any = new Date().getFullYear();
age: any;
checkAge: boolean = false;
userAge: any =[]

  constructor(private route: ActivatedRoute, public http: HttpClient, private router: Router, private toastController: ToastController, private alertCtrl: AlertController, private geolocation: Geolocation,     private nativeGeocoder: NativeGeocoder
    ) {

    this.searchBuddy = new FormGroup({
      
      location: new FormControl('Select a location', [Validators.required]),
    })
    
  }

  isItemAvailable: boolean = false;
  items = [];
  current = [];

  initializeItems(){
    
      this.items = ["Aljunied", "Ang Mo Kio", "Bedok", "Bishan", "Boon Lay", "Bukit Batok",
      "Bukit Merah", "Bukit Panjang", "Bukit Timah", "Changi", "Clementi",
      "East Coast", "Hougang", "Jurong","Marina Bay", "Sembawang", "Tampines", "Toa Payoh",
    "Woodlands"];
  }

  getItems(ev: any) {
      // Reset items back to all of the items
      this.initializeItems();

      // set val to the value of the searchbar
      const val = ev.target.value;

      // if the value is an empty string don't filter the items
      if (val && val.trim() !== '') {
          this.isItemAvailable = true;
          this.items = this.items.filter((item) => {
              return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
          })
      } else {
        
          this.isItemAvailable = false;
          this.randomUsers();
      }
  }




  async loginUser() {
    const { value } = await Storage.get({ key: 'userID' });
    console.log('Got item: ', value);
    this.id = value;
    console.log(this.id)
          var url = 'https://itj-findabuddy.herokuapp.com/randomUsers';


    var postData = JSON.stringify({
      currentUser: this.id,

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
       
       this.user = data;
       for (let i = 0; i < this.user.length; i++) {
        this.age = this.year - Number(data[i]["DOB"].slice(-4))
        data[i]["DOB"] =this.age
      }

       if (data != null){
         console.log(data) //error msg
        this.checkAge = true;
        console.log(this.checkAge)
        
       }

      else{
       }
       }, error => {
           console.log(error);
       });
 
  }

  ngOnInit(){
    //window.location.reload();
    this.loginUser()
    
    this.getCurrentLocation();
  }

  search(item){
    console.log(item)
//    this.submitted =true;


    var url = 'https://itj-findabuddy.herokuapp.com/getUser';

    if (item === "current"){
      item = this.currentLocation
      console.log(item)
    }
    

    var postData = JSON.stringify({
      currentUser: this.id,

      location: item
      //front end value
    });

  
    console.log(postData[2])
 
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
        for (let i = 0; i < this.user.length; i++) {
          this.age = this.year - Number(data[i]["DOB"].slice(-4))
          data[i]["DOB"] =this.age
          
          console.log(data[i]["DOB"])
          console.log(data)
         }
      }
      else if (this.user == null){
       this.randomUsers();
       
      }
      else{
        this.noUserFound();
      }
      }
      
      , error => {
          console.log(error);
      })

  }
  

  

  async presentAlert() {
    const alert = await this.alertCtrl.create({
    subHeader: 'Request Sent!',
    message: 'You have already sent a request to the user.',
    buttons: ['Dismiss']
   });
   await alert.present(); 
}
  
   sendRequest(list){
    this.submitted =true;
    console.log(list.userID)
    var url = 'https://itj-findabuddy.herokuapp.com/sendRequest';
    var postData = JSON.stringify({
     currentUser: this.id,
     receiverId: list.userID,
     today: this.today

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
      this.check = data;
      console.log(this.check);
      if (this.check.length == 1){
        this.presentAlert();
        console.log("request has been sent.") //error msg
      }else{
        this.requestSent();
      }
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

    getCurrentLocation(){
      this.geolocation.getCurrentPosition().then((resp) => {
        // resp.coords.latitude
        // resp.coords.longitude
        this.latitude = resp.coords.latitude;
        this.longitude = resp.coords.longitude;
        console.log(this.latitude)
        }).catch((error) => {
          console.log('Error getting location', error);
        });
        
        let watch = this.geolocation.watchPosition();
        watch.subscribe((data) => {
        // data can be a set of coordinates, or an error (if an error occurred).
    
    
        var url = 'https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat='+this.latitude+'&lon='+this.longitude
        console.log(url)
        this.http.get(url).subscribe(data => {
          // this.requests = data
          this.currentLocation = data["address"]["suburb"]
          console.log(data["address"]["suburb"])
        })
  
        // return this.currentLocation
        });
    } 

    async randomUsers(){
      var url = 'https://itj-findabuddy.herokuapp.com/randomUsers';
      var postData = JSON.stringify({
        currentUser: this.id,

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
         this.user = data;
         this.age = data[0]["DOB"]

         console.log(this.check);
         if (data != null){
           console.log(data) //error msg
         }
        
        else{
         }
         }, error => {
             console.log(error);
         });
   
    }
    async requestSent() {
      const alert = await this.alertCtrl.create({
      subHeader: 'Request Sent!',
      message: 'Buddy request has been sent.',
      buttons: ['Dismiss']
    });
    await alert.present(); 
    }



  }




