import { Component, OnInit } from '@angular/core';
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

  state : 'start' | 'stop' = 'stop';


  constructor( public activatedRoute : ActivatedRoute, private toast:ToastController, private navCtrl: NavController) { 

   // this.destination = planDetailService.getPlanDetail();

  }

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



}
