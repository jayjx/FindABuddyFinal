/* import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { color } from 'highcharts';
import { BehaviorSubject } from 'rxjs';



const circleR = 80; // Variable to store the circle radius
const circleDasharray = 2 * Math.PI * circleR; // Variable to store the circumeference of the cirlce. Readable formula is : Circumeference = 2 * PI(3.14...) * Radius

@Component({
  selector: 'app-plan-detail-countdown',
  templateUrl: './plan-detail-countdown.page.html',
  styleUrls: ['./plan-detail-countdown.page.scss'],
})
export class PlanDetailCountdownPage implements OnInit {

  destination : any ;
  dataObj : any ;
  sum : number = 0 ;
  timer : number; // in seconds 
  fitnessName : any;
  valuedMember: number;
  time : BehaviorSubject<string> = new BehaviorSubject('00:00');
  interval;
  startDuration = 1;
  percent : BehaviorSubject<number> = new BehaviorSubject(100);
  enhancedFitnessData : any = [];
  negativeNo = -1;

  dataArray = [];
  circleR = circleR;
  circleDasharray = circleDasharray;
   lengthOfObj;
   exTime : number;
   iterationNo : number;
   pause :boolean = false; // By default, countdown timer is paused

  state : 'start' | 'stop' = 'stop';


  constructor( public activatedRoute : ActivatedRoute, private toast:ToastController, private navCtrl: NavController) {  }

  ngOnInit() {
    let dataReceived = this.activatedRoute.snapshot.paramMap.get('dataObj') // Stores what is received from the previous view
    this.dataObj = JSON.parse(dataReceived) // parsing the data into a readable format
    this.lengthOfObj = this.dataObj.length; // Variable to store the how many workous are there in a plan

    for (var i = 0; i < this.lengthOfObj ; i++) { // Doing iteration so to get the total duration of the fitpness plan
      this.valuedMember  = parseInt(this.dataObj[i]['fitnessDuration']);
      this.sum = this.sum + this.valuedMember;
    }

    console.log('Sum of numbers is', this.sum); // Debugging function
        this.countdownFunction() // Calls the countdown function to start the timer and display what workout is it past & currently!
    

  
  }
  

  sleep(ms) { // Function for the JS thread not to interrupt the countdown process
    return new Promise(resolve => setTimeout(resolve,ms));
  }


 async countdownFunction() {
 //  if(this.pause == false) {
  if(this.iterationNo != 2 && this.pause == false){ 
   
  this.startTimer(this.sum); // Starts the timer. It parameters is the total duration of the workout
  console.log(this.lengthOfObj); // Debugging purposes
  var exerciseName; // Created this local variable for testing. I wanted to test if it can HTML can bind with variable. End up binding HTML element with Array is easier
  var exerciseDuration; // Created this local variable for testing. I wanted to test if it can HTML can bind with variable. End up binding HTML element with Array is easier
  var exerciseReps; // Created this local variable for testing. I wanted to test if it can HTML can bind with variable. End up binding HTML element with Array is easier
  var exerciseSets; // Created this local variable for testing. I wanted to test if it can HTML can bind with variable. End up binding HTML element with Array is easier
  var exercisephoto; // Created this local variable for testing. I wanted to test if it can HTML can bind with variable. End up binding HTML element with Array is easier
    for (var i = 0 ; i < this.lengthOfObj ; i++) { // Do a for loop to read through every workout in the plan
      this.dataArray.push(this.dataObj[i]); // Push the object values to array
      exerciseName = this.dataObj[i]['fitnessName']; // Assiging the local variable values
      exerciseDuration = this.dataObj[i]['fitnessDuration']; // Assiging the local variable values
      exerciseReps = this.dataObj[i]['fitnessReps']; // Assiging the local variable values
      exerciseSets = this.dataObj[i]['fitnessSet']; // Assiging the local variable values
      exercisephoto = this.dataObj[i]['fitnessPhoto']; // Assiging the local variable values

        console.log('Exercise Name', exerciseName); //Debugging purposes
        console.log('Exercise Duration', exerciseDuration);  //Debugging purposes
        console.log('Exercise Reps', exerciseReps); //Debugging purposes
        console.log('Exercise Sets', exerciseSets); //Debugging purposes

      await this.sleep((this.valuedMember * 1000)); // Convertes each workout duration to millisconds. Purpose of calling this sleep function, so the for loop wont be interrupted as JAvaSccript tends to run thing as a whole.
      console.log(i); // Debugging purposes

      if(i >= (this.lengthOfObj - 1)) { // If for loop iterates till the last object. This informs the users that timer is done
        console.log('Timer finish already'); // Debugging purposes
       this.stopTimer(); // Calls the stop timer function
        break; // break from the loop
      }
    }
    console.log('Inside of For Loop'); // Debugging purpose
console.log('Outside of For Loop'); // Debugging purpose
this.iterationNo = 2; // The purpose of this value is lets say the for loop is done loop, it will be assigned to this value. So that the javascript wont run this loop again. As this function is inside the default initalization function           
                            }

                            else {
                              console.log('Its s paused bro');
                            }
                          }
  


   startTimer(duration : number) { // This function starts the timer and its needs the duration of the workout to proceed
    this.state = 'start'; // Debugging purposes. Tried to add a stop and pause button. But with my effort, I couldnt let it work as I want it to be
    console.log('Start Timer');  // Debugging purposes
    this.timer = duration * 60; // Converts minutes to seconds
    this.updateTimeValue(); // Calls this to update the timer reptitvely 
    setInterval( () => {
        this.updateTimeValue();
    }, 1000) // Set the interval to every 1 second
}

  swapDuration() {
    this.startDuration = this.startDuration === 1 ? 0.5 : 1; // Debugging purposes. Tried to add a stop and pause button. But with my effort, I couldnt let it work as I want it to be
  }

 async updateTimeValue() { // Function to update the timer recursively 
    if(this.iterationNo != 2 && this.pause == false){ // If first time iterating, then it will proceed further. I done it this way because once the timer expires, it restarts the timer automatically. Currently, this is my improvised walkaround for this
      console.log('Checking if this works man'); // Debugging purposes
    let minutes : any = this.timer / 60; // Converts seconds to minutes
    let seconds : any = this.timer % 60; // Reminder will be added as second. % stands for reminder when doing divide
    minutes = String('0' + Math.floor(minutes)).slice(-2); //To show this in countdown timer, minutes part
    seconds = String('0' + Math.floor(seconds)).slice(-2); // To show this in countdown timer, seconds part
    const text = minutes + ' : ' + seconds ; // This is what is displayed in the timer. I set the formart to MM:SS
    this.time.next(text);
    const totalTime = this.startDuration * 60; 
    const percentage = ((totalTime - this.timer) / totalTime) * 100;
    this.percent.next(percentage);
   this.timer = this.timer - 1;

    if(this.timer < -1) { // If timer reaches -1, the timer will expire by calling stop timer function
    this.stopTimer();
    }
    }

    else {   
      console.log('Its paused man')
    }
  }

  stopTimer() { // This function is used to stop the timer. I call this when required
    clearInterval(this.interval); //  Clear any interval which is running on the thread
    this.interval = null;
    this.time.next('00:00'); // Set the countdown text to 00:00
    this.state = 'stop';
    this.informUser();
    this.dataArray = [];
    this.navCtrl.navigateBack('/tabs/tab1');
    
  }


  percentageOffset(percent) { // This function is used for the swivel outside the countdown timer
    const percentFloat = percent / 100;
    return circleDasharray * (1 - percentFloat);
  }

  async informUser() {
    let toast = await this.toast.create({
      message: 'Fitness Done!' ,
      duration: 3000,
      position: 'top',
    });
    return await toast.present();
  }

  async clickPauseFunc() { // This function is for pause function of the countdown timer
    console.log("Paused");
    this.pause = true;
    if(this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  clickResumeFunc() { // This function is for resume function of the countdown timer
    this.pause = false;
  }



} */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { color } from 'highcharts';
import { BehaviorSubject } from 'rxjs';
import { Plugins } from '@capacitor/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { formatDate } from '@angular/common';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';


