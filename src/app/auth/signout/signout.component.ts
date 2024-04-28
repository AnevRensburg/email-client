// Imports from Angular
import { Component } from '@angular/core';
import { Router } from '@angular/router';

// Imports - Services
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrl: './signout.component.css'
})
export class SignoutComponent {
  constructor(
    private authService: AuthService,
    private router: Router
    ){}

  // The instant that we're about to show this component on the screen,
  // lets call the signOut() method, redirect user to sign in page.

  ngOnInit(){
    this.authService.signOut().subscribe()
    this.router.navigateByUrl('/')
  }

}
