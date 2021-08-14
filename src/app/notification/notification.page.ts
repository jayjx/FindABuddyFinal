import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;
@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {

  requests: any = [];
  submitted: boolean = false;
  USERID: string = '2';

  userId: string;
  requestId: string;
  status: string;
  isupdated = false;
  id: string;
  userid1: string;
  userid2: string;
  buddyid1: string;
  buddyid2: string;

  constructor(private route: ActivatedRoute, public http: HttpClient, private router: Router,  private toastController: ToastController) {
    this.id = this.route.snapshot.params.id;
    
    console.log('notiUserid' + this.id)
   }


  ngOnInit() {
    
    
    var url = 'https://buddyfind.herokuapp.com/notification/'+this.id+'';
    this.http.get(url).subscribe(data => {
      this.requests = data
      console.log('notidata:' +data)
    })

  }



  accept(){
    var url = 'https://buddyfind.herokuapp.com/update';
    var status = "Accepted";
    for (let request of this.requests){
      this.requestId = request.idRequest 
    }
    var postData = JSON.stringify({
     requestId: this.requestId,
     status: "Accepted"
     
    });

    var insertBuddy  = JSON.stringify({
      userid1: this.id,
      buddyid1: document.getElementById("label2").textContent,
      userid2: document.getElementById("label2").textContent,
      buddyid2: this.id,
    })

    console.log('test: ' + postData)
    console.log("insert: " + insertBuddy)

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
        window.location.reload();
        console.log(data);

      }
      else{
        console.log(data);

        }
      }, error => {
          console.log(error);
      });

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

      this.requestAccepted();
  //    this.router.navigate(['notification/'+this.USERID+'']); //Navigate back after updating the db

    }

    reject(){
      var url = 'https://buddyfind.herokuapp.com/update';
      for (let request of this.requests){
        this.requestId = request.idRequest 
      }
      var postData = JSON.stringify({
       requestId: this.requestId,
       status: "Rejected"
       
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
    }

    async requestRejected() {
      var requester = document.getElementById("username").textContent;
      const toast = await this.toastController.create({
      message: 'You have rejected ' + requester + ' buddy request.',
      duration: 2000,
      position: 'top',
      color: 'secondary'
      });
      toast.present();
      }

}
