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

  timeLeftFive: number = 300;// in seconds
  secondsAuxFive: number = this.timeLeftFive
  minutesFive: number = 5;
  minutesAuxFive: number = this.minutesFive
  counterFive: number = 0;
  counterIn60Five: number = 60;
  intervalFive: any;
  sumFive: number = 0;



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
      this.timeLeftFive--;
      this.counterFive++;
      if(this.counterFive == 60){
        this.minutesFive--;
        this.sumFive += this.counterFive;
        this.counterIn60Five = 60;
        this.counterFive = 0;
        if(this.sumFive == ((this.secondsAuxFive/this.minutesAuxFive) * this.minutesAuxFive)){
          this.audio.src = '../../assets/teste.ogg';
          this.audio.load();
          this.audio.play();
          this.sumFive = 0;
          this.counterFive = 0;
          this.timeLeftFive = this.secondsAuxFive;
          this.minutesFive = 5;
          this.pauseTimerForFiveMinutes();
          this._snack.open('Intervalo finalizado!', ':)', {
            duration: 4500,
          });
        }
    }
    this.counterIn60Five--;
    },1000)
  }

  pauseTimerForFiveMinutes(): void {
    clearInterval(this.intervalFive);
  }

}
