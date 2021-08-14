import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NewsfeedsService } from '../shared/services/newsfeeds.service';
import { NewsfeedsLikesService } from '../shared/services/newsfeedslikes.service';
import { Storage } from '@capacitor/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { IonSearchbar, ToastController } from '@ionic/angular';
import { Newsfeeds } from '../shared/model/Newsfeeds';
import { NewsfeedsLikes } from '../shared/model/newsfeedslikes';


@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  NewsFeedsmodel : Newsfeeds[] = [];
  NewsFeedslikesmodel : NewsfeedsLikes[] = [];
  NewsFeeds: any = [];
  NewsfeedsLikes: any = [];
  @ViewChild('searchBar', {static: false}) searchBar: IonSearchbar;
  arr: any = {};
  newfeedsId: string;
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
      //this.getlikes(this.NewsFeeds);
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

    async addToFav(item) {
      const toast = await this.toastController.create(
        {message: ' Liked Post ' + item.title,
      duration: 2000,
      });
      toast.present();
      }
        
    async getNewsfeeds(){
      var url = 'https://buddyfind.herokuapp.com/NewsFeeds';
      var getuserID = JSON.stringify({
      // idNewsFeeds : this.newfeedsId,
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
        this.getlikes(this.NewsFeeds);
        
        }, error => {
            console.log(error);
        });
      }

    async getlikes(item){
      var url = 'https://buddyfind.herokuapp.com/Getlikes';
      var getnewsfeedslikeswithid = JSON.stringify({
        idNewsFeeds : item.idNewsFeeds,
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
        console.log('likescount:', this.NewsfeedsLikes)
        console.log('data', data);

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
  
      this.NewsfeedsLikes = data;
      }, error => {
          console.log(error);
          console.log(error);
          
      });
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
  

