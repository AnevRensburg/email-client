import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Email } from '../email';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-email-create',
  templateUrl: './email-create.component.html',
  styleUrl: './email-create.component.css'
})
export class EmailCreateComponent {
  showModal = false;
  email!: Email;

  constructor(
    private authService: AuthService,
    private emailService: EmailService
    ){
    // this.email = {
    //   id: '',
    //   subject: '',
    //   text: '',
    //   to: '',
    //   from: `${authService.username}@angular-email.com`,
    //   html: '' 
    // }
    console.log(`EmailCreate [${this.authService.username}]`);
  }

  ngOnInit() {
    this.authService.signedin$.subscribe(authenticated => {
      if(!authenticated) return;
      
      this.email = {
        id: '',
        subject: '',
        text: '',
        to: '',
        from: `${this.authService.username}@angular-email.com`,
        html: '' 
      }
    })
  }


  onSubmit(email: Email){
    this.emailService.sendEmail(email).subscribe(() => {
      console.log('Email was sent')
      this.showModal = false;
    })
  }
}
