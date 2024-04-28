import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  signedin: boolean | null = null;

  constructor(private authService: AuthService){}

  // The instant app component is about to be displayed on the screen, run this code
  ngOnInit(){
    // Subscribe to the signedin observable, so that every time there is a change
    // to the value in signedin$ in our authService, change the boolean value in 
    // the app component aswell.
    this.authService.signedin$.subscribe((signedin) => {
      this.signedin = signedin;
    })
    // Call checkAuth to see if session contains a cookie and user is logged in
    this.authService.checkAuth().subscribe()

  }
}
