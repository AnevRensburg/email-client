import { Component } from '@angular/core';
import { EmailService } from '../email.service';
import { EmailSummary } from '../email.service';

@Component({
  selector: 'app-email-index',
  templateUrl: './email-index.component.html',
  styleUrl: './email-index.component.css'
})
export class EmailIndexComponent {
  emails!: EmailSummary[];

  constructor(private emailService: EmailService){}

  ngOnInit(){
    this.emailService.getEmails().subscribe((emails) => {
      this.emails = emails;
    })
  }

}
