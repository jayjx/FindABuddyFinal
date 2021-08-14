import { Injectable } from '@angular/core';
import { Workout } from '../model/workout';

@Injectable({
  providedIn: 'root'
})
export class WorkoutsService {
  
  FitnessList: Workout[] = [];
  
  PlanType: Workout[] = [];

  constructor() {
   

   }

  getProducts(): Workout[] {
    return this.FitnessList;
  }
  
  

  getWorkoutById(id: string): Workout {
    return this.FitnessList.find(item => item.id == id)
    }
   
  
  add(p: Workout) {
    this.FitnessList.push(p);
    }


}
