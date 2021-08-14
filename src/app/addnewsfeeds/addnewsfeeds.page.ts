import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FileUploadService } from '../file-upload.service'
import { DatePipe, formatDate } from '@angular/common';
import { Storage } from '@capacitor/storage';
@Component({
  selector: 'app-addnewsfeeds',
  templateUrl: './addnewsfeeds.page.html',
  styleUrls: ['./addnewsfeeds.page.scss'],
})
export class AddnewsfeedsPage implements OnInit {
  addnewsfeeds: FormGroup;
  picture:File | null = null;;
  submitted: boolean = false;

  source:string;
  filename:string;
  fileToUpload: File | null = null;
  // Variable to store shortLink from api response
  shortLink: string = "";
  loading: boolean = false; // Flag variable
  file: File = null; // Variable to store file
  currentDate = new Date();
  id:string;

    constructor(public http : HttpClient, public router : Router,private fileUploadService: FileUploadService) { 
    this.addnewsfeeds = new FormGroup({
      title: new FormControl('', [Validators.required]),
      caption: new FormControl('', [Validators.required]),
      picture: new FormControl('', [Validators.required]),
      createdate: new FormControl(''),
      editdate: new FormControl(''),
      });
  }

  ngOnInit() {
    this.loginUser();
    const formatDate1 = formatDate(this.currentDate, 'yyyy-MM-dd  HH:mm:ss' , 'en-US');
    this.addnewsfeeds.controls['createdate'].setValue(formatDate1);
    this.addnewsfeeds.controls['editdate'].setValue(formatDate1);
    
  }
  async loginUser() {
    const { value } = await Storage.get({ key: 'userID' });
    console.log('adduserid: ', value);
    this.id = value;
  }
  
  add(){this.submitted = true;
    if(this.addnewsfeeds.valid) {
    if(confirm("Are you sure to add "+ this.id +'?')){
    var url = 'https://buddyfind.herokuapp.com/Addnewsfeeds';
    var addnewsfeeds = JSON.stringify({
    userID:this.id,
    title: this.addnewsfeeds.value['title'],
    caption: this.addnewsfeeds.value['caption'],
    picture: this.addnewsfeeds.value['picture'],
    createdate:this.addnewsfeeds.value['createdate'],
    editdate:this.addnewsfeeds.value['editdate']
    });
  
    const httpOptions = {
    headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE'
    })

    };
    this.http.post(url, addnewsfeeds, httpOptions).subscribe((data) => {
      console.log('addnewsfeeds:', addnewsfeeds)
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
      this.router.navigate(['tabs/tab4']); //once added relocate to tab2
      }
    }
  }
  onFileChanged(event) {
    this.picture = event.target.files[0];
    console.log("file",this.picture);
    if(event.target.files.length > 0) 
    {
      console.log("filename",event.target.files[0].name);
      this.filename = event.target.files[0].name;
    }
    this.addnewsfeeds.controls['picture'].setValue('../../assets/newsfeedsimg/' + this.filename);
    
    
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
}

    

