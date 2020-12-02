import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { timer } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  timeLeft: number = 1500;// in seconds
  secondsAux: number = this.timeLeft;
  minutes: number = 25;
  minutesAux: number = this.minutes;
  counterIn60: number = 60;
  counter = 0;
  interval: any;
  pomodoros: number = 0;
  sum: number = 0;
  audio = new Audio();

  timeLeftFive: number = 60;// in seconds
  minutesFive: number = 5;
  counterFive: number = 0;
  intervalFive: any;

  timeLeftTen: number = 60;// in seconds
  minutesTen: number = 10;
  counterTen: number = 0;
  intervalTen: any;


  /***
   * dependency injection for mat snack bar
   */
  constructor(private _snack: MatSnackBar) {

  }


  startTimer(): void {
    this.interval = setInterval(() => {
      this.timeLeft--;
      this.counter++;
      if(this.counter == 60){
        this.minutes--;
        this.sum += this.counter;
        this.counterIn60 = 60;
        this.counter = 0;
        if(this.sum == ((this.secondsAux/this.minutesAux) * this.minutesAux)){
          this.audio.src = '../../assets/teste.ogg';
          this.audio.load();
          this.audio.play();
          this.pomodoros++;
          this.sum = 0;
          this.counter = 0;
          this.timeLeft = this.secondsAux;
          this.minutes = 25;
          this.pauseTimer();
          this._snack.open('Parabéns pomodoro realizado com sucesso!', ':)', {
            duration: 4500,
          });
        }
    }
    this.counterIn60--;
    console.log(this.counterIn60);
    },1000)
  }

  pauseTimer(): void {
    clearInterval(this.interval);
  }

  startTimerForFiveMinutes(): void {
    this.intervalFive = setInterval(() => {
      
    },1000)
  }

  pauseTimerForFiveMinutes(): void {
    clearInterval(this.intervalFive);
  }

}
