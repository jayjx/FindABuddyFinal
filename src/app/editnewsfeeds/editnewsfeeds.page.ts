import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { NewsfeedsService } from '../shared/services/newsfeeds.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FileUploadService } from '../file-upload.service'
import { formatDate } from '@angular/common';
import { Storage } from '@capacitor/storage';
import { ToastController } from '@ionic/angular';
import { Location } from '@angular/common';


@Component({
  selector: 'app-editnewsfeeds',
  templateUrl: './editnewsfeeds.page.html',
  styleUrls: ['./editnewsfeeds.page.scss'],
})
export class EditnewsfeedsPage implements OnInit {
  idNewsFeeds: any;
  paramuserID: any;
  arr: any = {};
  editnewsfeeds: any = [];
  submitted: boolean = false;
  picture:File | null = null;
  source:string;
  filename:string;
  fileToUpload: File | null = null;
  // Variable to store shortLink from api response
  shortLink: string = "";
  loading: boolean = false; // Flag variable
  file: File = null; // Variable to store file
  //date
  currentDate = new Date();
  id:string;
  constructor(public http: HttpClient, public newsfeedService: NewsfeedsService,public Snaprouter: ActivatedRoute,public router: Router,
    private fileUploadService: FileUploadService,public toastController: ToastController,private prev_location: Location) { 
    this.idNewsFeeds = this.Snaprouter.snapshot.params.idNewsFeeds;
    this.paramuserID = this.Snaprouter.snapshot.params.userID;
    this.editnewsfeeds = new FormGroup({
      title: new FormControl('', [Validators.required]),
      caption: new FormControl('' ,[Validators.required]),
      picture: new FormControl('' ,[Validators.required]),
      createdate: new FormControl(),
      editdate: new FormControl(),
      userid: new FormControl(''),
      });
  }
  
  ngOnInit() {
    // if (this.arr.userID != this.paramuserID)
    // {
    //   console.log(this.arr.userID,this.id);
    //   this.presentToast();
    //   this.prev_location.back();
    // }
      console.log("editpage", this.idNewsFeeds)
    this.get1newsfeeds()
    }

    async presentToast() {
      const toast = await this.toastController.create({
        message: 'Unable to edit others post',
        duration: 2000
      });
      toast.present();
    }

    async loginUser() {
      const { value } = await Storage.get({ key: 'userID' });
      console.log('edituserid: ', value);
      this.id = value;
    }

    async get1newsfeeds() {
      const { value } = await Storage.get({ key: 'userID' });
      this.id = value;
    var url = 'https://buddyfind.herokuapp.com/1NewsFeeds';
    var get1newsfeeds = JSON.stringify({
    userID:this.id,
    idNewsFeeds : this.idNewsFeeds
    });
    
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE'
      })
    };

    this.http.post(url, get1newsfeeds, httpOptions).subscribe((data) => {
    console.log('get1newsfeeds:', get1newsfeeds)
    this.arr = data[0];
    
    if (data != null) {
      this.arr = data[0];
      console.log('array data:', this.arr)
      console.log(this.currentDate);
    } else {
    // this.failed()
    }
    }, error => {
    console.log(error);
    });
    }

    onFileChanged(event) {
      this.picture = event.target.files[0];
      console.log("file",this.picture);
      if(event.target.files.length > 0) 
      {
        console.log("filename",event.target.files[0].name);
        this.filename = event.target.files[0].name;
      }
      this.editnewsfeeds.controls['picture'].setValue('../../assets/newsfeedsimg/' + this.filename);
      
      
    }
    fileinput(){
      this.loading = !this.loading;
        console.log("this.file",this.file);
        this.fileUploadService.upload(this.file).subscribe(
            (event: any) => {
                if (typeof (event) === 'object') {
  
                    // Short link via api response
                    this.shortLink = event.link;
  
                    this.loading = false; // Flag variable 
                }
            }
        );
    }
  
    update() {this.submitted = true;
      if(this.editnewsfeeds.valid) {
      if(confirm("Are you sure to update ?")){
      this.submitted = true;
      const formatDate1 = formatDate(this.currentDate, 'yyyy-MM-dd  HH:mm:ss' , 'en-US');
      
      // this.submitted = true;
      // if (this.editProductForm.valid) {
      // var veg="false"
      // if(this.editProductForm.value['vegetarian']){
      // veg="true"
      // }
      
      var url = 'https://buddyfind.herokuapp.com/Editnewsfeeds';
      var updateddata = JSON.stringify({
      userID:this.id,
      title: this.editnewsfeeds.value['title'],
      caption:this.editnewsfeeds.value['caption'],
      picture:this.editnewsfeeds.value['picture'],
      createdate:this.editnewsfeeds.value['createdate'],
      editdate:formatDate1,
      idNewsFeeds:this.idNewsFeeds,
      });
      var updatedarrdata = JSON.parse(updateddata);
      
      const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE'
      })
      };
      this.http.post(url, updatedarrdata, httpOptions).subscribe((data) => {
      console.log("updateddata",updatedarrdata)
      console.log("data",data);
      
      if (data ==true) {
      window.location.reload();
      this.arr = data;
      console.log("data",data);
      } else {
      // this.failed()
      }
      }, error => {
      console.log(error);
      });
      this.router.navigate(['tabs/tab4']);
     }//if valid
    }
  }
}