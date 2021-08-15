import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';



const circleR = 80;
const circleDasharray = 2 * Math.PI * circleR;

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


  constructor( public activatedRoute : ActivatedRoute) { 

   // this.destination = planDetailService.getPlanDetail();

  }

  ngOnInit() {
    let dataReceived = this.activatedRoute.snapshot.paramMap.get('dataObj')
    this.dataObj = JSON.parse(dataReceived)
    this.lengthOfObj = this.dataObj.length;

    for (var i = 0; i < this.lengthOfObj ; i++) {
      this.valuedMember  = parseInt(this.dataObj[i]['fitnessDuration']);
      this.sum = this.sum + this.valuedMember;
  //    console.log('Fitness Name',this.dataObj[i]['fitnessName']);
   //   console.log('Fitness Duration',this.dataObj[i]['fitnessDuration']);
    }

    console.log('Sum of numbers is', this.sum);

 
      this.countdownFunction()

    }
  

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve,ms));
  }


 async countdownFunction() {
  this.startTimer(this.sum);
  console.log(this.lengthOfObj);
  var exerciseName;
  var exerciseDuration;
  var exerciseReps;
  var exerciseSets;
  var exercisephoto;
    for (var i = 0 ; i < this.lengthOfObj ; i++) {
      this.dataArray.push(this.dataObj[i]);
      exerciseName = this.dataObj[i]['fitnessName'];
      exerciseDuration = this.dataObj[i]['fitnessDuration'];
      exerciseReps = this.dataObj[i]['fitnessReps'];
      exerciseSets = this.dataObj[i]['fitnessSet'];
      exercisephoto = this.dataObj[i]['fitnessPhoto'];



        console.log('Exercise Name', exerciseName);
        console.log('Exercise Duration', exerciseDuration);
        console.log('Exercise Reps', exerciseReps);
        console.log('Exercise Sets', exerciseSets);

      await this.sleep((this.valuedMember * 1000));
      console.log(i);

      if(i >= (this.lengthOfObj - 1)) {
        console.log('Timer finish already');
       this.stopTimer();
        break;
       
    }
    console.log('Inside of For Loop');
  } 

console.log('Outside of For Loop');

this.iterationNo = 2;
  
                              }

  
  


   startTimer(duration : number) {
    this.state = 'start';
    console.log('Start Timer');
    this.timer = duration * 60;
    this.updateTimeValue();
    setInterval( () => {
        this.updateTimeValue();
    }, 1000)
  }

  swapDuration() {
    this.startDuration = this.startDuration === 1 ? 0.5 : 1;
  }

  updateTimeValue() {

    if(this.iterationNo != 2){


      console.log('Checking if this works man');
    let minutes : any = this.timer / 60;
    let seconds : any = this.timer % 60;


    minutes = String('0' + Math.floor(minutes)).slice(-2);
    seconds = String('0' + Math.floor(seconds)).slice(-2);


    const text = minutes + ' : ' + seconds ;
    this.time.next(text);

    const totalTime = this.startDuration * 60;
    const percentage = ((totalTime - this.timer) / totalTime) * 100;
    this.percent.next(percentage);

   this.timer = this.timer - 1;

    if(this.timer < -1) {
    this.stopTimer();
    }
    }

    else {
      
    }

    


  }

  stopTimer() {
    clearInterval(this.interval);
    this.interval = null;
    this.time.next('00:00');
    this.state = 'stop';
    this.dataArray = [];
    
  }


  percentageOffset(percent) {

    const percentFloat = percent / 100;
    return circleDasharray * (1 - percentFloat);

  }



}