const { Storage } = Plugins;


const circleR = 80; // Variable to store the circle radius
const circleDasharray = 2 * Math.PI * circleR; // Variable to store the circumeference of the cirlce. Readable formula is : Circumeference = 2 * PI(3.14...) * Radius

@Component({
  selector: 'app-plan-detail-countdown',
  templateUrl: './plan-detail-countdown.page.html',
  styleUrls: ['./plan-detail-countdown.page.scss'],
})
export class PlanDetailCountdownPage implements OnInit {

  currentDate = new Date();

  destination : any ;
  dataObj : any ;
  sum : number = 0 ;
  timer : number; // in seconds 
  fitnessName : any;
  valuedMember: number;
  time : BehaviorSubject<string> = new BehaviorSubject('00:00');
  interval;
  startDuration = 1;
  percent : BehaviorSubject<number> = new BehaviorSubject(100);
  enhancedFitnessData : any = [];
  negativeNo = -1;
  result : any = [];
  dataArray = [];
  circleR = circleR;
  circleDasharray = circleDasharray;
   lengthOfObj;
   exTime : number;
   iterationNo : number;
   upcomingID : string;
   userID : string;
   latitude: any = 0; //latitude
   longitude: any = 0; //longitude
   address: string = ''
  currentLocation: string = '';

