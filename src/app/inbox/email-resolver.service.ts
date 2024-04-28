// Imports - Angular
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { catchError, EMPTY } from 'rxjs';

// Imports - Servvices
import { EmailService } from './email.service';

// Imports - Interfaces
import { Email } from './email';


@Injectable({
  providedIn: 'root'
})
export class EmailResolverService implements Resolve<Email>{

  constructor(
    private emailService: EmailService,
    private router: Router
    ) { }

  resolve(route: ActivatedRouteSnapshot) {
    const { id } = route.params;
    return this.emailService.getEmail(id).pipe(
      catchError(() => {
        this.router.navigateByUrl('/inbox/not-found');
        return EMPTY;
      })
    )
  };
}
