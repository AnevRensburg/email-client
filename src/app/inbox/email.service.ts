import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from } from 'rxjs';

// Imports - Interfaces
import { Email } from './email';

export interface EmailSummary { 
  id: string,
  subject: string, 
  from: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  rootUrl = 'https://api.angular-email.com';

  constructor(private http: HttpClient){}

  // Fetch list of Emails
  getEmails(){
    return this.http.get<EmailSummary[]>(this.rootUrl + '/emails')
  }

  // Fetch specific Email
  getEmail(id: string){
    return this.http.get<Email>(this.rootUrl + '/emails/' + id)
  }

  // Send the email to
  sendEmail(email: Email){
    return this.http.post(this.rootUrl + '/emails', email)
  }
}
