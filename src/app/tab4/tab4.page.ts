import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NewsfeedsService } from '../shared/services/newsfeeds.service';
import { NewsfeedsLikesService } from '../shared/services/newsfeedslikes.service';
import { Storage } from '@capacitor/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { IonSearchbar, ToastController } from '@ionic/angular';
import { Newsfeeds } from '../shared/model/Newsfeeds';
import { NewsfeedsLikes } from '../shared/model/newsfeedslikes';
import { variable } from '@angular/compiler/src/output/output_ast';

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
  NewsFeedslikesmodelnew : any = {};
  @ViewChild('searchBar', {static: false}) searchBar: IonSearchbar;
  arr: any = {};
  newsfeedsId: string;
  newsfeedsIdarr: any = {};
  idexist: boolean = false;
  id: string;
  constructor(private Snaprouter:ActivatedRoute,public http: HttpClient, public newsfeedService: NewsfeedsService,
    public toastController: ToastController,public router: Router, public newsfeedlikesService : NewsfeedsLikesService) { 
    this.NewsFeeds = this.newsfeedService.getnewsfeedsservice();
    this.NewsfeedsLikes = this.newsfeedlikesService.getnewsfeedslikesservice();
    this.id = this.Snaprouter.snapshot.params.id;
  }

  ngOnInit() {
    this.loginUser()
    //this.getNewsfeeds()
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

    async likepost(){
      var url = 'https://buddyfind.herokuapp.com/Likepost';
      var likepost = JSON.stringify({
      userID : this.id,
      idNewsFeeds : this.newsfeedsId
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

    async unlikepost(){
      var url = 'https://buddyfind.herokuapp.com/Unlikepost';
      var unlikepost = JSON.stringify({
      userID : this.id,
      idNewsFeeds : this.newsfeedsId
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
      idNewsFeeds : this.newsfeedsId
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
        if (data == false)
          {
            toastlike.present(); 
            this.likepost();
            this.getNewsfeeds();
          }
        else
          {
            toastunlike.present(); 
            this.unlikepost();
            this.getNewsfeeds();
          }
        }, error => {
          console.log(error);
      });
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
        console.log('data', data);
        this.NewsFeeds = data;
        this.NewsFeedsmodel = this.NewsFeeds;
        console.log('newsfeedsmodel',this.NewsFeedsmodel);
        // for(var i = 0, len = this.NewsFeedsmodel.length; i < len; i++) 
        //     {
        //       this.newsfeedsIdarr = this.NewsFeedsmodel[0]['idNewsFeeds'];
        //       console.log('newsfeedsmodelarr',this.newsfeedsIdarr); //Would give you the id of each client
        //     }
        this.getid1by1();
        this.getlikes();
        }, error => {
            console.log(error);
        });
        
        
      }
      
      async getid1by1(){
        const getidforlike = this.NewsFeedsmodel;
        for (var i = 0, len = getidforlike.length; i < len; i++)
        {
          var getid1by1 = getidforlike[i]['idNewsFeeds'];
          this.newsfeedsId = getid1by1;
          if (getid1by1 > 0){
          this.idexist = true;
          } 
          else{
            this.idexist = false;
          }
          console.log("status",this.idexist);
          console.log("getid1by1",this.newsfeedsId);
          return this.newsfeedsId
      }
    }
    
      async postlikes(){
        var url = 'https://buddyfind.herokuapp.com/Getlikes';
        var getnewsfeedslikeswithid = JSON.stringify({
          idNewsFeeds : this.newsfeedsIdarr,
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
          this.NewsFeedslikesmodel = this.NewsfeedsLikes;
          console.log('likescount', this.NewsFeedslikesmodel)
          // var likesoutput:any;
          // this.NewsFeeds.array.forEach(this.newfeedsId ,val => {
          //   this.newfeedsId['count'] = val + 1;
          //   this.NewsfeedsLikes.array.forEach(this.NewsfeedsLikes,val => {
          //     if (this.newfeedsId == item.idNewsFeeds){
          //         this.NewsfeedsLikes = likesoutput;
          //         console.log("likesoutput", this.NewsFeeds.array)
          //         console.log("likesoutput", likesoutput)
          //     }
          //   });
          // });
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
                // if (this.postlikes != null)
                // {
                //   index ++;
                //   this.newsfeedsIdarr = this.NewsFeedsmodel[index]['idNewsFeeds'];
                //   this.postlikes();
                //   this.NewsFeedslikesmodel.push(...this.NewsFeedslikesmodel);
                //   console.log(index,this.newsfeedsIdarr,this.NewsFeedslikesmodel);
                // }
        }
      }

    validate(item)
    {
      if(item.userID != this.id) {
        this.router.navigate(['tabs/tab4']);
        this.presentToastedit();
      }
    }

    delete(item){
      if (item.userID != this.id) {
        // validate userid
          this.presentToastdelete();
        }
      else if(confirm("Are you sure to delete "+ this.id +'?')) {
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
  