  state : 'start' | 'stop' = 'stop';


  constructor( public activatedRoute : ActivatedRoute, private toast:ToastController, private navCtrl: NavController, public http: HttpClient, private router : Router, private geolocation: Geolocation,     private nativeGeocoder: NativeGeocoder) { 

   // this.destination = planDetailService.getPlanDetail();

  }

  ngOnInit() {
    let dataReceived = this.activatedRoute.snapshot.paramMap.get('dataObj') // Stores what is received from the previous view
    this.dataObj = JSON.parse(dataReceived) // parsing the data into a readable format
    this.lengthOfObj = this.dataObj.length; // Variable to store the how many workous are there in a plan
   // this.completed()
    for (var i = 0; i < this.lengthOfObj ; i++) { // Doing iteration so to get the total duration of the fitpness plan
      this.valuedMember  = parseInt(this.dataObj[i]['fitnessDuration']);
      this.sum = this.sum + this.valuedMember;

    }

    console.log('Sum of numbers is', this.sum); // Debugging function
      this.countdownFunction() // Calls the countdown function to start the timer and display what workout is it past & currently!
    this.getCurrentLocation();
    }
  

  sleep(ms) { // Function for the JS thread not to interrupt the countdown process
    return new Promise(resolve => setTimeout(resolve,ms));
  }


 async countdownFunction() {
  this.startTimer(this.sum); // Starts the timer. It parameters is the total duration of the workout
  console.log(this.lengthOfObj); // Debugging purposes
  var exerciseName; // Created this local variable for testing. I wanted to test if it can HTML can bind with variable. End up binding HTML element with Array is easier
  var exerciseDuration; // Created this local variable for testing. I wanted to test if it can HTML can bind with variable. End up binding HTML element with Array is easier
  var exerciseReps; // Created this local variable for testing. I wanted to test if it can HTML can bind with variable. End up binding HTML element with Array is easier
  var exerciseSets; // Created this local variable for testing. I wanted to test if it can HTML can bind with variable. End up binding HTML element with Array is easier
  var exercisephoto; // Created this local variable for testing. I wanted to test if it can HTML can bind with variable. End up binding HTML element with Array is easier
    for (var i = 0 ; i < this.lengthOfObj ; i++) { // Do a for loop to read through every workout in the plan
      this.dataArray.push(this.dataObj[i]); // Push the object values to array
      exerciseName = this.dataObj[i]['fitnessName']; // Assiging the local variable values
      exerciseDuration = this.dataObj[i]['fitnessDuration']; // Assiging the local variable values
      exerciseReps = this.dataObj[i]['fitnessReps']; // Assiging the local variable values
      exerciseSets = this.dataObj[i]['fitnessSet']; // Assiging the local variable values
      exercisephoto = this.dataObj[i]['fitnessPhoto']; // Assiging the local variable values

        console.log('Exercise Name', exerciseName); //Debugging purposes
        console.log('Exercise Duration', exerciseDuration);  //Debugging purposes
        console.log('Exercise Reps', exerciseReps); //Debugging purposes
        console.log('Exercise Sets', exerciseSets); //Debugging purposes

      await this.sleep((this.valuedMember * 1000)); // Convertes each workout duration to millisconds. Purpose of calling this sleep function, so the for loop wont be interrupted as JAvaSccript tends to run thing as a whole.
      console.log(i); // Debugging purposes

      if(i >= (this.lengthOfObj - 1)) { // If for loop iterates till the last object. This informs the users that timer is done
        console.log('Timer finish already'); // Debugging purposes
       this.stopTimer(); // Calls the stop timer function
        break; // break from the loop
       
    }
    console.log('Inside of For Loop'); // Debugging purpose
    console.log(this.dataObj);
  } 

console.log('Outside of For Loop'); // Debugging purpose

this.iterationNo = 2; // The purpose of this value is lets say the for loop is done loop, it will be assigned to this value. So that the javascript wont run this loop again. As this function is inside the default initalization function
  
                              }

  
  


   startTimer(duration : number) { // This function starts the timer and its needs the duration of the workout to proceed
    this.state = 'start'; // Debugging purposes. Tried to add a stop and pause button. But with my effort, I couldnt let it work as I want it to be
    console.log('Start Timer');  // Debugging purposes
    this.timer = duration * 60; // Converts minutes to seconds
    this.updateTimeValue(); // Calls this to update the timer reptitvely 
    setInterval( () => {
        this.updateTimeValue();
    }, 1000) // Set the interval to every 1 second
  }

