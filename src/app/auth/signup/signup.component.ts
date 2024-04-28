// Imports from Angular
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Imports - Validators
import { MatchPassword } from '../validators/match-password';
import { UniqueUsername } from '../validators/unique-username';

// Imports - Services
import { AuthService, SignUpCredentials } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  constructor(
    private matchPassword: MatchPassword, 
    private uniqueUsername: UniqueUsername,
    private authService: AuthService,
    private router: Router
  ){}

  authForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-z0-9]+$/)
    ], 
    [this.uniqueUsername.validate]
    ),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20)
    ]),
    passwordConfirmation: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20)
    ])
  }, { validators: [this.matchPassword.validate] }
  );

  // When the sumbit button is clicked, call onSubmit()
  onSubmit(){
    // Do a check to see if form is valid before continuing
    if(this.authForm.invalid ){
      return;
    }

    console.log('Form is valid');

    // If form is valid, call the 'signup' method with form values
    this.authService.signUp(this.authForm.value as SignUpCredentials).subscribe({
      // Sucessfully signed up
      next: (response) => {
        console.log('Successfully signed up!')
        console.log(`Welcome ${response.username}!`);
      
        // Redirect user to other their inbox
        this.router.navigateByUrl('/inbox')


      },
      // An error occured while signing up
      error: (err) => {
        if(err.status === 0){
          this.authForm.setErrors({
            noConnection: true
          });
        }else{
          this.authForm.setErrors({
            unknownError: true
          });
        }
      }
    });

  }
  
}
