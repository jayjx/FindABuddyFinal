import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NewsfeedsService } from '../shared/services/newsfeeds.service';
import { NewsfeedsLikesService } from '../shared/services/newsfeedslikes.service';
import { Storage } from '@capacitor/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { IonSearchbar, ToastController } from '@ionic/angular';
import { Newsfeeds } from '../shared/model/Newsfeeds';
import { NewsfeedsLikes } from '../shared/model/newsfeedslikes';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  NewsFeeds: any = [];
  NewsFeedsmodel : Newsfeeds[] = [];
  NewsfeedsLikes: any = [];
  NewsFeedslikesmodel : NewsfeedsLikes[] = [];
  NewsFeedslikesmodelnew : any = [];
  @ViewChild('searchBar', {static: false}) searchBar: IonSearchbar;
  arr: any = {};
  seelikesarr: any = {};
  seelikesstring : any = {};
  newsfeedsId: string;
  newsfeedsIdarr: any = {};
  pass1: any;
  pass2: any;
  idexist: boolean = false;
  visible: boolean = true;
  id: string;
  
  constructor(private Snaprouter:ActivatedRoute,public http: HttpClient, public newsfeedService: NewsfeedsService,
    public toastController: ToastController,public router: Router, public newsfeedlikesService : NewsfeedsLikesService,
    public alertController: AlertController) { 
    this.NewsFeeds = this.newsfeedService.getnewsfeedsservice();
    this.NewsfeedsLikes = this.newsfeedlikesService.getnewsfeedslikesservice();
    this.id = this.Snaprouter.snapshot.params.id;
  }

  ngOnInit() {
    this.loginUser()
    //this.getNewsfeeds()
    // var link = document.getElementById('validate1');
    //     console.log('test',link)
    //   this.validate1(this.NewsFeeds)
    //   this.validate2(this.NewsFeeds)
  }
  //get userID after login   

    async presentToastdelete() {
      const toast = await this.toastController.create({
        message: 'Unable to delete others post',
        duration: 2000
      });
      toast.present();
    }

    async presentToastedit() {
      const toast = await this.toastController.create({
        message: 'Unable to edit others post',
        duration: 2000
      });
      toast.present();
    }

    async loginUser() {
      const { value } = await Storage.get({ key: 'userID' });
      this.id = value;
      console.log('tab4userid: ', this.id);
      this.getNewsfeeds();    
    }

    search(event) {
      const text = event.target.value;
      const allnewsfeeds = this.NewsFeedsmodel;
    
      if (text && text.trim() !== '') {
      this.NewsFeeds = allnewsfeeds.filter(
      item => item.title.toLowerCase().includes(text.toLowerCase()));
      } else {
      // Blank text, clear the search, show all products
      this.NewsFeeds = allnewsfeeds;
      }
    }

    refresh(event) {
      this.searchBar.value = '';
      event.target.complete();
      }

    async getNewsfeeds(){
      var url = 'https://buddyfind.herokuapp.com/NewsFeeds';
      var getuserID = JSON.stringify({
      userID1: this.id,
      userID2: this.id,
      userID3: this.id,
        });
      console.log('Userid', getuserID)
      const httpOptions = {
        headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE'
        })
        };

      this.http.post(url, getuserID, httpOptions).subscribe((data) => {
        this.NewsFeeds = data;
        this.NewsFeedsmodel = this.NewsFeeds;
        console.log('newsfeedsmodel',this.NewsFeedsmodel);
        // for(var i = 0, len = this.NewsFeedsmodel.length; i < len; i++) 
        //     {
        //       this.newsfeedsIdarr = this.NewsFeedsmodel[0]['idNewsFeeds'];
        //       console.log('newsfeedsmodelarr',this.newsfeedsIdarr); //Would give you the id of each client
        //     }
        this.getlikes();
        }, error => {
            console.log(error);
        });
      }

    async presentAlert(item) {
      // localStorage.setItem("LikedBy", item);
      // let storeditem = localStorage.getItem("LikedBy");
      // let displayitem = JSON.parse(storeditem);
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Liked By',
        subHeader: '',
        message: item,
        buttons: ['OK']
      });
  
      await alert.present();
  
      const { role } = await alert.onDidDismiss();
      console.log('onDidDismiss resolved with role', role);
    }
      async seelikes(item){
        var url = 'https://buddyfind.herokuapp.com/Seelikes';
        var seelikes = JSON.stringify({
          idNewsFeeds : item.idNewsFeeds
          });
        const httpOptions = {
          headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE'
          })
          };
        this.http.post(url, seelikes, httpOptions).subscribe((data) => {
          console.log("seelikes",data)
          if(data == false){
            this.seelikesarr = ""
        }
        else {
          var re = /{|}|{}|:|,|"|username|[[]|]/g
          this.seelikesarr = JSON.stringify(data).replace(re, ' ')
        }
        this.presentAlert(this.seelikesarr);
        }, error => {
          console.log(error);
      });
      }

      async getlikes(){
        for(var i = 0, len = this.NewsFeedsmodel.length; i < len; i++) 
              {
                var index = 0;
                this.newsfeedsIdarr = this.NewsFeedsmodel[index]['idNewsFeeds'];
                console.log('newsfeedsmodelarr',this.newsfeedsIdarr); //Would give you the id of each client
                this.postlikes();
                if (this.postlikes != null)
                {
                  for(var i = 0, len = this.NewsFeedsmodel.length; i < len; i++) 
                  {
                  index ++;
                  this.newsfeedsIdarr = this.NewsFeedsmodel[index]['idNewsFeeds'];
                  this.postlikes(); 
                  console.log('id/like',index,this.newsfeedsIdarr);
                  }
                }
                else if  (this.postlikes == null)
                {
                  return
                }
                else{
                  return;
                }
                
        }
      }
      async postlikes(){
        var url = 'https://buddyfind.herokuapp.com/Getlikes';
        var getnewsfeedslikeswithid = JSON.stringify({
          idNewsFeeds : this.newsfeedsIdarr
          });
        console.log('newsfeedsidforlike', getnewsfeedslikeswithid)
        const httpOptions = {
          headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE'
          })
          };
        this.http.post(url, getnewsfeedslikeswithid, httpOptions).subscribe((data) => {
          this.NewsfeedsLikes = data;
          const obj = {...this.NewsfeedsLikes};
          console.log('likescount', obj)
          this.NewsFeedslikesmodel.push(obj)
          //this.NewsFeeds.push(obj)
          console.log('finallikescount', this.NewsFeeds)
          
          for (var i = 0, len = this.NewsFeedslikesmodel.length; i < len; i++){
            var index = 0;
            this.pass1 = this.NewsFeedslikesmodel[index][i]['idNewsFeeds']
            this.pass2 = this.NewsFeedslikesmodel[index][i]['likes']
            this.changelike( this.pass1,this.pass2)
            if (index < this.NewsFeedslikesmodel.length)
            {
              for (var i = 0, len = this.NewsFeedslikesmodel.length; i < len; i){
                index ++;
                this.pass1 = this.NewsFeedslikesmodel[index][i]['idNewsFeeds']
                this.pass2 = this.NewsFeedslikesmodel[index][i]['likes']
                this.changelike( this.pass1,this.pass2)
                // var link = document.getElementById('validate1');
                // console.log('test',link)
                // this.validate1(this.NewsFeeds)
                // this.validate2(this.NewsFeeds)
                console.log('pass', this.pass1,this.pass2,this.NewsFeedslikesmodel.length)
              }
            }
              else{
                return
              }
          }
          
        }, error => {
          console.log(error);
      });
      }
      async changelike( idnewsfeeds, likes ) {
        for (var i in this.NewsFeeds) {
          if (this.NewsFeeds[i].idNewsFeeds == idnewsfeeds) {
            this.NewsFeeds[i].likes = likes;
            return
          }
        }
     }

     async likepost(item){
      var url = 'https://buddyfind.herokuapp.com/Likepost';
      var likepost = JSON.stringify({
      userID : this.id,
      idNewsFeeds : item.idNewsFeeds
      });
      const httpOptions = {
        headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE'
        })
        };
      this.http.post(url, likepost, httpOptions).subscribe((data) => {
        console.log('data', data);
         },error => {
            console.log(error);
        });
      }

    async unlikepost(item){
      var url = 'https://buddyfind.herokuapp.com/Unlikepost';
      var unlikepost = JSON.stringify({
      userID : this.id,
      idNewsFeeds : item.idNewsFeeds
      });
      const httpOptions = {
        headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE'
        })
        };
      this.http.post(url, unlikepost, httpOptions).subscribe((data) => {
        console.log('data', data);
        
         },error => {
            console.log(error);
        });
      }

    async addToFav(item) {
      const toastlike = await this.toastController.create(
        {message: ' Liked Post ' + item.title,
      duration: 2000,
      });
      const toastunlike = await this.toastController.create(
        {message: ' Unliked Post ' + item.title,
      duration: 2000,
      });
      var url = 'https://buddyfind.herokuapp.com/CheckLikes';
      var checklike = JSON.stringify({
      userID : this.id,
      idNewsFeeds : item.idNewsFeeds
      });
      const httpOptions = {
        headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE'
        })
        };
      this.http.post(url, checklike, httpOptions).subscribe((data) => {
        console.log('data', data);
        //if not liked
        if (data == false)
          {
            toastlike.present(); 
            this.likepost(item);
            this.getNewsfeeds();
          }
        //if liked
        else
          {
            toastunlike.present(); 
            this.unlikepost(item);
            this.getNewsfeeds();
          }
        }, error => {
          console.log(error);
      });
    }
    // validate1(item)
    //   {
    //     for(var i = 0, len = this.NewsFeedsmodel.length; i < len; i++) {
    //       var link = document.getElementById("validate1");
    //       var validateuserid = this.NewsFeedsmodel[i]['userID'];
    //       if(validateuserid == this.id) {
    //         link.style.visibility = "visible";
    //         console.log('validate',item)}
    //         else{
    //           link.style.visibility = "hidden";
    //           return
    //         }
    //       }
    //     }
        
    // validate2(item)
    //   {
    //     for(var i = 0, len = this.NewsFeedsmodel.length; i < len; i++) {
    //       var link = document.getElementById("validate2");
    //       var validateuserid = this.NewsFeedsmodel[i]['userID'];
    //       if(validateuserid == this.id) {
    //         link.style.visibility = "visible";
    //         console.log('validate',item)}
    //         else{
    //           link.style.visibility = "hidden";
    //           return
    //         }
    //       }
    //     }
        
    validate(item)
    {
      if(item.userID != this.id) {
        
        this.router.navigate(['tabs/tab4']);
        this.presentToastedit();
        // var link = document.getElementById("edit");
        // link.style.visibility = "hidden";
        // this.visible = false;
    
      }
    }

    delete(item){
      if (item.userID != this.id) {
          this.presentToastdelete();
          this.visible = false;
        }
      else if(confirm("Are you sure to delete ?")) {
    console.log("deleteuserid:" , this.id)
    var url = 'https://buddyfind.herokuapp.com/Deletenewsfeeds';
    var deletedata = JSON.stringify({
    userID: this.id,
    idNewsFeeds : item.idNewsFeeds
    });
    
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
    if (data == true) {
    // this.successful()
    window.location.reload();
    }
    }, error => {
    console.log(error);
    });
    }
  }
}
  

