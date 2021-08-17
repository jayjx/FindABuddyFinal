import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
import { ModalController } from '@ionic/angular';
import { UserProfilePage } from '../user-profile/user-profile.page';


const { Storage } = Plugins;
@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {

  requests: any = [];
  notifications: any =[];
  submitted: boolean = false;
  USERID: string = '2';
  requester: string;
  userId: string;
  requestId: string;
  status: string;
  isupdated = false;
  id: string;
  userid1: string;
  userid2: string;
  buddyid1: string;
  buddyid2: string;

  today: String = new Date().toISOString();
  year: any = new Date().getFullYear();

  displayDate: String;

  constructor(private route: ActivatedRoute, public http: HttpClient, private router: Router,  private toastController: ToastController, public modalController: ModalController) {
    this.id = this.route.snapshot.params.id;
    
    console.log('Userid' + this.id)
   }


  ngOnInit() {
    this.getRequests();
    this.getNotification();
    console.log(this.today)
  }
  async getRequests(){
    var url = 'https://itj-findabuddy.herokuapp.com/notification/'+this.id+'';
    this.http.get(url).subscribe(data => {
      this.requests = data
      console.log(data)
    })
  }
  async getNotification(){
    var urlNotification = 'https://itj-findabuddy.herokuapp.com/requestResult';
    this.http.get(urlNotification).subscribe(notiData => {
      this.notifications = notiData
      console.log(notiData)
      
    })
  }

  accept(list){
    console.log("button: " + list.idRequest)

    var url = 'https://itj-findabuddy.herokuapp.com/update';
    var status = "Accepted";
/*     for (let request of this.requests){
      this.requestId = request.idRequest 
    } */
    console.log(this.requestId)


    var insertBuddy  = JSON.stringify({
      requestId: list.idRequest,
      userid1: this.id,
      buddyid1: document.getElementById("label2").textContent,
      userid2: document.getElementById("label2").textContent,
      buddyid2: this.id,
      today: this.today,
      status: "Accepted",
    })

    console.log("insert: " + insertBuddy)

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE'
      })
    };

      this.http.post(url, insertBuddy, httpOptions).subscribe((data) => {
        console.log('postData:', insertBuddy)
        console.log('data', data);
        console.log(this.requestId)
        if (data != null)
        {
          window.location.reload();
          console.log(data);
  
        }
        else{
          console.log(data);
  
          }
        }, error => {
            console.log(error);
        });
     
    //  window.location.reload();

      this.requestAccepted();
    
    // this.router.navigate(['notification/'+this.USERID+'']); //Navigate back after updating the db

    // window.location.reload();
    }

    reject(list){
      console.log("button: " + list.idRequest)
      this.requester = list.username;
      var url = 'https://itj-findabuddy.herokuapp.com/update';
     /*  for (let request of this.requests){
        this.requestId = request.idRequest 
      } */
      var postData = JSON.stringify({
       requestId: list.idRequest,
       status: "Rejected",
       today: this.today
       
      });
      console.log('test: ' + postData)
   
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
        console.log(this.requestId)
        if (data != null)
        {
         // window.location.reload();
        // this.router.navigate(['notification/'+this.USERID+'']);
        this.router.navigate(['notification/'+this.id+''])
  .then(() => {
    window.location.reload();
  });
          console.log(data);

        }
        else{
          console.log(data);

          }
        
        }, error => {
            console.log(error);
        });
  
      //  console.log(status)

        this.requestRejected();


      }



    async loginUser() {
      const { value } = await Storage.get({ key: 'userID' });
      console.log('Got item: ', value);
      this.id = value;
      console.log(this.id)
    }

  
  async requestAccepted() {
    var requester = document.getElementById("username").textContent;
    const toast = await this.toastController.create({
    message: 'You have accepted ' + requester + ' buddy request.',
    duration: 1000,
    position: 'top',
    color: 'secondary'
    });
    toast.present();
    return true;
    }

  async requestRejected() {
   // var requester = document.getElementById("username").textContent;
    const toast = await this.toastController.create({
    message: 'You have rejected ' + this.requester + ' buddy request.',
    duration: 2000,
    position: 'top',
    color: 'secondary'
    });
    toast.present();
    }
    

    async displayProfile(list){

      console.log(list)
      const modal = await this.modalController.create({
        
        component: UserProfilePage,
        
        componentProps: {
          'username': list.username,
          'gender': list.Gender,
          'fitnessLevel': list.fitnessLevel,
          'image': list.image,
          'address': list.address,
          'age': this.year - Number(list.DOB.slice(-4)),
        },
        cssClass: 'my-custom-modal-css',
        

      })
      console.log(list)
      return await modal.present();
    
    }

    delete(noti){
      var url = 'https://itj-findabuddy.herokuapp.com/deleteNoti';
      var deletedata = JSON.stringify({
      requestId : noti.idRequest
      });
      console.log(noti)
      const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE'
      })
      };
      this.http.post(url, deletedata, httpOptions).subscribe((data) => {
      console.log('deletedata:', deletedata)
      console.log(data);
      if (data != null) {
        window.location.reload();

      // this.failed()
      } 
      }, error => {
      console.log(error);
      });

      }
      
}
