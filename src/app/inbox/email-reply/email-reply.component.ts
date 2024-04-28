import { Component, Input } from '@angular/core';
import { Email } from '../email';
import { EmailService } from '../email.service';


@Component({
  selector: 'app-email-reply',
  templateUrl: './email-reply.component.html',
  styleUrl: './email-reply.component.css'
})
export class EmailReplyComponent {
  // Modal is closed by default
  showModal = false;
  // The email has an interface of Email
  @Input() email!: Email;

  constructor(private emailService: EmailService){
    // this.email = {
    //   id: '',
    //   subject: '',
    //   text: '',
    //   to: '',
    //   from: `${authService.username}@angular-email.com`,
    //   html: '' 
    // }
  }

  ngOnChanges() {
    this.email = {
      ...this.email, 
      from: this.email.to,
      to: this.email.from, 
      subject: `RE: ${this.email.subject}`,
      text: `\n\n\n-------- ${this.email.from} wrote:\n> ${this.email.text.replace(/\n/gi, '\n> ')}`
      }
  }

  onSubmit(email: Email){
    this.emailService.sendEmail(email).subscribe(() => {
      this.showModal = false;
    })
  }
}