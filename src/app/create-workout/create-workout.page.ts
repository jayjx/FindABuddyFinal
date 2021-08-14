import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormArray,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-create-workout',
  templateUrl: './create-workout.page.html',
  styleUrls: ['./create-workout.page.scss'],
})
export class CreateWorkoutPage implements OnInit {
  public myForm: FormGroup;
  private playerCount: number = 1;

  constructor(private formBuilder: FormBuilder) {
    this.myForm = formBuilder.group({
      player1: ['', Validators.required],
    });
  }

  addControl() {
    this.playerCount++;
    this.myForm.addControl(
      'player' + this.playerCount,
      new FormControl('', Validators.required)
    );
  }

  ngOnInit() {}
}
