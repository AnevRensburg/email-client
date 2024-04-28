// Imports - Angular
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Imports - Interfaces
import { Email } from '../email';

@Component({
  selector: 'app-email-show',
  templateUrl: './email-show.component.html',
  styleUrl: './email-show.component.css'
})
export class EmailShowComponent {
  email!: Email;

  constructor(
    private route: ActivatedRoute,    
    ){
      this.email = route.snapshot.data['email'];
      this.route.data.subscribe(({ email }) => {
        this.email = email;
      })
    }

  }
