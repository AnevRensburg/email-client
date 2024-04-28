import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Imports - Services
import { AuthService, SignInCredentials } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  constructor(
    private authService: AuthService,
    private router: Router
    ){}

  authForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-z0-9]+$/)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20)
    ])
  })


  // When the sumbit button is clicked, call onSubmit()
  onSubmit(){
    // Do a check to see if form is valid before continuing
    if(this.authForm.invalid ){
      return;
    }

    console.log('Sign In form is valid');

    // If form is valid, call the 'signin' method with form values
    this.authService.signIn(this.authForm.value as SignInCredentials).subscribe({
      // Sucessfully signed up
      next: ({ username }) => {
        console.log('Successfully signed in!')
        console.log('Welcome back, ', username);
        // Redirect user to other page
        this.router.navigateByUrl('/inbox')
      }, 
      // An error occured while signing up
      error: (err) => {
        if(err.error.username || err.error.password){
          this.authForm.setErrors({
            credentials: true
          });
          console.log('Incorrect credentials')
          console.log(err.error)
        } else if(err.status === 0){
          this.authForm.setErrors({
            noConnection: true
          });
          console.log('no internet')
        } else {
          this.authForm.setErrors({
            unknownError: true
          });
          console.log('unknown error')
        }
      }


  });


  }
}
