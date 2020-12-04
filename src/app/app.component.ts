import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  timeLeft: number = 1500;// in seconds
  secondsAux: number = this.timeLeft;
  minutes: number = 24;
  minutesAux: number = this.minutes;
  counterIn60: number = 60;
  counter = 0;
  interval: any;
  pomodoros: number = 0;
  sum: number = 0;
  audio: any;

  timeLeftFive: number = 300;// in seconds
  secondsAuxFive: number = this.timeLeftFive
  minutesFive: number = 4;
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

  /***
   * Init method for application
   */
  ngOnInit(): void {
    this.audio = new Audio();
    this.audio.src = '../../assets/alarme.wav';
    this.audio.load();
  }

  /***
   * Method for init timer in 25 minutes
   */
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
          this.audio.play();
          this.pomodoros++;
          this.sum = 0;
          this.counter = 0;
          this.timeLeft = this.secondsAux;
          this.minutes = 24;
          this.counterIn60 += 1;
          if(this.pomodoros >= 4){
            this.notiFyMe();
            this._snack.open('Precisa-se fazer uma pausa de 10MIN!', ':)', {
              duration: 5000,
            });
          }
          this.pauseTimer();
          
        }
    }
    this.counterIn60--;
    console.log(this.counterIn60);
    },1000)
  }

  pauseTimer(): void {
    clearInterval(this.interval);
  }

  /**
   * Method for init timer in 5 minutes
   */
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
          this.audio.play();
          this.sumFive = 0;
          this.counterFive = 0;
          this.timeLeftFive = this.secondsAuxFive;
          this.minutesFive = 4;
          this.counterIn60Five += 1;
          this.pauseTimerForFiveMinutes();
          this._snack.open('Intervalo finalizado!', ':)', {
            duration: 4500,
          });
        }
    }
    this.counterIn60Five--;
    },1000)
  }

  /***
   * Method for pause timer pomodoro
   */
  pauseTimerForFiveMinutes(): void {
    clearInterval(this.intervalFive);
  }

  /***
   * Method notification for timer 
   */
  notiFyMe(): void {

    if (!("Notification" in window)) {
    }else if(Notification.permission === "granted"){
      let notiFy = new Notification("Recomenda-se uma pausa de 5 MIN.");
    }else if(Notification.permission === "denied"){
      Notification.requestPermission().then(function (permission){
        if(permission === "granted"){
          let notiFy = new Notification("Recomenda-se uma pausa de 5 MIN.");
        }
      });
    }
  }

}