  swapDuration() {
    this.startDuration = this.startDuration === 1 ? 0.5 : 1; // Debugging purposes. Tried to add a stop and pause button. But with my effort, I couldnt let it work as I want it to be
  }

  updateTimeValue() { // Function to update the timer recursively 

    if(this.iterationNo != 2){ // If first time iterating, then it will proceed further. I done it this way because once the timer expires, it restarts the timer automatically. Currently, this is my improvised walkaround for this


      console.log('Checking if this works man'); // Debugging purposes
    let minutes : any = this.timer / 60; // Converts seconds to minutes
    let seconds : any = this.timer % 60; // Reminder will be added as second. % stands for reminder when doing divide


    minutes = String('0' + Math.floor(minutes)).slice(-2); //To show this in countdown timer, minutes part
    seconds = String('0' + Math.floor(seconds)).slice(-2); // To show this in countdown timer, seconds part


    const text = minutes + ' : ' + seconds ; // This is what is displayed in the timer. I set the formart to MM:SS
    this.time.next(text);

    const totalTime = this.startDuration * 60; 
    const percentage = ((totalTime - this.timer) / totalTime) * 100;
    this.percent.next(percentage);

   this.timer = this.timer - 1;

    if(this.timer < -1) { // If timer reaches -1, the timer will expire by calling stop timer function
    this.stopTimer();
    }
    }

    else {
      
    }

    


  }

  stopTimer() { // This function is used to stop the timer. I call this when required
    clearInterval(this.interval); //  Clear any interval which is running on the thread
    this.interval = null;
    this.time.next('00:00'); // Set the countdown text to 00:00
    this.state = 'stop';
    this.informUser();
    this.dataArray = [];
    this.completed();
    this.navCtrl.navigateBack('/tabs/tab1');
    
  }


  percentageOffset(percent) { // This function is used for the swivel outside the countdown timer

    const percentFloat = percent / 100;
    return circleDasharray * (1 - percentFloat);

  }

  async informUser() { // This function stores a toast

    let toast = await this.toast.create({
      message: 'Fitness Done!' ,
      duration: 3000,
      position: 'top',
    });
    return await toast.present();
  
  }

   async completed() { //Once countdown is completed. It will call this function to send values to completed Completed Activities
    const { value } = await Storage.get({ key: 'userID' }); // Stores the value of userID
    console.log('Current User ID: ', value); // Displays the current user ID
    const formatDate1 = formatDate(this.currentDate, 'yyyy-MM-dd  HH:mm:ss' , 'en-US'); //Declaration of date with the format of yyyy-MM-dd HH:mm:ss

    this.userID = value; // Assigns the value to userID

   // console.log(this.result[0]);
    console.log('User ID',this.userID); //Prints userID on console
    console.log('Upcoming ID :', this.dataObj[0].FitnessPlanType)//Prints FitnessPlanType on console
    console.log('Duration', this.sum);//Prints total duration of the workout of the plan on console

    var url = 'https://buddy-deploy.herokuapp.com/addCompleted'; //This url stores the server.js filepath/URL to call a  CompletedPlan Table
    var postData = JSON.stringify({
    /*   userID: this.userID,
      completedDate: formatDate1,
      completedActivityID : this.dataObj[0].FitnessPlanType,
      completedBuddy : "Narrendran",
      completedLocation: this.currentLocation,
      completedDuration : this.sum */

      userID: this.userID,
      UpcomingID:  this.dataObj[0].FitnessPlanType,
      buddy: "Narrendran",
      duration: this.sum,
      date: formatDate1,
      location: this.currentLocation, 


    }); // This variable stores in JSON format of userID, FitnessPlanType, duration, date, location, buddy
    const httpOptions = { // Default HTTP Options
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
      }),
    };
    this.http.post(url, postData, httpOptions).subscribe(
      (data) => {
        console.log('postData:', postData); // Prints what is sent to Heroku URL
        console.log('What is sent Narren + Brendon',data); //Prints what is received from Heroku URL
        if (data == false) { // Validation
          // this.failed()

        } else if (data == true) { // Validation
          // this.successful()
        }
      },
      (error) => {
        console.log(error); //Prints any error if there is an exception
      }
    );
    this.router.navigate(['tabs/tab2']); // This codes does navigation to t ab 2 once countdown is done
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
        console.log('Current Location is',data["address"]["suburb"])
      })

      // return this.currentLocation
      });
  } 


  

}

